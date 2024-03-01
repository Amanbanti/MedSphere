import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { IncomingHttpHeaders } from 'http';
import {
  CORRELATION_ID_HEADER,
  ERROR_CODES,
  FACILITY_ID_HEADER,
  HTTP_STATUS,
  ORGANIZATION_ID_HEADER,
  REQUEST_ID_HEADER,
} from '@medsphere/shared';
import { globalMetrics } from '@medsphere/monitoring-sdk';
import { createLogger } from '@medsphere/logger';
import type { GatewayConfig } from '../config/gateway.config';
import {
  GATEWAY_INTERNAL_HEADERS,
  HOP_BY_HOP_HEADERS,
  type ForwardedHeaders,
  type GatewayRequest,
  type ProxyResult,
} from '../types/request.types';
import {
  buildUpstreamUrl,
  createServiceRegistry,
  type ServiceName,
  type ServiceRegistry,
} from './service-registry';
import {
  METRIC_HTTP_REQUEST_DURATION,
  METRIC_HTTP_REQUESTS_TOTAL,
  METRIC_PROXY_ERRORS_TOTAL,
  PROXY_STRIP_HEADERS,
} from '../constants';

const logger = createLogger({ service: 'api-gateway', module: 'http-proxy' });

export interface ProxyRequestOptions {
  serviceName: ServiceName;
  upstreamPath: string;
  method: string;
  headers: IncomingHttpHeaders;
  body?: Buffer | string | null;
  queryString?: string;
  timeoutMs?: number;
  correlationId?: string;
  requestId?: string;
  organizationId?: string;
  facilityId?: string;
  userId?: string;
}

export interface ProxyForwardContext {
  authorization?: string;
  correlationId: string;
  requestId: string;
  organizationId?: string;
  facilityId?: string;
  userId?: string;
  clientIp?: string;
}

@Injectable()
export class HttpProxyService {
  private readonly registry: ServiceRegistry;
  private readonly config: GatewayConfig;
  private readonly fetchImpl: typeof fetch;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.get<GatewayConfig>('gateway')!;
    this.registry = createServiceRegistry(this.config);
    this.fetchImpl = globalThis.fetch.bind(globalThis);
  }

  getRegistry(): ServiceRegistry {
    return this.registry;
  }

  buildForwardHeaders(
    incoming: IncomingHttpHeaders,
    context: ProxyForwardContext,
  ): ForwardedHeaders {
    const forwarded: ForwardedHeaders = {};

    for (const [key, value] of Object.entries(incoming)) {
      if (value === undefined) {
        continue;
      }
      const lower = key.toLowerCase();
      if (
        HOP_BY_HOP_HEADERS.has(lower) ||
        GATEWAY_INTERNAL_HEADERS.has(lower)
      ) {
        continue;
      }
      if (PROXY_STRIP_HEADERS.includes(lower as (typeof PROXY_STRIP_HEADERS)[number])) {
        continue;
      }
      forwarded[lower] = Array.isArray(value) ? value.join(', ') : value;
    }

    forwarded[CORRELATION_ID_HEADER] = context.correlationId;
    forwarded[REQUEST_ID_HEADER] = context.requestId;

    if (context.authorization) {
      forwarded.authorization = context.authorization;
    } else if (incoming.authorization) {
      forwarded.authorization = Array.isArray(incoming.authorization)
        ? incoming.authorization[0]!
        : incoming.authorization;
    }

    if (context.organizationId) {
      forwarded[ORGANIZATION_ID_HEADER] = context.organizationId;
    } else if (incoming[ORGANIZATION_ID_HEADER]) {
      const org = incoming[ORGANIZATION_ID_HEADER];
      forwarded[ORGANIZATION_ID_HEADER] = Array.isArray(org) ? org[0]! : org;
    }

    if (context.facilityId) {
      forwarded[FACILITY_ID_HEADER] = context.facilityId;
    } else if (incoming[FACILITY_ID_HEADER]) {
      const facility = incoming[FACILITY_ID_HEADER];
      forwarded[FACILITY_ID_HEADER] = Array.isArray(facility)
        ? facility[0]!
        : facility;
    }

    if (context.userId) {
      forwarded['x-user-id'] = context.userId;
    }

    if (context.clientIp) {
      forwarded['x-forwarded-for'] = context.clientIp;
      forwarded['x-real-ip'] = context.clientIp;
    }

    forwarded['x-forwarded-proto'] = 'http';
    forwarded['x-gateway-service'] = this.config.serviceName;

    return forwarded;
  }

  buildContextFromRequest(request: GatewayRequest): ProxyForwardContext {
    const authHeader = request.headers.authorization;
    const orgHeader = request.headers[ORGANIZATION_ID_HEADER];
    const facilityHeader = request.headers[FACILITY_ID_HEADER];

    return {
      authorization: Array.isArray(authHeader) ? authHeader[0] : authHeader,
      correlationId: request.correlationId ?? 'unknown',
      requestId: request.requestId ?? request.correlationId ?? 'unknown',
      organizationId: request.user?.orgId ??
        (Array.isArray(orgHeader) ? orgHeader[0] : orgHeader),
      facilityId:
        request.user?.facilityIds?.[0] ??
        (Array.isArray(facilityHeader) ? facilityHeader[0] : facilityHeader),
      userId: request.user?.sub,
      clientIp: this.extractClientIp(request),
    };
  }

  async forward(options: ProxyRequestOptions): Promise<ProxyResult> {
    const started = Date.now();
    const baseUrl = this.registry.getUpstreamBaseUrl(options.serviceName);
    const pathWithQuery = options.queryString
      ? `${options.upstreamPath}?${options.queryString}`
      : options.upstreamPath;
    const upstreamUrl = buildUpstreamUrl(baseUrl, pathWithQuery);
    const timeoutMs =
      options.timeoutMs ?? this.registry.getTimeoutMs(options.serviceName);

    const context: ProxyForwardContext = {
      authorization: this.extractHeader(options.headers, 'authorization'),
      correlationId: options.correlationId ?? 'unknown',
      requestId: options.requestId ?? options.correlationId ?? 'unknown',
      organizationId:
        options.organizationId ??
        this.extractHeader(options.headers, ORGANIZATION_ID_HEADER),
      facilityId:
        options.facilityId ??
        this.extractHeader(options.headers, FACILITY_ID_HEADER),
      userId: options.userId,
    };

    const forwardHeaders = this.buildForwardHeaders(options.headers, context);

    const requestCounter = globalMetrics.counter(
      METRIC_HTTP_REQUESTS_TOTAL,
      'Total proxied HTTP requests',
      { service: options.serviceName, method: options.method.toUpperCase() },
    );
    const durationHistogram = globalMetrics.histogram(
      METRIC_HTTP_REQUEST_DURATION,
      'Proxied HTTP request duration in milliseconds',
      { service: options.serviceName },
    );

    const controller = new AbortController();
    const timeoutHandle = setTimeout(() => controller.abort(), timeoutMs);

    try {
      logger.debug('Proxying request to upstream', {
        correlationId: context.correlationId,
        service: options.serviceName,
        method: options.method,
        upstreamUrl,
      });

      const response = await this.fetchImpl(upstreamUrl, {
        method: options.method,
        headers: forwardHeaders,
        body:
          options.body && options.method !== 'GET' && options.method !== 'HEAD'
            ? options.body
            : undefined,
        signal: controller.signal,
      });

      const bodyBuffer = Buffer.from(await response.arrayBuffer());
      const responseHeaders: Record<string, string | string[]> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      requestCounter.inc();
      durationHistogram.observe(Date.now() - started);

      return {
        statusCode: response.status,
        headers: responseHeaders,
        body: bodyBuffer.length > 0 ? bodyBuffer : null,
        upstreamUrl,
        serviceName: options.serviceName,
        durationMs: Date.now() - started,
      };
    } catch (error) {
      globalMetrics
        .counter(METRIC_PROXY_ERRORS_TOTAL, 'Total proxy errors', {
          service: options.serviceName,
        })
        .inc();

      const durationMs = Date.now() - started;
      const isTimeout =
        error instanceof Error &&
        (error.name === 'AbortError' || error.message.includes('aborted'));

      logger.error('Upstream proxy request failed', {
        correlationId: context.correlationId,
        service: options.serviceName,
        upstreamUrl,
        durationMs,
        isTimeout,
      }, error);

      throw new ServiceUnavailableException({
        statusCode: HTTP_STATUS.SERVICE_UNAVAILABLE,
        errorCode: ERROR_CODES.SERVICE_UNAVAILABLE,
        message: isTimeout
          ? `Upstream ${options.serviceName} timed out after ${timeoutMs}ms`
          : `Upstream ${options.serviceName} is unavailable`,
        correlationId: context.correlationId,
      });
    } finally {
      clearTimeout(timeoutHandle);
    }
  }

  async forwardFromRequest(
    request: GatewayRequest,
    serviceName: ServiceName,
    upstreamPath: string,
    rawBody?: Buffer,
  ): Promise<ProxyResult> {
    const context = this.buildContextFromRequest(request);
    const queryIndex = upstreamPath.indexOf('?');
    const pathOnly =
      queryIndex >= 0 ? upstreamPath.slice(0, queryIndex) : upstreamPath;
    const queryString =
      queryIndex >= 0 ? upstreamPath.slice(queryIndex + 1) : undefined;

    return this.forward({
      serviceName,
      upstreamPath: pathOnly,
      method: request.method,
      headers: request.headers,
      body: rawBody ?? null,
      queryString: queryString ?? this.extractQueryString(request),
      correlationId: context.correlationId,
      requestId: context.requestId,
      organizationId: context.organizationId,
      facilityId: context.facilityId,
      userId: context.userId,
    });
  }

  async probeHealth(serviceName: ServiceName): Promise<{
    status: 'up' | 'down';
    latencyMs: number;
    message?: string;
  }> {
    const upstream = this.registry.getUpstreamConfig(serviceName);
    const url = buildUpstreamUrl(upstream.baseUrl, upstream.healthPath);
    const started = Date.now();

    try {
      const response = await this.fetchImpl(url, {
        method: 'GET',
        signal: AbortSignal.timeout(5_000),
      });
      return {
        status: response.ok ? 'up' : 'down',
        latencyMs: Date.now() - started,
        message: response.ok ? undefined : `HTTP ${response.status}`,
      };
    } catch (error) {
      return {
        status: 'down',
        latencyMs: Date.now() - started,
        message: error instanceof Error ? error.message : 'Probe failed',
      };
    }
  }

  private extractHeader(
    headers: IncomingHttpHeaders,
    name: string,
  ): string | undefined {
    const value = headers[name] ?? headers[name.toLowerCase()];
    if (!value) {
      return undefined;
    }
    return Array.isArray(value) ? value[0] : value;
  }

  private extractQueryString(request: GatewayRequest): string | undefined {
    const url = request.originalUrl ?? request.url;
    const queryIndex = url.indexOf('?');
    return queryIndex >= 0 ? url.slice(queryIndex + 1) : undefined;
  }

  private extractClientIp(request: GatewayRequest): string | undefined {
    const forwarded = request.headers['x-forwarded-for'];
    if (forwarded) {
      const first = Array.isArray(forwarded) ? forwarded[0] : forwarded;
      return first?.split(',')[0]?.trim();
    }
    return request.ip ?? request.socket?.remoteAddress;
  }
}

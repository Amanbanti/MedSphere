import { registerAs } from '@nestjs/config';
import {
  RATE_LIMIT_AUTH_MAX_REQUESTS,
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW_MS,
} from '@medsphere/shared';
import type { ServiceName } from '../proxy/service-registry';

export interface CorsConfig {
  enabled: boolean;
  origins: string[];
  methods: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  credentials: boolean;
  maxAgeSeconds: number;
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  authMaxRequests: number;
  cleanupIntervalMs: number;
}

export interface UpstreamConfig {
  baseUrl: string;
  timeoutMs: number;
  requiresAuth: boolean;
  healthPath: string;
}

export interface GatewayConfig {
  port: number;
  host: string;
  serviceName: string;
  version: string;
  jwtSecret: string;
  requestTimeoutMs: number;
  proxyMaxBodyBytes: number;
  cors: CorsConfig;
  rateLimit: RateLimitConfig;
  upstreams: Record<ServiceName, UpstreamConfig>;
  websocket: {
    path: string;
    corsOrigins: string[];
  };
  graphql: {
    path: string;
    playground: boolean;
  };
  grpc: {
    enabled: boolean;
    defaultDeadlineMs: number;
  };
}

function envInt(key: string, fallback: number): number {
  const raw = process.env[key];
  if (!raw) {
    return fallback;
  }
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function envBool(key: string, fallback: boolean): boolean {
  const raw = process.env[key];
  if (raw === undefined) {
    return fallback;
  }
  return raw === 'true' || raw === '1';
}

function envList(key: string, fallback: string[]): string[] {
  const raw = process.env[key];
  if (!raw) {
    return fallback;
  }
  return raw
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

function upstream(
  port: number,
  options: Partial<Omit<UpstreamConfig, 'baseUrl'>> = {},
): UpstreamConfig {
  const host = process.env.UPSTREAM_HOST ?? '127.0.0.1';
  return {
    baseUrl: `http://${host}:${port}`,
    timeoutMs: options.timeoutMs ?? envInt('GATEWAY_UPSTREAM_TIMEOUT_MS', 30_000),
    requiresAuth: options.requiresAuth ?? true,
    healthPath: options.healthPath ?? '/health/live',
  };
}

export const gatewayConfigFactory = registerAs(
  'gateway',
  (): GatewayConfig => ({
    port: envInt('GATEWAY_PORT', 4000),
    host: process.env.GATEWAY_HOST ?? '0.0.0.0',
    serviceName: process.env.SERVICE_NAME ?? 'api-gateway',
    version: process.env.npm_package_version ?? '0.1.0',
    jwtSecret:
      process.env.JWT_SECRET ??
      'medsphere-dev-jwt-secret-change-in-production-min-32-chars',
    requestTimeoutMs: envInt('GATEWAY_REQUEST_TIMEOUT_MS', 30_000),
    proxyMaxBodyBytes: envInt('GATEWAY_MAX_BODY_BYTES', 10 * 1024 * 1024),
    cors: {
      enabled: envBool('GATEWAY_CORS_ENABLED', true),
      origins: envList('GATEWAY_CORS_ORIGINS', [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3000',
      ]),
      methods: envList('GATEWAY_CORS_METHODS', [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        'OPTIONS',
        'HEAD',
      ]),
      allowedHeaders: envList('GATEWAY_CORS_ALLOWED_HEADERS', [
        'Content-Type',
        'Authorization',
        'X-Correlation-Id',
        'X-Request-Id',
        'X-Organization-Id',
        'X-Facility-Id',
        'X-Idempotency-Key',
        'X-Api-Version',
      ]),
      exposedHeaders: envList('GATEWAY_CORS_EXPOSED_HEADERS', [
        'X-Correlation-Id',
        'X-Request-Id',
        'X-RateLimit-Limit',
        'X-RateLimit-Remaining',
        'X-RateLimit-Reset',
      ]),
      credentials: envBool('GATEWAY_CORS_CREDENTIALS', true),
      maxAgeSeconds: envInt('GATEWAY_CORS_MAX_AGE', 86_400),
    },
    rateLimit: {
      windowMs: envInt('RATE_LIMIT_WINDOW_MS', RATE_LIMIT_WINDOW_MS),
      maxRequests: envInt('RATE_LIMIT_MAX_REQUESTS', RATE_LIMIT_MAX_REQUESTS),
      authMaxRequests: envInt(
        'RATE_LIMIT_AUTH_MAX_REQUESTS',
        RATE_LIMIT_AUTH_MAX_REQUESTS,
      ),
      cleanupIntervalMs: envInt('RATE_LIMIT_CLEANUP_INTERVAL_MS', 60_000),
    },
    upstreams: {
      auth: upstream(4100, { requiresAuth: false, healthPath: '/api/v1/health/live' }),
      patient: upstream(4101),
      doctor: upstream(4102),
      appointment: upstream(4103),
      'medical-record': upstream(4104),
      pharmacy: upstream(4105),
      laboratory: upstream(4106),
      radiology: upstream(4107),
      billing: upstream(4108),
      insurance: upstream(4109),
      notification: upstream(4110, { requiresAuth: false }),
      search: upstream(4111),
      analytics: upstream(4112),
      'video-consultation': upstream(4113),
      'diagnosis-ai': upstream(4200),
    },
    websocket: {
      path: process.env.GATEWAY_WS_PATH ?? '/ws/notifications',
      corsOrigins: envList('GATEWAY_WS_CORS_ORIGINS', [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
      ]),
    },
    graphql: {
      path: process.env.GATEWAY_GRAPHQL_PATH ?? '/graphql',
      playground: envBool('GATEWAY_GRAPHQL_PLAYGROUND', process.env.NODE_ENV !== 'production'),
    },
    grpc: {
      enabled: envBool('GATEWAY_GRPC_ENABLED', false),
      defaultDeadlineMs: envInt('GATEWAY_GRPC_DEADLINE_MS', 10_000),
    },
  }),
);

export const GATEWAY_CONFIG_KEY = 'gateway';

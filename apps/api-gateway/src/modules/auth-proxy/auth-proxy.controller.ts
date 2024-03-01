import {
  All,
  Controller,
  RawBodyRequest,
  Req,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { Public } from '@medsphere/auth-sdk';
import { RateLimitAuthRoute } from '../../guards/rate-limit.guard';
import { HttpProxyService } from '../../proxy/http-proxy.service';
import { ProxyResponseWriter } from '../../proxy/proxy-response.writer';
import type { GatewayRequest } from '../../types/request.types';

@Controller('api/v1/auth')
export class AuthProxyController {
  constructor(
    private readonly proxyService: HttpProxyService,
    private readonly responseWriter: ProxyResponseWriter,
  ) {}

  @Public()
  @RateLimitAuthRoute()
  @All()
  @All('*')
  @All('*/*')
  @All('*/*/*')
  async proxyAuth(
    @Req() request: RawBodyRequest<GatewayRequest>,
    @Res() response: Response,
  ): Promise<void> {
    const relativePath = extractAuthRelativePath(request);
    const registry = this.proxyService.getRegistry();
    const match = registry.resolveAuthRoute(relativePath);

    request.proxiedService = match.serviceName;

    const result = await this.proxyService.forwardFromRequest(
      request,
      match.serviceName,
      match.upstreamPath,
      request.rawBody ?? undefined,
    );

    this.responseWriter.write(
      response,
      result,
      request.correlationId ?? 'unknown',
    );
  }
}

function extractAuthRelativePath(request: GatewayRequest): string {
  const full = request.originalUrl ?? request.url;
  const withoutQuery = full.split('?')[0] ?? full;
  const authPrefix = '/api/v1/auth';
  const index = withoutQuery.indexOf(authPrefix);
  if (index < 0) {
    return '';
  }
  return withoutQuery.slice(index + authPrefix.length).replace(/^\/+/, '');
}

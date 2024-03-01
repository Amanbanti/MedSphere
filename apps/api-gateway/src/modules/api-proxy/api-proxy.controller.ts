import {
  All,
  Controller,
  ForbiddenException,
  RawBodyRequest,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { ERROR_CODES, HTTP_STATUS } from '@medsphere/shared';
import { GatewayAuthGuard } from '../../guards/gateway-auth.guard';
import { HttpProxyService } from '../../proxy/http-proxy.service';
import { ProxyResponseWriter } from '../../proxy/proxy-response.writer';
import { extractApiV1RelativePath } from '../../proxy/service-registry';
import type { GatewayRequest } from '../../types/request.types';

@Controller('api/v1')
@UseGuards(GatewayAuthGuard)
export class ApiProxyController {
  constructor(
    private readonly proxyService: HttpProxyService,
    private readonly responseWriter: ProxyResponseWriter,
  ) {}

  @All('*')
  @All('*/*')
  @All('*/*/*')
  @All('*/*/*/*')
  async proxyVersionedApi(
    @Req() request: RawBodyRequest<GatewayRequest>,
    @Res() response: Response,
  ): Promise<void> {
    const relativePath = extractApiV1RelativePath(
      request.originalUrl ?? request.url,
    );

    if (!relativePath || relativePath.startsWith('auth')) {
      response.status(404).json({
        statusCode: HTTP_STATUS.NOT_FOUND,
        errorCode: ERROR_CODES.NOT_FOUND,
        message: 'Route not found',
        correlationId: request.correlationId ?? 'unknown',
      });
      return;
    }

    const registry = this.proxyService.getRegistry();
    const match = registry.resolveRoute(relativePath);

    if (!match) {
      response.status(404).json({
        statusCode: HTTP_STATUS.NOT_FOUND,
        errorCode: ERROR_CODES.NOT_FOUND,
        message: `No upstream service registered for path: ${relativePath}`,
        correlationId: request.correlationId ?? 'unknown',
      });
      return;
    }

    if (match.requiresAuth && !request.user && !request.headers.authorization) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        errorCode: ERROR_CODES.UNAUTHORIZED,
        message: 'Authentication required for this resource',
        correlationId: request.correlationId ?? 'unknown',
      });
    }

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

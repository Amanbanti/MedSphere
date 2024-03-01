import { Injectable, NestMiddleware } from '@nestjs/common';
import { createLogger } from '@medsphere/logger';
import { globalMetrics } from '@medsphere/monitoring-sdk';
import type { GatewayRequest, GatewayResponse } from '../types/request.types';
import {
  METRIC_HTTP_REQUESTS_TOTAL,
  METRIC_HTTP_REQUEST_DURATION,
} from '../constants';

const logger = createLogger({ service: 'api-gateway', module: 'request-logging' });

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  use(req: GatewayRequest, res: GatewayResponse, next: () => void): void {
    const started = req.gatewayStartTime ?? Date.now();
    const method = req.method;
    const path = req.originalUrl ?? req.url;

    logger.info('Incoming request', {
      correlationId: req.correlationId,
      requestId: req.requestId,
      method,
      path,
      userAgent: req.headers['user-agent'],
      contentLength: req.headers['content-length'],
    });

    res.on('finish', () => {
      const durationMs = Date.now() - started;
      const statusCode = res.statusCode;

      globalMetrics
        .counter(METRIC_HTTP_REQUESTS_TOTAL, 'Total gateway HTTP requests', {
          method,
          status: String(statusCode),
        })
        .inc();

      globalMetrics
        .histogram(
          METRIC_HTTP_REQUEST_DURATION,
          'Gateway HTTP request duration in milliseconds',
        )
        .observe(durationMs);

      const level =
        statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';

      logger[level]('Request completed', {
        correlationId: req.correlationId,
        requestId: req.requestId,
        method,
        path,
        statusCode,
        durationMs,
        proxiedService: req.proxiedService,
      });
    });

    next();
  }
}

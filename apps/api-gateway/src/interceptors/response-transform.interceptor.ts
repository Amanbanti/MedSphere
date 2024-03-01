import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { successBody } from '@medsphere/shared';
import type { GatewayRequest, GatewayResponse } from '../types/request.types';

const TRANSFORM_SKIP_HEADER = 'x-skip-response-transform';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<GatewayRequest>();
    const response = http.getResponse<GatewayResponse>();

    if (this.shouldSkip(request, response)) {
      return next.handle();
    }

    const correlationId = request.correlationId ?? 'unknown';

    return next.handle().pipe(
      map((data) => {
        if (data === undefined || data === null) {
          return data;
        }

        if (this.isAlreadyWrapped(data)) {
          return data;
        }

        if (Buffer.isBuffer(data)) {
          return data;
        }

        if (typeof data === 'string') {
          return data;
        }

        return successBody(data, correlationId);
      }),
    );
  }

  private shouldSkip(
    request: GatewayRequest,
    response: GatewayResponse,
  ): boolean {
    if (response.locals?.skipResponseTransform) {
      return true;
    }

    const skipHeader = request.headers[TRANSFORM_SKIP_HEADER];
    if (skipHeader === 'true' || skipHeader === '1') {
      return true;
    }

    const path = request.originalUrl ?? request.url;
    if (
      path.startsWith('/metrics') ||
      path.startsWith('/graphql') ||
      path.includes('/health')
    ) {
      return true;
    }

    return false;
  }

  private isAlreadyWrapped(data: unknown): boolean {
    if (!data || typeof data !== 'object') {
      return false;
    }
    const record = data as Record<string, unknown>;
    return (
      'correlationId' in record &&
      'timestamp' in record &&
      ('data' in record || 'statusCode' in record)
    );
  }
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { ERROR_CODES, HTTP_STATUS } from '@medsphere/shared';
import type { GatewayConfig } from '../config/gateway.config';
import type { GatewayRequest } from '../types/request.types';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  private readonly defaultTimeoutMs: number;

  constructor(private readonly configService: ConfigService) {
    const config = this.configService.get<GatewayConfig>('gateway');
    this.defaultTimeoutMs = config?.requestTimeoutMs ?? 30_000;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<GatewayRequest>();
    const timeoutMs = this.resolveTimeout(request);

    return next.handle().pipe(
      timeout(timeoutMs),
      catchError((error) => {
        if (error instanceof TimeoutError) {
          return throwError(
            () =>
              new RequestTimeoutException({
                statusCode: HTTP_STATUS.SERVICE_UNAVAILABLE,
                errorCode: ERROR_CODES.SERVICE_UNAVAILABLE,
                message: `Request timed out after ${timeoutMs}ms`,
                correlationId: request.correlationId ?? 'unknown',
              }),
          );
        }
        return throwError(() => error);
      }),
    );
  }

  private resolveTimeout(request: GatewayRequest): number {
    const header = request.headers['x-request-timeout-ms'];
    if (!header) {
      return this.defaultTimeoutMs;
    }
    const value = Array.isArray(header) ? header[0] : header;
    const parsed = Number.parseInt(value ?? '', 10);
    if (Number.isFinite(parsed) && parsed > 0 && parsed <= 120_000) {
      return parsed;
    }
    return this.defaultTimeoutMs;
  }
}

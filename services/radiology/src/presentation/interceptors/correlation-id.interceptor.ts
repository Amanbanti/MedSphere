import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Request } from 'express';
import { Observable } from 'rxjs';
import { CORRELATION_ID_HEADER } from '@medsphere/shared';
import { randomUUID } from 'crypto';

@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<
      Request & { correlationId?: string }
    >();

    const incoming = request.headers[CORRELATION_ID_HEADER];
    const correlationId =
      (typeof incoming === 'string' ? incoming : incoming?.[0]) ??
      randomUUID();

    request.correlationId = correlationId;
    request.headers[CORRELATION_ID_HEADER] = correlationId;

    return next.handle();
  }
}

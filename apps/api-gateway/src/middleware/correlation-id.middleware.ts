import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  CORRELATION_ID_HEADER,
  REQUEST_ID_HEADER,
} from '@medsphere/shared';
import type { GatewayRequest, GatewayResponse } from '../types/request.types';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: GatewayRequest, res: GatewayResponse, next: () => void): void {
    const incomingCorrelation = this.readHeader(req, CORRELATION_ID_HEADER);
    const incomingRequestId = this.readHeader(req, REQUEST_ID_HEADER);

    const correlationId = incomingCorrelation ?? randomUUID();
    const requestId = incomingRequestId ?? randomUUID();

    req.correlationId = correlationId;
    req.requestId = requestId;
    req.gatewayStartTime = Date.now();

    req.headers[CORRELATION_ID_HEADER] = correlationId;
    req.headers[REQUEST_ID_HEADER] = requestId;

    res.setHeader(CORRELATION_ID_HEADER, correlationId);
    res.setHeader(REQUEST_ID_HEADER, requestId);

    next();
  }

  private readHeader(req: GatewayRequest, header: string): string | undefined {
    const value = req.headers[header] ?? req.headers[header.toLowerCase()];
    if (!value) {
      return undefined;
    }
    return Array.isArray(value) ? value[0] : value;
  }
}

export function getCorrelationId(req: GatewayRequest): string {
  return req.correlationId ?? 'unknown';
}

export function getRequestId(req: GatewayRequest): string {
  return req.requestId ?? req.correlationId ?? 'unknown';
}

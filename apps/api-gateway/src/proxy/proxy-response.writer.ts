import { Injectable } from '@nestjs/common';
import type { Response } from 'express';
import { CORRELATION_ID_HEADER, REQUEST_ID_HEADER } from '@medsphere/shared';
import type { ProxyResult } from '../types/request.types';
import { HOP_BY_HOP_HEADERS } from '../types/request.types';

@Injectable()
export class ProxyResponseWriter {
  write(response: Response, result: ProxyResult, correlationId: string): void {
    response.locals.skipResponseTransform = true;

    response.setHeader(CORRELATION_ID_HEADER, correlationId);
    response.setHeader(REQUEST_ID_HEADER, correlationId);
    response.setHeader('X-Upstream-Service', result.serviceName);
    response.setHeader('X-Upstream-Duration-Ms', String(result.durationMs));

    for (const [key, value] of Object.entries(result.headers)) {
      const lower = key.toLowerCase();
      if (HOP_BY_HOP_HEADERS.has(lower)) {
        continue;
      }
      if (lower === CORRELATION_ID_HEADER || lower === REQUEST_ID_HEADER) {
        continue;
      }
      response.setHeader(key, value);
    }

    response.status(result.statusCode);

    if (result.body === null) {
      response.end();
      return;
    }

    if (Buffer.isBuffer(result.body)) {
      response.send(result.body);
      return;
    }

    response.send(result.body);
  }
}

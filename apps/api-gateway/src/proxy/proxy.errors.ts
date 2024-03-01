import { Injectable } from '@nestjs/common';
import { ERROR_CODES, HTTP_STATUS } from '@medsphere/shared';
import type { ServiceName } from './service-registry';

export class ProxyError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly errorCode: string,
    public readonly serviceName?: ServiceName,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'ProxyError';
  }
}

@Injectable()
export class ProxyErrorMapper {
  mapUpstreamStatus(
    statusCode: number,
    serviceName: ServiceName,
    correlationId: string,
  ): ProxyError | null {
    if (statusCode < 500) {
      return null;
    }

    return new ProxyError(
      `Upstream ${serviceName} returned HTTP ${statusCode}`,
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      ERROR_CODES.SERVICE_UNAVAILABLE,
      serviceName,
    );
  }

  mapTimeout(serviceName: ServiceName, timeoutMs: number): ProxyError {
    return new ProxyError(
      `Upstream ${serviceName} timed out after ${timeoutMs}ms`,
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      ERROR_CODES.SERVICE_UNAVAILABLE,
      serviceName,
    );
  }

  mapConnectionFailure(
    serviceName: ServiceName,
    cause: unknown,
  ): ProxyError {
    const message =
      cause instanceof Error ? cause.message : 'Upstream connection failed';
    return new ProxyError(
      `Upstream ${serviceName} is unavailable: ${message}`,
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      ERROR_CODES.SERVICE_UNAVAILABLE,
      serviceName,
      cause,
    );
  }

  toResponseBody(error: ProxyError, correlationId: string, path?: string) {
    return {
      statusCode: error.statusCode,
      errorCode: error.errorCode,
      message: error.message,
      correlationId,
      path,
      service: error.serviceName,
    };
  }
}

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import type { Response } from 'express';
import { ERROR_CODES } from '@medsphere/shared';
import { errorBody } from '@medsphere/shared';
import { createLogger } from '@medsphere/logger';
import type { GatewayRequest } from '../types/request.types';

const logger = createLogger({ service: 'api-gateway', module: 'http-exception' });

@Catch()
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<GatewayRequest>();

    const correlationId = request.correlationId ?? 'unknown';
    const path = request.originalUrl ?? request.url;

    if (response.headersSent) {
      return;
    }

    const normalized = this.normalizeException(exception, correlationId, path);

    if (normalized.statusCode >= 500) {
      logger.error('Unhandled gateway exception', {
        correlationId,
        path,
        statusCode: normalized.statusCode,
        errorCode: normalized.body.errorCode,
      }, exception instanceof Error ? exception : undefined);
    } else {
      logger.warn('Gateway client error', {
        correlationId,
        path,
        statusCode: normalized.statusCode,
        errorCode: normalized.body.errorCode,
        message: normalized.body.message,
      });
    }

    response
      .status(normalized.statusCode)
      .json(normalized.body);
  }

  private normalizeException(
    exception: unknown,
    correlationId: string,
    path: string,
  ): { statusCode: number; body: ReturnType<typeof errorBody> } {
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        return {
          statusCode,
          body: errorBody(
            statusCode,
            this.mapErrorCode(statusCode),
            exceptionResponse,
            correlationId,
            undefined,
            path,
          ),
        };
      }

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const payload = exceptionResponse as Record<string, unknown>;
        return {
          statusCode,
          body: errorBody(
            statusCode,
            String(payload.errorCode ?? this.mapErrorCode(statusCode)),
            String(payload.message ?? exception.message),
            correlationId,
            payload.details as Record<string, unknown> | undefined,
            path,
          ),
        };
      }
    }

    if (exception instanceof Error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        body: errorBody(
          HttpStatus.INTERNAL_SERVER_ERROR,
          ERROR_CODES.INTERNAL_ERROR,
          'An unexpected error occurred',
          correlationId,
          process.env.NODE_ENV === 'development'
            ? { errorName: exception.name, errorMessage: exception.message }
            : undefined,
          path,
        ),
      };
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      body: errorBody(
        HttpStatus.INTERNAL_SERVER_ERROR,
        ERROR_CODES.INTERNAL_ERROR,
        'An unexpected error occurred',
        correlationId,
        undefined,
        path,
      ),
    };
  }

  private mapErrorCode(statusCode: number): string {
    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        return ERROR_CODES.VALIDATION_FAILED;
      case HttpStatus.UNAUTHORIZED:
        return ERROR_CODES.UNAUTHORIZED;
      case HttpStatus.FORBIDDEN:
        return ERROR_CODES.FORBIDDEN;
      case HttpStatus.NOT_FOUND:
        return ERROR_CODES.NOT_FOUND;
      case HttpStatus.CONFLICT:
        return ERROR_CODES.CONFLICT;
      case HttpStatus.TOO_MANY_REQUESTS:
        return ERROR_CODES.RATE_LIMITED;
      case HttpStatus.SERVICE_UNAVAILABLE:
        return ERROR_CODES.SERVICE_UNAVAILABLE;
      default:
        return ERROR_CODES.INTERNAL_ERROR;
    }
  }
}

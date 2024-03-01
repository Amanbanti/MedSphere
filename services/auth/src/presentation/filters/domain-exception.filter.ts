import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { Request, Response } from 'express';
import {
  CORRELATION_ID_HEADER,
  ERROR_CODES,
  errorBody,
} from '@medsphere/shared';
import {
  AuthDomainError,
  isAuthDomainError,
  MfaRequiredError,
} from '../../../domain/errors/auth.errors';

@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request & { correlationId?: string }>();

    const correlationId =
      request.correlationId ??
      (request.headers[CORRELATION_ID_HEADER] as string) ??
      randomUUID();

    if (isAuthDomainError(exception)) {
      const body = errorBody(
        exception.statusCode,
        exception.errorCode,
        exception.message,
        correlationId,
        {
          ...exception.details,
          ...(exception instanceof MfaRequiredError
            ? {
                mfaChallengeId: exception.challengeId,
                mfaMethods: exception.methods,
              }
            : {}),
        },
        request.url,
      );
      response.status(exception.statusCode).json(body);
      return;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      const message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : ((exceptionResponse as { message?: string | string[] }).message ??
            'Request failed');

      response.status(status).json(
        errorBody(
          status,
          status === HttpStatus.BAD_REQUEST
            ? ERROR_CODES.VALIDATION_FAILED
            : ERROR_CODES.INTERNAL_ERROR,
          Array.isArray(message) ? message.join('; ') : message,
          correlationId,
          undefined,
          request.url,
        ),
      );
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
      errorBody(
        HttpStatus.INTERNAL_SERVER_ERROR,
        ERROR_CODES.INTERNAL_ERROR,
        'An unexpected error occurred',
        correlationId,
        undefined,
        request.url,
      ),
    );
  }
}

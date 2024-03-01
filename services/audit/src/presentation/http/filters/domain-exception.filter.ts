import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import {
  ConflictError,
  DomainError,
  ForbiddenError,
  InvalidStateError,
  NotFoundError,
  ValidationError,
} from '../../domain/errors/audit.errors';
import { errorBody } from '@medsphere/shared';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<{ correlationId?: string }>();

    const status = this.resolveStatus(exception);
    response.status(status).json(
      errorBody(
        {
          code: exception.name,
          message: exception.message,
        },
        request.correlationId,
      ),
    );
  }

  private resolveStatus(error: DomainError): number {
    if (error instanceof NotFoundError) return HttpStatus.NOT_FOUND;
    if (error instanceof ValidationError) return HttpStatus.UNPROCESSABLE_ENTITY;
    if (error instanceof ConflictError) return HttpStatus.CONFLICT;
    if (error instanceof ForbiddenError) return HttpStatus.FORBIDDEN;
    if (error instanceof InvalidStateError) return HttpStatus.BAD_REQUEST;
    return HttpStatus.BAD_REQUEST;
  }
}

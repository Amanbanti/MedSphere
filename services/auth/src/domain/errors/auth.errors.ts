import {
  ERROR_CODES,
  HTTP_STATUS,
  type ISODateString,
  type UUID,
  UserStatus,
} from '@medsphere/shared';

export abstract class AuthDomainError extends Error {
  abstract readonly errorCode: string;
  abstract readonly statusCode: number;
  readonly details?: Record<string, unknown>;

  constructor(message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = new.target.name;
    this.details = details;
  }
}

export class ValidationError extends AuthDomainError {
  readonly errorCode = ERROR_CODES.VALIDATION_FAILED;
  readonly statusCode = HTTP_STATUS.UNPROCESSABLE;
}

export class InvalidCredentialsError extends AuthDomainError {
  readonly errorCode = ERROR_CODES.INVALID_CREDENTIALS;
  readonly statusCode = HTTP_STATUS.UNAUTHORIZED;
}

export class UnauthorizedError extends AuthDomainError {
  readonly errorCode = ERROR_CODES.UNAUTHORIZED;
  readonly statusCode = HTTP_STATUS.UNAUTHORIZED;
}

export class ForbiddenError extends AuthDomainError {
  readonly errorCode = ERROR_CODES.FORBIDDEN;
  readonly statusCode = HTTP_STATUS.FORBIDDEN;
}

export class NotFoundError extends AuthDomainError {
  readonly errorCode = ERROR_CODES.NOT_FOUND;
  readonly statusCode = HTTP_STATUS.NOT_FOUND;
}

export class ConflictError extends AuthDomainError {
  readonly errorCode = ERROR_CODES.CONFLICT;
  readonly statusCode = HTTP_STATUS.CONFLICT;
}

export class AccountLockedError extends AuthDomainError {
  readonly errorCode = ERROR_CODES.ACCOUNT_LOCKED;
  readonly statusCode = HTTP_STATUS.FORBIDDEN;

  constructor(lockedUntil?: ISODateString) {
    super('Account is temporarily locked due to too many failed login attempts', {
      lockedUntil,
    });
  }
}

export class AccountInactiveError extends AuthDomainError {
  readonly errorCode = ERROR_CODES.ACCOUNT_INACTIVE;
  readonly statusCode = HTTP_STATUS.FORBIDDEN;

  constructor(status: UserStatus) {
    super(`Account is not active (status: ${status})`, { status });
  }
}

export class MfaRequiredError extends AuthDomainError {
  readonly errorCode = ERROR_CODES.MFA_REQUIRED;
  readonly statusCode = HTTP_STATUS.UNAUTHORIZED;

  constructor(
    public readonly challengeId: UUID,
    public readonly methods: string[],
  ) {
    super('Multi-factor authentication is required');
  }
}

export class MfaInvalidError extends AuthDomainError {
  readonly errorCode = ERROR_CODES.MFA_INVALID;
  readonly statusCode = HTTP_STATUS.UNAUTHORIZED;
}

export class TokenExpiredError extends AuthDomainError {
  readonly errorCode = ERROR_CODES.TOKEN_EXPIRED;
  readonly statusCode = HTTP_STATUS.UNAUTHORIZED;
}

export class TokenRevokedError extends AuthDomainError {
  readonly errorCode = ERROR_CODES.TOKEN_REVOKED;
  readonly statusCode = HTTP_STATUS.UNAUTHORIZED;
}

export class SessionExpiredError extends AuthDomainError {
  readonly errorCode = ERROR_CODES.SESSION_EXPIRED;
  readonly statusCode = HTTP_STATUS.UNAUTHORIZED;
}

export function isAuthDomainError(error: unknown): error is AuthDomainError {
  return error instanceof AuthDomainError;
}

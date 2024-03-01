export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends DomainError {}
export class ConflictError extends DomainError {}
export class ValidationError extends DomainError {}
export class InvalidStateError extends DomainError {}
export class ForbiddenError extends DomainError {}

export class NotificationNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Notification not found: ${id}`);
  }
}

export class NotificationConflictError extends ConflictError {
  constructor(reason: string) {
    super(reason);
  }
}

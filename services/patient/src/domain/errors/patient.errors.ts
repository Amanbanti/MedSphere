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

export class PatientNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Patient not found: ${id}`);
  }
}

export class PatientConflictError extends ConflictError {
  constructor(reason: string) {
    super(reason);
  }
}

export class OptimisticLockError extends ConflictError {
  constructor(id: string, actualVersion: number) {
    super(`Optimistic lock failure for ${id}: version ${actualVersion}`);
  }
}

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

export class MedicalRecordNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`MedicalRecord not found: ${id}`);
  }
}

export class MedicalRecordConflictError extends ConflictError {
  constructor(reason: string) {
    super(reason);
  }
}

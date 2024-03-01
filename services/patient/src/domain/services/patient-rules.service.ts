import { ValidationError } from '../errors/patient.errors';

export class PatientDomainRules {
  validateMrn(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('mrn is required');
    }
  }

  validateFirstName(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('firstName is required');
    }
  }

  validateLastName(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('lastName is required');
    }
  }

  validateOrganizationScope(organizationId: string, resourceOrganizationId: string): void {
    if (organizationId !== resourceOrganizationId) {
      throw new ValidationError('Organization scope mismatch');
    }
  }

  validateVersion(expected: number, actual: number): void {
    if (expected !== actual) {
      throw new ValidationError(`Optimistic lock failure: expected version ${expected}, got ${actual}`);
    }
  }

  sanitizePayload(payload: Record<string, unknown>): Record<string, unknown> {
    const allowed = new Set(["mrn","firstName","lastName","dateOfBirth","gender","email","phone","bloodType","status"]);
    return Object.fromEntries(
      Object.entries(payload).filter(([key]) => allowed.has(key)),
    );
  }
}

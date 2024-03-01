import { ValidationError } from '../errors/doctor.errors';

export class DoctorDomainRules {
  validateNpi(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('npi is required');
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

  validateSpecialty(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('specialty is required');
    }
  }

  validateLicenseNumber(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('licenseNumber is required');
    }
  }

  validateEmail(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('email is required');
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
    const allowed = new Set(["npi","firstName","lastName","specialty","licenseNumber","departmentId","email","phone","status"]);
    return Object.fromEntries(
      Object.entries(payload).filter(([key]) => allowed.has(key)),
    );
  }
}

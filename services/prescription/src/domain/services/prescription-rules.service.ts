import { ValidationError } from '../errors/prescription.errors';

export class PrescriptionDomainRules {
  validateMedicationName(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('medicationName is required');
    }
  }

  validateDosage(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('dosage is required');
    }
  }

  validateFrequency(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('frequency is required');
    }
  }

  validateDurationDays(value: number): void {
    if (!Number.isFinite(value)) {
      throw new ValidationError('durationDays must be a finite number');
    }
  }

  validateRefillsRemaining(value: number): void {
    if (!Number.isFinite(value)) {
      throw new ValidationError('refillsRemaining must be a finite number');
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
    const allowed = new Set(["patientId","prescriberId","medicationName","dosage","frequency","durationDays","status","refillsRemaining"]);
    return Object.fromEntries(
      Object.entries(payload).filter(([key]) => allowed.has(key)),
    );
  }
}

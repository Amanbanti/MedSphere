import { ValidationError } from '../errors/medical-record.errors';

export class MedicalRecordDomainRules {
  validateTitle(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('title is required');
    }
  }

  validateSummary(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('summary is required');
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
    const allowed = new Set(["patientId","encounterId","recordType","title","summary","status","signedAt","signedBy"]);
    return Object.fromEntries(
      Object.entries(payload).filter(([key]) => allowed.has(key)),
    );
  }
}

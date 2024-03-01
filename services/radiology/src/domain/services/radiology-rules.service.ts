import { ValidationError } from '../errors/radiology.errors';

export class RadiologyDomainRules {
  validateModality(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('modality is required');
    }
  }

  validateBodyPart(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('bodyPart is required');
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
    const allowed = new Set(["patientId","modality","bodyPart","scheduledAt","status","findings","reportedBy"]);
    return Object.fromEntries(
      Object.entries(payload).filter(([key]) => allowed.has(key)),
    );
  }
}

import { ValidationError } from '../errors/imaging.errors';

export class ImagingDomainRules {
  validateStudyInstanceUid(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('studyInstanceUid is required');
    }
  }

  validateModality(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('modality is required');
    }
  }

  validateSeriesCount(value: number): void {
    if (!Number.isFinite(value)) {
      throw new ValidationError('seriesCount must be a finite number');
    }
  }

  validateStoragePath(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('storagePath is required');
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
    const allowed = new Set(["studyInstanceUid","patientId","modality","seriesCount","storagePath","status","archivedAt"]);
    return Object.fromEntries(
      Object.entries(payload).filter(([key]) => allowed.has(key)),
    );
  }
}

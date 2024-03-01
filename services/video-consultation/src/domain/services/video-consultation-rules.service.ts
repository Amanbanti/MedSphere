import { ValidationError } from '../errors/video-consultation.errors';

export class VideoConsultationDomainRules {
  validateRoomId(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('roomId is required');
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
    const allowed = new Set(["patientId","providerId","appointmentId","roomId","status","startedAt","endedAt"]);
    return Object.fromEntries(
      Object.entries(payload).filter(([key]) => allowed.has(key)),
    );
  }
}

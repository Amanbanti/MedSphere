import { ValidationError } from '../errors/appointment.errors';

export class AppointmentDomainRules {
  validateDurationMinutes(value: number): void {
    if (!Number.isFinite(value)) {
      throw new ValidationError('durationMinutes must be a finite number');
    }
  }

  validateReason(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('reason is required');
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
    const allowed = new Set(["patientId","doctorId","facilityId","scheduledAt","durationMinutes","reason","status","checkInAt"]);
    return Object.fromEntries(
      Object.entries(payload).filter(([key]) => allowed.has(key)),
    );
  }
}

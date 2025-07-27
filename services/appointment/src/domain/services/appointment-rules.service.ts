import { ValidationError } from '../errors/appointment.errors';

export class AppointmentDomainRules {
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
    const blocked = new Set(['id', 'organizationId', 'createdAt', 'deletedAt', 'version']);
    return Object.fromEntries(Object.entries(payload).filter(([k]) => !blocked.has(k)));
  }

}

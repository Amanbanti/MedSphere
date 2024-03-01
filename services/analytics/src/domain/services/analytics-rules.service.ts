import { ValidationError } from '../errors/analytics.errors';

export class AnalyticsDomainRules {
  validateEventType(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('eventType is required');
    }
  }

  validateSource(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('source is required');
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
    const allowed = new Set(["eventType","source","payload","occurredAt","actorId"]);
    return Object.fromEntries(
      Object.entries(payload).filter(([key]) => allowed.has(key)),
    );
  }
}

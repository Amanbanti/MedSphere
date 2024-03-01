import { ValidationError } from '../errors/notification.errors';

export class NotificationDomainRules {
  validateSubject(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('subject is required');
    }
  }

  validateBody(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('body is required');
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
    const allowed = new Set(["recipientId","channel","subject","body","status","sentAt","readAt"]);
    return Object.fromEntries(
      Object.entries(payload).filter(([key]) => allowed.has(key)),
    );
  }
}

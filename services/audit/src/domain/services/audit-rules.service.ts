import { ValidationError } from '../errors/audit.errors';

export class AuditDomainRules {
  validateAction(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('action is required');
    }
  }

  validateResourceType(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('resourceType is required');
    }
  }

  validateResourceId(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('resourceId is required');
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
    const allowed = new Set(["actorId","action","resourceType","resourceId","outcome","metadata","occurredAt"]);
    return Object.fromEntries(
      Object.entries(payload).filter(([key]) => allowed.has(key)),
    );
  }
}

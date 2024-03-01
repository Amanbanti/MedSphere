import { ValidationError } from '../errors/search.errors';

export class SearchDomainRules {
  validateDocumentType(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('documentType is required');
    }
  }

  validateResourceId(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('resourceId is required');
    }
  }

  validateTitle(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('title is required');
    }
  }

  validateContent(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('content is required');
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
    const allowed = new Set(["documentType","resourceId","title","content","indexedAt","tags"]);
    return Object.fromEntries(
      Object.entries(payload).filter(([key]) => allowed.has(key)),
    );
  }
}

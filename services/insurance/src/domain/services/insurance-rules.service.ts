import { ValidationError } from '../errors/insurance.errors';

export class InsuranceDomainRules {
  validatePayerId(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('payerId is required');
    }
  }

  validatePolicyNumber(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('policyNumber is required');
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
    const allowed = new Set(["patientId","payerId","policyNumber","groupNumber","effectiveFrom","effectiveTo","status"]);
    return Object.fromEntries(
      Object.entries(payload).filter(([key]) => allowed.has(key)),
    );
  }
}

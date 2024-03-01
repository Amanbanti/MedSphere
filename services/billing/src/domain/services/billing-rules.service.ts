import { ValidationError } from '../errors/billing.errors';

export class BillingDomainRules {
  validateTotalAmountCents(value: number): void {
    if (!Number.isFinite(value)) {
      throw new ValidationError('totalAmountCents must be a finite number');
    }
  }

  validatePaidAmountCents(value: number): void {
    if (!Number.isFinite(value)) {
      throw new ValidationError('paidAmountCents must be a finite number');
    }
  }

  validateCurrency(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('currency is required');
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
    const allowed = new Set(["patientId","encounterId","totalAmountCents","paidAmountCents","currency","status","dueDate"]);
    return Object.fromEntries(
      Object.entries(payload).filter(([key]) => allowed.has(key)),
    );
  }
}

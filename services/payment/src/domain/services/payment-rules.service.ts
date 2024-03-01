import { ValidationError } from '../errors/payment.errors';

export class PaymentDomainRules {
  validateAmountCents(value: number): void {
    if (!Number.isFinite(value)) {
      throw new ValidationError('amountCents must be a finite number');
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
    const allowed = new Set(["invoiceId","patientId","amountCents","currency","method","status","processorReference"]);
    return Object.fromEntries(
      Object.entries(payload).filter(([key]) => allowed.has(key)),
    );
  }
}

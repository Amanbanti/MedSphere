import { ValidationError } from '../errors/pharmacy.errors';

export class PharmacyDomainRules {
  validateNdcCode(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('ndcCode is required');
    }
  }

  validateDrugName(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('drugName is required');
    }
  }

  validateStrength(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('strength is required');
    }
  }

  validateForm(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('form is required');
    }
  }

  validateQuantityOnHand(value: number): void {
    if (!Number.isFinite(value)) {
      throw new ValidationError('quantityOnHand must be a finite number');
    }
  }

  validateReorderLevel(value: number): void {
    if (!Number.isFinite(value)) {
      throw new ValidationError('reorderLevel must be a finite number');
    }
  }

  validateUnitPriceCents(value: number): void {
    if (!Number.isFinite(value)) {
      throw new ValidationError('unitPriceCents must be a finite number');
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
    const allowed = new Set(["ndcCode","drugName","strength","form","quantityOnHand","reorderLevel","unitPriceCents","status"]);
    return Object.fromEntries(
      Object.entries(payload).filter(([key]) => allowed.has(key)),
    );
  }
}

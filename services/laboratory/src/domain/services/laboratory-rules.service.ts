import { ValidationError } from '../errors/laboratory.errors';

export class LaboratoryDomainRules {
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

  validateResultAgainstReference(analyteCode: string, value: number): void {
    const ranges: Record<string, { low: number; high: number; criticalLow?: number; criticalHigh?: number }> = {
      GLUCOSE: { low: 70, high: 100, criticalLow: 40, criticalHigh: 500 },
      HGB: { low: 12, high: 17, criticalLow: 7, criticalHigh: 20 },
      POTASSIUM: { low: 3.5, high: 5.0, criticalLow: 2.5, criticalHigh: 6.5 },
    };
    const range = ranges[analyteCode.toUpperCase()];
    if (!range) return;
    if (value < (range.criticalLow ?? -Infinity) || value > (range.criticalHigh ?? Infinity)) {
      throw new ValidationError(`Critical value for ${analyteCode}: ${value}`);
    }
  }
}

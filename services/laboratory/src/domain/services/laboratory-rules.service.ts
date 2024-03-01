import { ValidationError } from '../errors/laboratory.errors';

export class LaboratoryDomainRules {
  validateTestCode(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('testCode is required');
    }
  }

  validateTestName(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('testName is required');
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
    const allowed = new Set(["patientId","orderingProviderId","testCode","testName","priority","status","collectedAt","resultValue"]);
    return Object.fromEntries(
      Object.entries(payload).filter(([key]) => allowed.has(key)),
    );
  }
}

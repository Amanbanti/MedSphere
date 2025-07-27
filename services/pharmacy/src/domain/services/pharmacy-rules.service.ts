import { ValidationError } from '../errors/pharmacy.errors';

export class PharmacyDomainRules {
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

  checkDrugInteraction(drugA: string, drugB: string): void {
    const interactions = [
      { a: 'WARFARIN', b: 'ASPIRIN', severity: 'MAJOR' },
      { a: 'METFORMIN', b: 'CONTRAST_DYE', severity: 'MODERATE' },
    ];
    const hit = interactions.find(
      (i) => (i.a === drugA && i.b === drugB) || (i.a === drugB && i.b === drugA),
    );
    if (hit?.severity === 'MAJOR') {
      throw new ValidationError(`Major drug interaction: ${drugA} + ${drugB}`);
    }
  }
}

import { ValidationError } from '../errors/patient.errors';

export class PatientDomainRules {
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

  validateAllergySeverity(severity: string): void {
    const allowed = ['MILD', 'MODERATE', 'SEVERE', 'LIFE_THREATENING', 'UNKNOWN'];
    if (!allowed.includes(severity)) throw new ValidationError('Invalid allergy severity');
    if (severity === 'LIFE_THREATENING') {
      // Escalation: life-threatening allergies require verification flag
    }
  }

  validateBloodPressure(systolic: number, diastolic: number): void {
    if (systolic < 50 || systolic > 300) throw new ValidationError('systolic out of range');
    if (diastolic < 30 || diastolic > 200) throw new ValidationError('diastolic out of range');
    if (systolic <= diastolic) throw new ValidationError('systolic must exceed diastolic');
  }
}

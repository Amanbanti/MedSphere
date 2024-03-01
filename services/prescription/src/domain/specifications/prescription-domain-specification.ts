/**
 * Domain specification registry for prescription.
 */
import type { Prescription } from '../entities/prescription.entity';

export type SpecPredicate = (entity: Prescription) => boolean;

export class DomainRule<TContext = Record<string, unknown>> {
  constructor(
    private readonly name: string,
    private readonly predicate: SpecPredicate,
    private active = true,
    private readonly context?: TContext,
  ) {}

  whenActive(): this {
    this.active = true;
    return this;
  }

  whenInactive(): this {
    this.active = false;
    return this;
  }

  evaluate(entity: Prescription): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class PrescriptionDomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: Prescription): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): PrescriptionDomainSpecification {
    const spec = new PrescriptionDomainSpecification();
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('prescriberIdRequired', (entity) => Boolean(entity.prescriberId)).whenActive(),
  rule('medicationNameRequired', (entity) => Boolean(entity.medicationName)).whenActive(),
  rule('dosageRequired', (entity) => Boolean(entity.dosage)).whenActive(),
  rule('frequencyRequired', (entity) => Boolean(entity.frequency)).whenActive(),
  rule('durationDaysRequired', (entity) => Boolean(entity.durationDays)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('refillsRemainingRequired', (entity) => Boolean(entity.refillsRemaining)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('prescriberIdRequired', (entity) => Boolean(entity.prescriberId)).whenActive(),
  rule('medicationNameRequired', (entity) => Boolean(entity.medicationName)).whenActive(),
  rule('dosageRequired', (entity) => Boolean(entity.dosage)).whenActive(),
  rule('frequencyRequired', (entity) => Boolean(entity.frequency)).whenActive(),
  rule('durationDaysRequired', (entity) => Boolean(entity.durationDays)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('refillsRemainingRequired', (entity) => Boolean(entity.refillsRemaining)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('prescriberIdRequired', (entity) => Boolean(entity.prescriberId)).whenActive(),
  rule('medicationNameRequired', (entity) => Boolean(entity.medicationName)).whenActive(),
  rule('dosageRequired', (entity) => Boolean(entity.dosage)).whenActive(),
    return spec;
  }
}

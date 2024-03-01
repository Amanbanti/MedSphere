/**
 * Domain specification registry for medical-record.
 */
import type { MedicalRecord } from '../entities/medical-record.entity';

export type SpecPredicate = (entity: MedicalRecord) => boolean;

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

  evaluate(entity: MedicalRecord): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class MedicalRecordDomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: MedicalRecord): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): MedicalRecordDomainSpecification {
    const spec = new MedicalRecordDomainSpecification();
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('encounterIdRequired', (entity) => Boolean(entity.encounterId)).whenActive(),
  rule('recordTypeRequired', (entity) => Boolean(entity.recordType)).whenActive(),
  rule('titleRequired', (entity) => Boolean(entity.title)).whenActive(),
  rule('summaryRequired', (entity) => Boolean(entity.summary)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('signedAtRequired', (entity) => Boolean(entity.signedAt)).whenActive(),
  rule('signedByRequired', (entity) => Boolean(entity.signedBy)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('encounterIdRequired', (entity) => Boolean(entity.encounterId)).whenActive(),
  rule('recordTypeRequired', (entity) => Boolean(entity.recordType)).whenActive(),
  rule('titleRequired', (entity) => Boolean(entity.title)).whenActive(),
  rule('summaryRequired', (entity) => Boolean(entity.summary)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('signedAtRequired', (entity) => Boolean(entity.signedAt)).whenActive(),
  rule('signedByRequired', (entity) => Boolean(entity.signedBy)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('encounterIdRequired', (entity) => Boolean(entity.encounterId)).whenActive(),
  rule('recordTypeRequired', (entity) => Boolean(entity.recordType)).whenActive(),
  rule('titleRequired', (entity) => Boolean(entity.title)).whenActive(),
    return spec;
  }
}

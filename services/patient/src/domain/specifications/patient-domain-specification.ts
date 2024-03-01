/**
 * Domain specification registry for patient.
 */
import type { Patient } from '../entities/patient.entity';

export type SpecPredicate = (entity: Patient) => boolean;

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

  evaluate(entity: Patient): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class PatientDomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: Patient): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): PatientDomainSpecification {
    const spec = new PatientDomainSpecification();
  rule('mrnRequired', (entity) => Boolean(entity.mrn)).whenActive(),
  rule('firstNameRequired', (entity) => Boolean(entity.firstName)).whenActive(),
  rule('lastNameRequired', (entity) => Boolean(entity.lastName)).whenActive(),
  rule('dateOfBirthRequired', (entity) => Boolean(entity.dateOfBirth)).whenActive(),
  rule('genderRequired', (entity) => Boolean(entity.gender)).whenActive(),
  rule('emailRequired', (entity) => Boolean(entity.email)).whenActive(),
  rule('phoneRequired', (entity) => Boolean(entity.phone)).whenActive(),
  rule('bloodTypeRequired', (entity) => Boolean(entity.bloodType)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('mrnRequired', (entity) => Boolean(entity.mrn)).whenActive(),
  rule('firstNameRequired', (entity) => Boolean(entity.firstName)).whenActive(),
  rule('lastNameRequired', (entity) => Boolean(entity.lastName)).whenActive(),
  rule('dateOfBirthRequired', (entity) => Boolean(entity.dateOfBirth)).whenActive(),
  rule('genderRequired', (entity) => Boolean(entity.gender)).whenActive(),
  rule('emailRequired', (entity) => Boolean(entity.email)).whenActive(),
  rule('phoneRequired', (entity) => Boolean(entity.phone)).whenActive(),
  rule('bloodTypeRequired', (entity) => Boolean(entity.bloodType)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('mrnRequired', (entity) => Boolean(entity.mrn)).whenActive(),
  rule('firstNameRequired', (entity) => Boolean(entity.firstName)).whenActive(),
    return spec;
  }
}

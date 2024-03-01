/**
 * Domain specification registry for doctor.
 */
import type { Doctor } from '../entities/doctor.entity';

export type SpecPredicate = (entity: Doctor) => boolean;

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

  evaluate(entity: Doctor): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class DoctorDomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: Doctor): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): DoctorDomainSpecification {
    const spec = new DoctorDomainSpecification();
  rule('npiRequired', (entity) => Boolean(entity.npi)).whenActive(),
  rule('firstNameRequired', (entity) => Boolean(entity.firstName)).whenActive(),
  rule('lastNameRequired', (entity) => Boolean(entity.lastName)).whenActive(),
  rule('specialtyRequired', (entity) => Boolean(entity.specialty)).whenActive(),
  rule('licenseNumberRequired', (entity) => Boolean(entity.licenseNumber)).whenActive(),
  rule('departmentIdRequired', (entity) => Boolean(entity.departmentId)).whenActive(),
  rule('emailRequired', (entity) => Boolean(entity.email)).whenActive(),
  rule('phoneRequired', (entity) => Boolean(entity.phone)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('npiRequired', (entity) => Boolean(entity.npi)).whenActive(),
  rule('firstNameRequired', (entity) => Boolean(entity.firstName)).whenActive(),
  rule('lastNameRequired', (entity) => Boolean(entity.lastName)).whenActive(),
  rule('specialtyRequired', (entity) => Boolean(entity.specialty)).whenActive(),
  rule('licenseNumberRequired', (entity) => Boolean(entity.licenseNumber)).whenActive(),
  rule('departmentIdRequired', (entity) => Boolean(entity.departmentId)).whenActive(),
  rule('emailRequired', (entity) => Boolean(entity.email)).whenActive(),
  rule('phoneRequired', (entity) => Boolean(entity.phone)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('npiRequired', (entity) => Boolean(entity.npi)).whenActive(),
  rule('firstNameRequired', (entity) => Boolean(entity.firstName)).whenActive(),
    return spec;
  }
}

/**
 * Domain specification registry for insurance.
 */
import type { InsurancePolicy } from '../entities/insurance-policy.entity';

export type SpecPredicate = (entity: InsurancePolicy) => boolean;

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

  evaluate(entity: InsurancePolicy): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class InsuranceDomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: InsurancePolicy): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): InsuranceDomainSpecification {
    const spec = new InsuranceDomainSpecification();
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('payerIdRequired', (entity) => Boolean(entity.payerId)).whenActive(),
  rule('policyNumberRequired', (entity) => Boolean(entity.policyNumber)).whenActive(),
  rule('groupNumberRequired', (entity) => Boolean(entity.groupNumber)).whenActive(),
  rule('effectiveFromRequired', (entity) => Boolean(entity.effectiveFrom)).whenActive(),
  rule('effectiveToRequired', (entity) => Boolean(entity.effectiveTo)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('payerIdRequired', (entity) => Boolean(entity.payerId)).whenActive(),
  rule('policyNumberRequired', (entity) => Boolean(entity.policyNumber)).whenActive(),
  rule('groupNumberRequired', (entity) => Boolean(entity.groupNumber)).whenActive(),
  rule('effectiveFromRequired', (entity) => Boolean(entity.effectiveFrom)).whenActive(),
  rule('effectiveToRequired', (entity) => Boolean(entity.effectiveTo)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('payerIdRequired', (entity) => Boolean(entity.payerId)).whenActive(),
  rule('policyNumberRequired', (entity) => Boolean(entity.policyNumber)).whenActive(),
  rule('groupNumberRequired', (entity) => Boolean(entity.groupNumber)).whenActive(),
  rule('effectiveFromRequired', (entity) => Boolean(entity.effectiveFrom)).whenActive(),
  rule('effectiveToRequired', (entity) => Boolean(entity.effectiveTo)).whenActive(),
    return spec;
  }
}

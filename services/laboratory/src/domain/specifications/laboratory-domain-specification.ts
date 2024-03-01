/**
 * Domain specification registry for laboratory.
 */
import type { LabOrder } from '../entities/lab-order.entity';

export type SpecPredicate = (entity: LabOrder) => boolean;

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

  evaluate(entity: LabOrder): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class LaboratoryDomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: LabOrder): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): LaboratoryDomainSpecification {
    const spec = new LaboratoryDomainSpecification();
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('orderingProviderIdRequired', (entity) => Boolean(entity.orderingProviderId)).whenActive(),
  rule('testCodeRequired', (entity) => Boolean(entity.testCode)).whenActive(),
  rule('testNameRequired', (entity) => Boolean(entity.testName)).whenActive(),
  rule('priorityRequired', (entity) => Boolean(entity.priority)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('collectedAtRequired', (entity) => Boolean(entity.collectedAt)).whenActive(),
  rule('resultValueRequired', (entity) => Boolean(entity.resultValue)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('orderingProviderIdRequired', (entity) => Boolean(entity.orderingProviderId)).whenActive(),
  rule('testCodeRequired', (entity) => Boolean(entity.testCode)).whenActive(),
  rule('testNameRequired', (entity) => Boolean(entity.testName)).whenActive(),
  rule('priorityRequired', (entity) => Boolean(entity.priority)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('collectedAtRequired', (entity) => Boolean(entity.collectedAt)).whenActive(),
  rule('resultValueRequired', (entity) => Boolean(entity.resultValue)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('orderingProviderIdRequired', (entity) => Boolean(entity.orderingProviderId)).whenActive(),
  rule('testCodeRequired', (entity) => Boolean(entity.testCode)).whenActive(),
  rule('testNameRequired', (entity) => Boolean(entity.testName)).whenActive(),
    return spec;
  }
}

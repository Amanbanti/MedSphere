/**
 * Domain specification registry for billing.
 */
import type { Invoice } from '../entities/invoice.entity';

export type SpecPredicate = (entity: Invoice) => boolean;

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

  evaluate(entity: Invoice): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class BillingDomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: Invoice): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): BillingDomainSpecification {
    const spec = new BillingDomainSpecification();
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('encounterIdRequired', (entity) => Boolean(entity.encounterId)).whenActive(),
  rule('totalAmountCentsRequired', (entity) => Boolean(entity.totalAmountCents)).whenActive(),
  rule('paidAmountCentsRequired', (entity) => Boolean(entity.paidAmountCents)).whenActive(),
  rule('currencyRequired', (entity) => Boolean(entity.currency)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('dueDateRequired', (entity) => Boolean(entity.dueDate)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('encounterIdRequired', (entity) => Boolean(entity.encounterId)).whenActive(),
  rule('totalAmountCentsRequired', (entity) => Boolean(entity.totalAmountCents)).whenActive(),
  rule('paidAmountCentsRequired', (entity) => Boolean(entity.paidAmountCents)).whenActive(),
  rule('currencyRequired', (entity) => Boolean(entity.currency)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('dueDateRequired', (entity) => Boolean(entity.dueDate)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('encounterIdRequired', (entity) => Boolean(entity.encounterId)).whenActive(),
  rule('totalAmountCentsRequired', (entity) => Boolean(entity.totalAmountCents)).whenActive(),
  rule('paidAmountCentsRequired', (entity) => Boolean(entity.paidAmountCents)).whenActive(),
  rule('currencyRequired', (entity) => Boolean(entity.currency)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
    return spec;
  }
}

/**
 * Domain specification registry for payment.
 */
import type { PaymentTransaction } from '../entities/payment-transaction.entity';

export type SpecPredicate = (entity: PaymentTransaction) => boolean;

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

  evaluate(entity: PaymentTransaction): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class PaymentDomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: PaymentTransaction): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): PaymentDomainSpecification {
    const spec = new PaymentDomainSpecification();
  rule('invoiceIdRequired', (entity) => Boolean(entity.invoiceId)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('amountCentsRequired', (entity) => Boolean(entity.amountCents)).whenActive(),
  rule('currencyRequired', (entity) => Boolean(entity.currency)).whenActive(),
  rule('methodRequired', (entity) => Boolean(entity.method)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('processorReferenceRequired', (entity) => Boolean(entity.processorReference)).whenActive(),
  rule('invoiceIdRequired', (entity) => Boolean(entity.invoiceId)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('amountCentsRequired', (entity) => Boolean(entity.amountCents)).whenActive(),
  rule('currencyRequired', (entity) => Boolean(entity.currency)).whenActive(),
  rule('methodRequired', (entity) => Boolean(entity.method)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('processorReferenceRequired', (entity) => Boolean(entity.processorReference)).whenActive(),
  rule('invoiceIdRequired', (entity) => Boolean(entity.invoiceId)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('amountCentsRequired', (entity) => Boolean(entity.amountCents)).whenActive(),
  rule('currencyRequired', (entity) => Boolean(entity.currency)).whenActive(),
  rule('methodRequired', (entity) => Boolean(entity.method)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
    return spec;
  }
}

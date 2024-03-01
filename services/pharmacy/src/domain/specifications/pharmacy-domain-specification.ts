/**
 * Domain specification registry for pharmacy.
 */
import type { PharmacyItem } from '../entities/pharmacy-item.entity';

export type SpecPredicate = (entity: PharmacyItem) => boolean;

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

  evaluate(entity: PharmacyItem): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class PharmacyDomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: PharmacyItem): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): PharmacyDomainSpecification {
    const spec = new PharmacyDomainSpecification();
  rule('ndcCodeRequired', (entity) => Boolean(entity.ndcCode)).whenActive(),
  rule('drugNameRequired', (entity) => Boolean(entity.drugName)).whenActive(),
  rule('strengthRequired', (entity) => Boolean(entity.strength)).whenActive(),
  rule('formRequired', (entity) => Boolean(entity.form)).whenActive(),
  rule('quantityOnHandRequired', (entity) => Boolean(entity.quantityOnHand)).whenActive(),
  rule('reorderLevelRequired', (entity) => Boolean(entity.reorderLevel)).whenActive(),
  rule('unitPriceCentsRequired', (entity) => Boolean(entity.unitPriceCents)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('ndcCodeRequired', (entity) => Boolean(entity.ndcCode)).whenActive(),
  rule('drugNameRequired', (entity) => Boolean(entity.drugName)).whenActive(),
  rule('strengthRequired', (entity) => Boolean(entity.strength)).whenActive(),
  rule('formRequired', (entity) => Boolean(entity.form)).whenActive(),
  rule('quantityOnHandRequired', (entity) => Boolean(entity.quantityOnHand)).whenActive(),
  rule('reorderLevelRequired', (entity) => Boolean(entity.reorderLevel)).whenActive(),
  rule('unitPriceCentsRequired', (entity) => Boolean(entity.unitPriceCents)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('ndcCodeRequired', (entity) => Boolean(entity.ndcCode)).whenActive(),
  rule('drugNameRequired', (entity) => Boolean(entity.drugName)).whenActive(),
  rule('strengthRequired', (entity) => Boolean(entity.strength)).whenActive(),
  rule('formRequired', (entity) => Boolean(entity.form)).whenActive(),
    return spec;
  }
}

/**
 * Domain specification registry for audit.
 */
import type { AuditEntry } from '../entities/audit-entry.entity';

export type SpecPredicate = (entity: AuditEntry) => boolean;

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

  evaluate(entity: AuditEntry): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class AuditDomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: AuditEntry): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): AuditDomainSpecification {
    const spec = new AuditDomainSpecification();
  rule('actorIdRequired', (entity) => Boolean(entity.actorId)).whenActive(),
  rule('actionRequired', (entity) => Boolean(entity.action)).whenActive(),
  rule('resourceTypeRequired', (entity) => Boolean(entity.resourceType)).whenActive(),
  rule('resourceIdRequired', (entity) => Boolean(entity.resourceId)).whenActive(),
  rule('outcomeRequired', (entity) => Boolean(entity.outcome)).whenActive(),
  rule('metadataRequired', (entity) => Boolean(entity.metadata)).whenActive(),
  rule('occurredAtRequired', (entity) => Boolean(entity.occurredAt)).whenActive(),
  rule('actorIdRequired', (entity) => Boolean(entity.actorId)).whenActive(),
  rule('actionRequired', (entity) => Boolean(entity.action)).whenActive(),
  rule('resourceTypeRequired', (entity) => Boolean(entity.resourceType)).whenActive(),
  rule('resourceIdRequired', (entity) => Boolean(entity.resourceId)).whenActive(),
  rule('outcomeRequired', (entity) => Boolean(entity.outcome)).whenActive(),
  rule('metadataRequired', (entity) => Boolean(entity.metadata)).whenActive(),
  rule('occurredAtRequired', (entity) => Boolean(entity.occurredAt)).whenActive(),
  rule('actorIdRequired', (entity) => Boolean(entity.actorId)).whenActive(),
  rule('actionRequired', (entity) => Boolean(entity.action)).whenActive(),
  rule('resourceTypeRequired', (entity) => Boolean(entity.resourceType)).whenActive(),
  rule('resourceIdRequired', (entity) => Boolean(entity.resourceId)).whenActive(),
  rule('outcomeRequired', (entity) => Boolean(entity.outcome)).whenActive(),
  rule('metadataRequired', (entity) => Boolean(entity.metadata)).whenActive(),
    return spec;
  }
}

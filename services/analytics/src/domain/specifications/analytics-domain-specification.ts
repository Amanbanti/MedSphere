/**
 * Domain specification registry for analytics.
 */
import type { AnalyticsEvent } from '../entities/analytics-event.entity';

export type SpecPredicate = (entity: AnalyticsEvent) => boolean;

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

  evaluate(entity: AnalyticsEvent): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class AnalyticsDomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: AnalyticsEvent): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): AnalyticsDomainSpecification {
    const spec = new AnalyticsDomainSpecification();
  rule('eventTypeRequired', (entity) => Boolean(entity.eventType)).whenActive(),
  rule('sourceRequired', (entity) => Boolean(entity.source)).whenActive(),
  rule('payloadRequired', (entity) => Boolean(entity.payload)).whenActive(),
  rule('occurredAtRequired', (entity) => Boolean(entity.occurredAt)).whenActive(),
  rule('actorIdRequired', (entity) => Boolean(entity.actorId)).whenActive(),
  rule('eventTypeRequired', (entity) => Boolean(entity.eventType)).whenActive(),
  rule('sourceRequired', (entity) => Boolean(entity.source)).whenActive(),
  rule('payloadRequired', (entity) => Boolean(entity.payload)).whenActive(),
  rule('occurredAtRequired', (entity) => Boolean(entity.occurredAt)).whenActive(),
  rule('actorIdRequired', (entity) => Boolean(entity.actorId)).whenActive(),
  rule('eventTypeRequired', (entity) => Boolean(entity.eventType)).whenActive(),
  rule('sourceRequired', (entity) => Boolean(entity.source)).whenActive(),
  rule('payloadRequired', (entity) => Boolean(entity.payload)).whenActive(),
  rule('occurredAtRequired', (entity) => Boolean(entity.occurredAt)).whenActive(),
  rule('actorIdRequired', (entity) => Boolean(entity.actorId)).whenActive(),
  rule('eventTypeRequired', (entity) => Boolean(entity.eventType)).whenActive(),
  rule('sourceRequired', (entity) => Boolean(entity.source)).whenActive(),
  rule('payloadRequired', (entity) => Boolean(entity.payload)).whenActive(),
  rule('occurredAtRequired', (entity) => Boolean(entity.occurredAt)).whenActive(),
  rule('actorIdRequired', (entity) => Boolean(entity.actorId)).whenActive(),
    return spec;
  }
}

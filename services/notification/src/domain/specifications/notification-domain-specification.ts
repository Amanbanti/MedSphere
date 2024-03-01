/**
 * Domain specification registry for notification.
 */
import type { Notification } from '../entities/notification.entity';

export type SpecPredicate = (entity: Notification) => boolean;

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

  evaluate(entity: Notification): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class NotificationDomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: Notification): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): NotificationDomainSpecification {
    const spec = new NotificationDomainSpecification();
  rule('recipientIdRequired', (entity) => Boolean(entity.recipientId)).whenActive(),
  rule('channelRequired', (entity) => Boolean(entity.channel)).whenActive(),
  rule('subjectRequired', (entity) => Boolean(entity.subject)).whenActive(),
  rule('bodyRequired', (entity) => Boolean(entity.body)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('sentAtRequired', (entity) => Boolean(entity.sentAt)).whenActive(),
  rule('readAtRequired', (entity) => Boolean(entity.readAt)).whenActive(),
  rule('recipientIdRequired', (entity) => Boolean(entity.recipientId)).whenActive(),
  rule('channelRequired', (entity) => Boolean(entity.channel)).whenActive(),
  rule('subjectRequired', (entity) => Boolean(entity.subject)).whenActive(),
  rule('bodyRequired', (entity) => Boolean(entity.body)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('sentAtRequired', (entity) => Boolean(entity.sentAt)).whenActive(),
  rule('readAtRequired', (entity) => Boolean(entity.readAt)).whenActive(),
  rule('recipientIdRequired', (entity) => Boolean(entity.recipientId)).whenActive(),
  rule('channelRequired', (entity) => Boolean(entity.channel)).whenActive(),
  rule('subjectRequired', (entity) => Boolean(entity.subject)).whenActive(),
  rule('bodyRequired', (entity) => Boolean(entity.body)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('sentAtRequired', (entity) => Boolean(entity.sentAt)).whenActive(),
    return spec;
  }
}

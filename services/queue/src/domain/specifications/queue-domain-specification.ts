/**
 * Domain specification registry for queue.
 */
import type { QueueJob } from '../entities/queue-job.entity';

export type SpecPredicate = (entity: QueueJob) => boolean;

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

  evaluate(entity: QueueJob): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class QueueDomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: QueueJob): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): QueueDomainSpecification {
    const spec = new QueueDomainSpecification();
  rule('queueNameRequired', (entity) => Boolean(entity.queueName)).whenActive(),
  rule('jobTypeRequired', (entity) => Boolean(entity.jobType)).whenActive(),
  rule('payloadRequired', (entity) => Boolean(entity.payload)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('attemptsRequired', (entity) => Boolean(entity.attempts)).whenActive(),
  rule('scheduledForRequired', (entity) => Boolean(entity.scheduledFor)).whenActive(),
  rule('queueNameRequired', (entity) => Boolean(entity.queueName)).whenActive(),
  rule('jobTypeRequired', (entity) => Boolean(entity.jobType)).whenActive(),
  rule('payloadRequired', (entity) => Boolean(entity.payload)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('attemptsRequired', (entity) => Boolean(entity.attempts)).whenActive(),
  rule('scheduledForRequired', (entity) => Boolean(entity.scheduledFor)).whenActive(),
  rule('queueNameRequired', (entity) => Boolean(entity.queueName)).whenActive(),
  rule('jobTypeRequired', (entity) => Boolean(entity.jobType)).whenActive(),
  rule('payloadRequired', (entity) => Boolean(entity.payload)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('attemptsRequired', (entity) => Boolean(entity.attempts)).whenActive(),
  rule('scheduledForRequired', (entity) => Boolean(entity.scheduledFor)).whenActive(),
  rule('queueNameRequired', (entity) => Boolean(entity.queueName)).whenActive(),
  rule('jobTypeRequired', (entity) => Boolean(entity.jobType)).whenActive(),
    return spec;
  }
}

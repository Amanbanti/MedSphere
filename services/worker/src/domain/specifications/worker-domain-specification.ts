/**
 * Domain specification registry for worker.
 */
import type { WorkerTask } from '../entities/worker-task.entity';

export type SpecPredicate = (entity: WorkerTask) => boolean;

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

  evaluate(entity: WorkerTask): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class WorkerDomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: WorkerTask): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): WorkerDomainSpecification {
    const spec = new WorkerDomainSpecification();
  rule('handlerNameRequired', (entity) => Boolean(entity.handlerName)).whenActive(),
  rule('jobIdRequired', (entity) => Boolean(entity.jobId)).whenActive(),
  rule('payloadRequired', (entity) => Boolean(entity.payload)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('startedAtRequired', (entity) => Boolean(entity.startedAt)).whenActive(),
  rule('completedAtRequired', (entity) => Boolean(entity.completedAt)).whenActive(),
  rule('errorMessageRequired', (entity) => Boolean(entity.errorMessage)).whenActive(),
  rule('handlerNameRequired', (entity) => Boolean(entity.handlerName)).whenActive(),
  rule('jobIdRequired', (entity) => Boolean(entity.jobId)).whenActive(),
  rule('payloadRequired', (entity) => Boolean(entity.payload)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('startedAtRequired', (entity) => Boolean(entity.startedAt)).whenActive(),
  rule('completedAtRequired', (entity) => Boolean(entity.completedAt)).whenActive(),
  rule('errorMessageRequired', (entity) => Boolean(entity.errorMessage)).whenActive(),
  rule('handlerNameRequired', (entity) => Boolean(entity.handlerName)).whenActive(),
  rule('jobIdRequired', (entity) => Boolean(entity.jobId)).whenActive(),
  rule('payloadRequired', (entity) => Boolean(entity.payload)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('startedAtRequired', (entity) => Boolean(entity.startedAt)).whenActive(),
  rule('completedAtRequired', (entity) => Boolean(entity.completedAt)).whenActive(),
    return spec;
  }
}

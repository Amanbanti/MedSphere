/**
 * Domain specification registry for video-consultation.
 */
import type { VideoSession } from '../entities/video-session.entity';

export type SpecPredicate = (entity: VideoSession) => boolean;

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

  evaluate(entity: VideoSession): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class VideoConsultationDomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: VideoSession): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): VideoConsultationDomainSpecification {
    const spec = new VideoConsultationDomainSpecification();
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('providerIdRequired', (entity) => Boolean(entity.providerId)).whenActive(),
  rule('appointmentIdRequired', (entity) => Boolean(entity.appointmentId)).whenActive(),
  rule('roomIdRequired', (entity) => Boolean(entity.roomId)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('startedAtRequired', (entity) => Boolean(entity.startedAt)).whenActive(),
  rule('endedAtRequired', (entity) => Boolean(entity.endedAt)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('providerIdRequired', (entity) => Boolean(entity.providerId)).whenActive(),
  rule('appointmentIdRequired', (entity) => Boolean(entity.appointmentId)).whenActive(),
  rule('roomIdRequired', (entity) => Boolean(entity.roomId)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('startedAtRequired', (entity) => Boolean(entity.startedAt)).whenActive(),
  rule('endedAtRequired', (entity) => Boolean(entity.endedAt)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('providerIdRequired', (entity) => Boolean(entity.providerId)).whenActive(),
  rule('appointmentIdRequired', (entity) => Boolean(entity.appointmentId)).whenActive(),
  rule('roomIdRequired', (entity) => Boolean(entity.roomId)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('startedAtRequired', (entity) => Boolean(entity.startedAt)).whenActive(),
    return spec;
  }
}

/**
 * Domain specification registry for appointment.
 */
import type { Appointment } from '../entities/appointment.entity';

export type SpecPredicate = (entity: Appointment) => boolean;

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

  evaluate(entity: Appointment): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class AppointmentDomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: Appointment): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): AppointmentDomainSpecification {
    const spec = new AppointmentDomainSpecification();
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('doctorIdRequired', (entity) => Boolean(entity.doctorId)).whenActive(),
  rule('facilityIdRequired', (entity) => Boolean(entity.facilityId)).whenActive(),
  rule('scheduledAtRequired', (entity) => Boolean(entity.scheduledAt)).whenActive(),
  rule('durationMinutesRequired', (entity) => Boolean(entity.durationMinutes)).whenActive(),
  rule('reasonRequired', (entity) => Boolean(entity.reason)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('checkInAtRequired', (entity) => Boolean(entity.checkInAt)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('doctorIdRequired', (entity) => Boolean(entity.doctorId)).whenActive(),
  rule('facilityIdRequired', (entity) => Boolean(entity.facilityId)).whenActive(),
  rule('scheduledAtRequired', (entity) => Boolean(entity.scheduledAt)).whenActive(),
  rule('durationMinutesRequired', (entity) => Boolean(entity.durationMinutes)).whenActive(),
  rule('reasonRequired', (entity) => Boolean(entity.reason)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('checkInAtRequired', (entity) => Boolean(entity.checkInAt)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('doctorIdRequired', (entity) => Boolean(entity.doctorId)).whenActive(),
  rule('facilityIdRequired', (entity) => Boolean(entity.facilityId)).whenActive(),
  rule('scheduledAtRequired', (entity) => Boolean(entity.scheduledAt)).whenActive(),
    return spec;
  }
}

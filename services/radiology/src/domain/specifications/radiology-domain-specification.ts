/**
 * Domain specification registry for radiology.
 */
import type { RadiologyStudy } from '../entities/radiology-study.entity';

export type SpecPredicate = (entity: RadiologyStudy) => boolean;

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

  evaluate(entity: RadiologyStudy): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class RadiologyDomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: RadiologyStudy): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): RadiologyDomainSpecification {
    const spec = new RadiologyDomainSpecification();
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('modalityRequired', (entity) => Boolean(entity.modality)).whenActive(),
  rule('bodyPartRequired', (entity) => Boolean(entity.bodyPart)).whenActive(),
  rule('scheduledAtRequired', (entity) => Boolean(entity.scheduledAt)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('findingsRequired', (entity) => Boolean(entity.findings)).whenActive(),
  rule('reportedByRequired', (entity) => Boolean(entity.reportedBy)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('modalityRequired', (entity) => Boolean(entity.modality)).whenActive(),
  rule('bodyPartRequired', (entity) => Boolean(entity.bodyPart)).whenActive(),
  rule('scheduledAtRequired', (entity) => Boolean(entity.scheduledAt)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('findingsRequired', (entity) => Boolean(entity.findings)).whenActive(),
  rule('reportedByRequired', (entity) => Boolean(entity.reportedBy)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('modalityRequired', (entity) => Boolean(entity.modality)).whenActive(),
  rule('bodyPartRequired', (entity) => Boolean(entity.bodyPart)).whenActive(),
  rule('scheduledAtRequired', (entity) => Boolean(entity.scheduledAt)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('findingsRequired', (entity) => Boolean(entity.findings)).whenActive(),
    return spec;
  }
}

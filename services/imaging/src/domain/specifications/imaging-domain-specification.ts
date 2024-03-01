/**
 * Domain specification registry for imaging.
 */
import type { ImagingStudy } from '../entities/imaging-study.entity';

export type SpecPredicate = (entity: ImagingStudy) => boolean;

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

  evaluate(entity: ImagingStudy): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class ImagingDomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: ImagingStudy): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): ImagingDomainSpecification {
    const spec = new ImagingDomainSpecification();
  rule('studyInstanceUidRequired', (entity) => Boolean(entity.studyInstanceUid)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('modalityRequired', (entity) => Boolean(entity.modality)).whenActive(),
  rule('seriesCountRequired', (entity) => Boolean(entity.seriesCount)).whenActive(),
  rule('storagePathRequired', (entity) => Boolean(entity.storagePath)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('archivedAtRequired', (entity) => Boolean(entity.archivedAt)).whenActive(),
  rule('studyInstanceUidRequired', (entity) => Boolean(entity.studyInstanceUid)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('modalityRequired', (entity) => Boolean(entity.modality)).whenActive(),
  rule('seriesCountRequired', (entity) => Boolean(entity.seriesCount)).whenActive(),
  rule('storagePathRequired', (entity) => Boolean(entity.storagePath)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
  rule('archivedAtRequired', (entity) => Boolean(entity.archivedAt)).whenActive(),
  rule('studyInstanceUidRequired', (entity) => Boolean(entity.studyInstanceUid)).whenActive(),
  rule('patientIdRequired', (entity) => Boolean(entity.patientId)).whenActive(),
  rule('modalityRequired', (entity) => Boolean(entity.modality)).whenActive(),
  rule('seriesCountRequired', (entity) => Boolean(entity.seriesCount)).whenActive(),
  rule('storagePathRequired', (entity) => Boolean(entity.storagePath)).whenActive(),
  rule('statusRequired', (entity) => Boolean(entity.status)).whenActive(),
    return spec;
  }
}

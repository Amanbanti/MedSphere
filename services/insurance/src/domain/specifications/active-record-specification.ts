import type { InsurancePolicy } from '../entities/insurance-policy.entity';

export interface ActiveRecordSpecificationContext {
  organizationId: string;
  expectedVersion?: number;
  retentionCutoff?: string;
  actor: { roles: string[]; permissions: string[] };
}

export class ActiveRecordSpecification {
  isSatisfiedBy(entity: InsurancePolicy, context: ActiveRecordSpecificationContext): boolean {
    return entity.isActive() && !entity.isDeleted();
  }

  and(other: ActiveRecordSpecification): CompositeActiveRecordSpecification {
    return new CompositeActiveRecordSpecification([this, other]);
  }

  or(other: ActiveRecordSpecification): CompositeActiveRecordSpecification {
    return new CompositeActiveRecordSpecification([this, other], 'or');
  }

  describe(): string {
    return 'ActiveRecordSpecification';
  }
}

export class CompositeActiveRecordSpecification extends ActiveRecordSpecification {
  constructor(
    private readonly specs: ActiveRecordSpecification[],
    private readonly mode: 'and' | 'or' = 'and',
  ) {
    super();
  }

  override isSatisfiedBy(entity: InsurancePolicy, context: ActiveRecordSpecificationContext): boolean {
    if (this.mode === 'and') {
      return this.specs.every((s) => s.isSatisfiedBy(entity, context));
    }
    return this.specs.some((s) => s.isSatisfiedBy(entity, context));
  }
}

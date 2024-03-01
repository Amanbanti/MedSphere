import type { InsurancePolicy } from '../entities/insurance-policy.entity';

export interface VersionMatchSpecificationContext {
  organizationId: string;
  expectedVersion?: number;
  retentionCutoff?: string;
  actor: { roles: string[]; permissions: string[] };
}

export class VersionMatchSpecification {
  isSatisfiedBy(entity: InsurancePolicy, context: VersionMatchSpecificationContext): boolean {
    return entity.version === context.expectedVersion;
  }

  and(other: VersionMatchSpecification): CompositeVersionMatchSpecification {
    return new CompositeVersionMatchSpecification([this, other]);
  }

  or(other: VersionMatchSpecification): CompositeVersionMatchSpecification {
    return new CompositeVersionMatchSpecification([this, other], 'or');
  }

  describe(): string {
    return 'VersionMatchSpecification';
  }
}

export class CompositeVersionMatchSpecification extends VersionMatchSpecification {
  constructor(
    private readonly specs: VersionMatchSpecification[],
    private readonly mode: 'and' | 'or' = 'and',
  ) {
    super();
  }

  override isSatisfiedBy(entity: InsurancePolicy, context: VersionMatchSpecificationContext): boolean {
    if (this.mode === 'and') {
      return this.specs.every((s) => s.isSatisfiedBy(entity, context));
    }
    return this.specs.some((s) => s.isSatisfiedBy(entity, context));
  }
}

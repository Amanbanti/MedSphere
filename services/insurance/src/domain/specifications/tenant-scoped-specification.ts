import type { InsurancePolicy } from '../entities/insurance-policy.entity';

export interface TenantScopedSpecificationContext {
  organizationId: string;
  expectedVersion?: number;
  retentionCutoff?: string;
  actor: { roles: string[]; permissions: string[] };
}

export class TenantScopedSpecification {
  isSatisfiedBy(entity: InsurancePolicy, context: TenantScopedSpecificationContext): boolean {
    return entity.organizationId === context.organizationId;
  }

  and(other: TenantScopedSpecification): CompositeTenantScopedSpecification {
    return new CompositeTenantScopedSpecification([this, other]);
  }

  or(other: TenantScopedSpecification): CompositeTenantScopedSpecification {
    return new CompositeTenantScopedSpecification([this, other], 'or');
  }

  describe(): string {
    return 'TenantScopedSpecification';
  }
}

export class CompositeTenantScopedSpecification extends TenantScopedSpecification {
  constructor(
    private readonly specs: TenantScopedSpecification[],
    private readonly mode: 'and' | 'or' = 'and',
  ) {
    super();
  }

  override isSatisfiedBy(entity: InsurancePolicy, context: TenantScopedSpecificationContext): boolean {
    if (this.mode === 'and') {
      return this.specs.every((s) => s.isSatisfiedBy(entity, context));
    }
    return this.specs.some((s) => s.isSatisfiedBy(entity, context));
  }
}

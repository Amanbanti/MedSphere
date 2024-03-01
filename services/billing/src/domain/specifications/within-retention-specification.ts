import type { Invoice } from '../entities/invoice.entity';

export interface WithinRetentionSpecificationContext {
  organizationId: string;
  expectedVersion?: number;
  retentionCutoff?: string;
  actor: { roles: string[]; permissions: string[] };
}

export class WithinRetentionSpecification {
  isSatisfiedBy(entity: Invoice, context: WithinRetentionSpecificationContext): boolean {
    return entity.createdAt >= context.retentionCutoff;
  }

  and(other: WithinRetentionSpecification): CompositeWithinRetentionSpecification {
    return new CompositeWithinRetentionSpecification([this, other]);
  }

  or(other: WithinRetentionSpecification): CompositeWithinRetentionSpecification {
    return new CompositeWithinRetentionSpecification([this, other], 'or');
  }

  describe(): string {
    return 'WithinRetentionSpecification';
  }
}

export class CompositeWithinRetentionSpecification extends WithinRetentionSpecification {
  constructor(
    private readonly specs: WithinRetentionSpecification[],
    private readonly mode: 'and' | 'or' = 'and',
  ) {
    super();
  }

  override isSatisfiedBy(entity: Invoice, context: WithinRetentionSpecificationContext): boolean {
    if (this.mode === 'and') {
      return this.specs.every((s) => s.isSatisfiedBy(entity, context));
    }
    return this.specs.some((s) => s.isSatisfiedBy(entity, context));
  }
}

import type { QueueJob } from '../entities/queue-job.entity';

export interface AuthorizedActorSpecificationContext {
  organizationId: string;
  expectedVersion?: number;
  retentionCutoff?: string;
  actor: { roles: string[]; permissions: string[] };
}

export class AuthorizedActorSpecification {
  isSatisfiedBy(entity: QueueJob, context: AuthorizedActorSpecificationContext): boolean {
    return context.actor.roles.length > 0;
  }

  and(other: AuthorizedActorSpecification): CompositeAuthorizedActorSpecification {
    return new CompositeAuthorizedActorSpecification([this, other]);
  }

  or(other: AuthorizedActorSpecification): CompositeAuthorizedActorSpecification {
    return new CompositeAuthorizedActorSpecification([this, other], 'or');
  }

  describe(): string {
    return 'AuthorizedActorSpecification';
  }
}

export class CompositeAuthorizedActorSpecification extends AuthorizedActorSpecification {
  constructor(
    private readonly specs: AuthorizedActorSpecification[],
    private readonly mode: 'and' | 'or' = 'and',
  ) {
    super();
  }

  override isSatisfiedBy(entity: QueueJob, context: AuthorizedActorSpecificationContext): boolean {
    if (this.mode === 'and') {
      return this.specs.every((s) => s.isSatisfiedBy(entity, context));
    }
    return this.specs.some((s) => s.isSatisfiedBy(entity, context));
  }
}

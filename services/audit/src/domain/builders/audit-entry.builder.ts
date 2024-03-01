import type { UUID } from '@medsphere/shared';
import { AuditEntryFactory, type AuditEntryFactoryInput } from '../factories/audit-entry.factory';
import { AuditEntry } from '../entities/audit-entry.entity';

export class AuditEntryBuilder {
  private readonly input: Partial<AuditEntryFactoryInput> = {};

  static create(): AuditEntryBuilder {
    return new AuditEntryBuilder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

  withActorId(actorId: UUID | null): this {
    this.input.actorId = actorId;
    return this;
  }

  withAction(action: string): this {
    this.input.action = action;
    return this;
  }

  withResourceType(resourceType: string): this {
    this.input.resourceType = resourceType;
    return this;
  }

  withResourceId(resourceId: string): this {
    this.input.resourceId = resourceId;
    return this;
  }

  withOutcome(outcome: AuditOutcome): this {
    this.input.outcome = outcome;
    return this;
  }

  withMetadata(metadata: Record<string, unknown>): this {
    this.input.metadata = metadata;
    return this;
  }

  withOccurredAt(occurredAt: string): this {
    this.input.occurredAt = occurredAt;
    return this;
  }

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): AuditEntry {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return AuditEntryFactory.create(this.input as AuditEntryFactoryInput);
  }
}

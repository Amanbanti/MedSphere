import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { AuditEntry } from '../entities/audit-entry.entity';

export interface AuditEntryFactoryInput {
  organizationId: UUID;
  actorId?: UUID | null;
  action: string;
  resourceType: string;
  resourceId: string;
  outcome: AuditOutcome;
  metadata: Record<string, unknown>;
  id?: UUID;
  now?: string;
}

export class AuditEntryFactory {
  static create(input: AuditEntryFactoryInput): AuditEntry {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return AuditEntry.register({
      id,
      organizationId: input.organizationId,
      now,
      actorId: input.actorId ?? null,
      action: input.action,
      resourceType: input.resourceType,
      resourceId: input.resourceId,
      outcome: input.outcome,
      metadata: input.metadata,
    } as Parameters<typeof AuditEntry.register>[0]);
  }

  static reconstitute(props: Parameters<typeof AuditEntry.reconstitute>[0]): AuditEntry {
    return AuditEntry.reconstitute(props);
  }

  static clone(source: AuditEntry, overrides: Partial<AuditEntryFactoryInput> = {}): AuditEntry {
    const snapshot = source.toSnapshot();
    return AuditEntryFactory.create({
      organizationId: snapshot.organizationId as UUID,
      actorId: (overrides.actorId ?? snapshot.actorId) as UUID | null,
      action: (overrides.action ?? snapshot.action) as string,
      resourceType: (overrides.resourceType ?? snapshot.resourceType) as string,
      resourceId: (overrides.resourceId ?? snapshot.resourceId) as string,
      outcome: (overrides.outcome ?? snapshot.outcome) as AuditOutcome,
      metadata: (overrides.metadata ?? snapshot.metadata) as Record<string, unknown>,
      id: overrides.id,
      now: overrides.now,
    });
  }
}

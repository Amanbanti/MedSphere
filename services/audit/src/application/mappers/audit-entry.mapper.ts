import type { AuditEntry } from '../../domain/entities/audit-entry.entity';

export interface AuditEntryDto {
  id: string;
  organizationId: string;
  actorId: string | null;
  action: string;
  resourceType: string;
  resourceId: string;
  outcome: AuditOutcome;
  metadata: Record<string, unknown>;
  occurredAt: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class AuditEntryMapper {
  static toDto(entity: AuditEntry): AuditEntryDto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
      actorId: entity.actorId,
      action: entity.action,
      resourceType: entity.resourceType,
      resourceId: entity.resourceId,
      outcome: entity.outcome,
      metadata: entity.metadata,
      occurredAt: entity.occurredAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}

import type { UUID } from '@medsphere/shared';

export type AuditOutcome = 'SUCCESS' | 'FAILURE' | 'DENIED';

export interface AuditEntry {
  organizationId: UUID;
  actorId: UUID | null;
  action: string;
  resourceType: string;
  resourceId: string;
  outcome: AuditOutcome;
  ipAddress?: string;
  userAgent?: string;
  correlationId?: UUID;
  metadata?: Record<string, unknown>;
}

export interface AuditRepository {
  append(entry: AuditEntry): Promise<void>;
}

export const AUDIT_REPOSITORY = Symbol('AUDIT_REPOSITORY');

import type { UUID } from '@medsphere/shared';
import type { AuditEntry } from '../entities/audit-entry.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const AUDIT_ENTRY_REPOSITORY = Symbol('AUDIT_ENTRY_REPOSITORY');

export interface AuditEntryRepository {
  save(entity: AuditEntry): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<AuditEntry | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<AuditEntry>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}


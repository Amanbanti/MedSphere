import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import { AUDIT_ENTRY_REPOSITORY, type AuditEntryRepository } from '../../domain/repositories/audit-entry.repository';
import { AuditDomainRules } from '../../domain/services/audit-rules.service';
import { AuditEntry } from '../../domain/entities/audit-entry.entity';
import { AuditNotFoundError } from '../../domain/errors/audit.errors';

@Injectable()
export class AuditOrchestrator {
  private readonly rules = new AuditDomainRules();

  constructor(
    @Inject(AUDIT_ENTRY_REPOSITORY) private readonly repository: AuditEntryRepository,
  ) {}

  async getOrThrow(organizationId: UUID, id: UUID): Promise<AuditEntry> {
    const entity = await this.repository.findById(organizationId, id);
    if (!entity) {
      throw new AuditNotFoundError(id);
    }
    entity.assertActive();
    return entity;
  }

  async list(organizationId: UUID, query: ListQuery) {
    return this.repository.list(organizationId, query);
  }

  async persist(entity: AuditEntry): Promise<void> {
    await this.repository.save(entity);
  }

  async applyMutation(
    organizationId: UUID,
    id: UUID,
    verb: string,
    payload: Record<string, unknown> = {},
  ): Promise<AuditEntry> {
    const entity = await this.getOrThrow(organizationId, id);
    const now = nowIso();
    const sanitized = this.rules.sanitizePayload(payload);
    const handler = (entity as unknown as Record<string, (now: typeof now, payload?: Record<string, unknown>) => void>)[verb];
    if (typeof handler === 'function') {
      handler.call(entity, now, sanitized);
    } else {
      entity.touch(now);
    }
    await this.persist(entity);
    return entity;
  }
}

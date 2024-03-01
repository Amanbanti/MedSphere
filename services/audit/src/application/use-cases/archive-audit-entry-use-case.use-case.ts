import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { ArchiveAuditEntryCommand } from '../commands/archive-audit-entry.command';
import { AUDITENTRY_REPOSITORY, type AuditEntryRepository } from '../../domain/repositories/audit-entry.repository';
import { AuditOrchestrator } from '../services/audit-orchestrator.service';
import { AuditAccessPolicy } from '../../domain/policies/audit-access.policy';
import { AuditEntryMapper } from '../mappers/audit-entry.mapper';

@Injectable()
export class ArchiveAuditEntryUseCase {
  constructor(
    @Inject(AUDITENTRY_REPOSITORY) private readonly repository: AuditEntryRepository,
    private readonly orchestrator: AuditOrchestrator,
  ) {}

  async execute(command: ArchiveAuditEntryCommand) {
    AuditAccessPolicy.assertCanWrite(command.actor);
    AuditAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleCommand(command);
  }

  private async handleCommand(command: ArchiveAuditEntryCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.auditEntryId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['archive'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return AuditEntryMapper.toDto(entity);
  }

  private async handleQuery(command: ArchiveAuditEntryCommand) {
    const query: ListQuery = {
      page: command.page ?? 1,
      pageSize: command.pageSize ?? 25,
      search: command.search,
      filters: command.filters,
    };
    const result = await this.repository.list(command.organizationId, query);
    return {
      data: result.data.map((e) => AuditEntryMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}

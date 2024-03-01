import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { ExportReportCommand } from '../commands/export-report.command';
import { PHARMACYITEM_REPOSITORY, type PharmacyItemRepository } from '../../domain/repositories/pharmacy-item.repository';
import { PharmacyOrchestrator } from '../services/pharmacy-orchestrator.service';
import { PharmacyAccessPolicy } from '../../domain/policies/pharmacy-access.policy';
import { PharmacyItemMapper } from '../mappers/pharmacy-item.mapper';

@Injectable()
export class ExportReportUseCase {
  constructor(
    @Inject(PHARMACYITEM_REPOSITORY) private readonly repository: PharmacyItemRepository,
    private readonly orchestrator: PharmacyOrchestrator,
  ) {}

  async execute(command: ExportReportCommand) {
    PharmacyAccessPolicy.assertCanWrite(command.actor);
    PharmacyAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleQuery(command);
  }

  private async handleCommand(command: ExportReportCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.pharmacyItemId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['exportReport'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return PharmacyItemMapper.toDto(entity);
  }

  private async handleQuery(command: ExportReportCommand) {
    const query: ListQuery = {
      page: command.page ?? 1,
      pageSize: command.pageSize ?? 25,
      search: command.search,
      filters: command.filters,
    };
    const result = await this.repository.list(command.organizationId, query);
    return {
      data: result.data.map((e) => PharmacyItemMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}

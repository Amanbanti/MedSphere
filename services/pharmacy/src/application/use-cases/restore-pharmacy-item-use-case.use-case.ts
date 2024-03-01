import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { RestorePharmacyItemCommand } from '../commands/restore-pharmacy-item.command';
import { PHARMACYITEM_REPOSITORY, type PharmacyItemRepository } from '../../domain/repositories/pharmacy-item.repository';
import { PharmacyOrchestrator } from '../services/pharmacy-orchestrator.service';
import { PharmacyAccessPolicy } from '../../domain/policies/pharmacy-access.policy';
import { PharmacyItemMapper } from '../mappers/pharmacy-item.mapper';

@Injectable()
export class RestorePharmacyItemUseCase {
  constructor(
    @Inject(PHARMACYITEM_REPOSITORY) private readonly repository: PharmacyItemRepository,
    private readonly orchestrator: PharmacyOrchestrator,
  ) {}

  async execute(command: RestorePharmacyItemCommand) {
    PharmacyAccessPolicy.assertCanWrite(command.actor);
    PharmacyAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleCommand(command);
  }

  private async handleCommand(command: RestorePharmacyItemCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.pharmacyItemId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['restore'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return PharmacyItemMapper.toDto(entity);
  }

  private async handleQuery(command: RestorePharmacyItemCommand) {
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

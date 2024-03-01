import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { SyncExternalSystemCommand } from '../commands/sync-external-system.command';
import { RADIOLOGYSTUDY_REPOSITORY, type RadiologyStudyRepository } from '../../domain/repositories/radiology-study.repository';
import { RadiologyOrchestrator } from '../services/radiology-orchestrator.service';
import { RadiologyAccessPolicy } from '../../domain/policies/radiology-access.policy';
import { RadiologyStudyMapper } from '../mappers/radiology-study.mapper';

@Injectable()
export class SyncExternalSystemUseCase {
  constructor(
    @Inject(RADIOLOGYSTUDY_REPOSITORY) private readonly repository: RadiologyStudyRepository,
    private readonly orchestrator: RadiologyOrchestrator,
  ) {}

  async execute(command: SyncExternalSystemCommand) {
    RadiologyAccessPolicy.assertCanWrite(command.actor);
    RadiologyAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleCommand(command);
  }

  private async handleCommand(command: SyncExternalSystemCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.radiologyStudyId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['syncExternal'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return RadiologyStudyMapper.toDto(entity);
  }

  private async handleQuery(command: SyncExternalSystemCommand) {
    const query: ListQuery = {
      page: command.page ?? 1,
      pageSize: command.pageSize ?? 25,
      search: command.search,
      filters: command.filters,
    };
    const result = await this.repository.list(command.organizationId, query);
    return {
      data: result.data.map((e) => RadiologyStudyMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { SyncExternalSystemCommand } from '../commands/sync-external-system.command';
import { IMAGINGSTUDY_REPOSITORY, type ImagingStudyRepository } from '../../domain/repositories/imaging-study.repository';
import { ImagingOrchestrator } from '../services/imaging-orchestrator.service';
import { ImagingAccessPolicy } from '../../domain/policies/imaging-access.policy';
import { ImagingStudyMapper } from '../mappers/imaging-study.mapper';

@Injectable()
export class SyncExternalSystemUseCase {
  constructor(
    @Inject(IMAGINGSTUDY_REPOSITORY) private readonly repository: ImagingStudyRepository,
    private readonly orchestrator: ImagingOrchestrator,
  ) {}

  async execute(command: SyncExternalSystemCommand) {
    ImagingAccessPolicy.assertCanWrite(command.actor);
    ImagingAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleCommand(command);
  }

  private async handleCommand(command: SyncExternalSystemCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.imagingStudyId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['syncExternal'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return ImagingStudyMapper.toDto(entity);
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
      data: result.data.map((e) => ImagingStudyMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}

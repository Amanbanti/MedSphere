import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { ExportReportCommand } from '../commands/export-report.command';
import { WORKERTASK_REPOSITORY, type WorkerTaskRepository } from '../../domain/repositories/worker-task.repository';
import { WorkerOrchestrator } from '../services/worker-orchestrator.service';
import { WorkerAccessPolicy } from '../../domain/policies/worker-access.policy';
import { WorkerTaskMapper } from '../mappers/worker-task.mapper';

@Injectable()
export class ExportReportUseCase {
  constructor(
    @Inject(WORKERTASK_REPOSITORY) private readonly repository: WorkerTaskRepository,
    private readonly orchestrator: WorkerOrchestrator,
  ) {}

  async execute(command: ExportReportCommand) {
    WorkerAccessPolicy.assertCanWrite(command.actor);
    WorkerAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleQuery(command);
  }

  private async handleCommand(command: ExportReportCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.workerTaskId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['exportReport'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return WorkerTaskMapper.toDto(entity);
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
      data: result.data.map((e) => WorkerTaskMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}

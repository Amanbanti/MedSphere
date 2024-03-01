import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { RestoreWorkerTaskCommand } from '../commands/restore-worker-task.command';
import { WORKERTASK_REPOSITORY, type WorkerTaskRepository } from '../../domain/repositories/worker-task.repository';
import { WorkerOrchestrator } from '../services/worker-orchestrator.service';
import { WorkerAccessPolicy } from '../../domain/policies/worker-access.policy';
import { WorkerTaskMapper } from '../mappers/worker-task.mapper';

@Injectable()
export class RestoreWorkerTaskUseCase {
  constructor(
    @Inject(WORKERTASK_REPOSITORY) private readonly repository: WorkerTaskRepository,
    private readonly orchestrator: WorkerOrchestrator,
  ) {}

  async execute(command: RestoreWorkerTaskCommand) {
    WorkerAccessPolicy.assertCanWrite(command.actor);
    WorkerAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleCommand(command);
  }

  private async handleCommand(command: RestoreWorkerTaskCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.workerTaskId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['restore'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return WorkerTaskMapper.toDto(entity);
  }

  private async handleQuery(command: RestoreWorkerTaskCommand) {
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

import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import { WORKER_TASK_REPOSITORY, type WorkerTaskRepository } from '../../domain/repositories/worker-task.repository';
import { WorkerDomainRules } from '../../domain/services/worker-rules.service';
import { WorkerTask } from '../../domain/entities/worker-task.entity';
import { WorkerNotFoundError } from '../../domain/errors/worker.errors';

@Injectable()
export class WorkerOrchestrator {
  private readonly rules = new WorkerDomainRules();

  constructor(
    @Inject(WORKER_TASK_REPOSITORY) private readonly repository: WorkerTaskRepository,
  ) {}

  async getOrThrow(organizationId: UUID, id: UUID): Promise<WorkerTask> {
    const entity = await this.repository.findById(organizationId, id);
    if (!entity) {
      throw new WorkerNotFoundError(id);
    }
    entity.assertActive();
    return entity;
  }

  async list(organizationId: UUID, query: ListQuery) {
    return this.repository.list(organizationId, query);
  }

  async persist(entity: WorkerTask): Promise<void> {
    await this.repository.save(entity);
  }

  async applyMutation(
    organizationId: UUID,
    id: UUID,
    verb: string,
    payload: Record<string, unknown> = {},
  ): Promise<WorkerTask> {
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

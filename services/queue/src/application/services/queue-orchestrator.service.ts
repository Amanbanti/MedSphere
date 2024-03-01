import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import { QUEUE_JOB_REPOSITORY, type QueueJobRepository } from '../../domain/repositories/queue-job.repository';
import { QueueDomainRules } from '../../domain/services/queue-rules.service';
import { QueueJob } from '../../domain/entities/queue-job.entity';
import { QueueNotFoundError } from '../../domain/errors/queue.errors';

@Injectable()
export class QueueOrchestrator {
  private readonly rules = new QueueDomainRules();

  constructor(
    @Inject(QUEUE_JOB_REPOSITORY) private readonly repository: QueueJobRepository,
  ) {}

  async getOrThrow(organizationId: UUID, id: UUID): Promise<QueueJob> {
    const entity = await this.repository.findById(organizationId, id);
    if (!entity) {
      throw new QueueNotFoundError(id);
    }
    entity.assertActive();
    return entity;
  }

  async list(organizationId: UUID, query: ListQuery) {
    return this.repository.list(organizationId, query);
  }

  async persist(entity: QueueJob): Promise<void> {
    await this.repository.save(entity);
  }

  async applyMutation(
    organizationId: UUID,
    id: UUID,
    verb: string,
    payload: Record<string, unknown> = {},
  ): Promise<QueueJob> {
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

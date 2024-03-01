import { Injectable } from '@nestjs/common';
import {
  createPaginationMeta,
  normalizeListQuery,
  type ListQuery,
  type PaginatedResult,
  type UUID,
} from '@medsphere/shared';
import { QueueJob } from '../../domain/entities/queue-job.entity';
import type { QueueJobRepository } from '../../domain/repositories/queue-job.repository';

@Injectable()
export class InMemoryQueueJobRepository implements QueueJobRepository {
  private readonly store = new Map<string, QueueJob>();

  private key(organizationId: UUID, id: UUID): string {
    return `${organizationId}:${id}`;
  }

  async save(entity: QueueJob): Promise<void> {
    this.store.set(this.key(entity.organizationId, entity.id), entity);
  }

  async findById(organizationId: UUID, id: UUID): Promise<QueueJob | null> {
    return this.store.get(this.key(organizationId, id)) ?? null;
  }

  async list(organizationId: UUID, query: ListQuery = {}): Promise<PaginatedResult<QueueJob>> {
    const normalized = normalizeListQuery(query);
    const items = [...this.store.values()].filter(
      (e) => e.organizationId === organizationId && !e.isDeleted(),
    );
    const totalItems = items.length;
    const start = (normalized.page - 1) * normalized.pageSize;
    const slice = items.slice(start, start + normalized.pageSize);
    return {
      items: slice,
      meta: createPaginationMeta(normalized.page, normalized.pageSize, totalItems),
    };
  }
}

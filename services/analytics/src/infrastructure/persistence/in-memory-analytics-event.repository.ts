import { Injectable } from '@nestjs/common';
import {
  createPaginationMeta,
  normalizeListQuery,
  type ListQuery,
  type PaginatedResult,
  type UUID,
} from '@medsphere/shared';
import { AnalyticsEvent } from '../../domain/entities/analytics-event.entity';
import type { AnalyticsEventRepository } from '../../domain/repositories/analytics-event.repository';

@Injectable()
export class InMemoryAnalyticsEventRepository implements AnalyticsEventRepository {
  private readonly store = new Map<string, AnalyticsEvent>();

  private key(organizationId: UUID, id: UUID): string {
    return `${organizationId}:${id}`;
  }

  async save(entity: AnalyticsEvent): Promise<void> {
    this.store.set(this.key(entity.organizationId, entity.id), entity);
  }

  async findById(organizationId: UUID, id: UUID): Promise<AnalyticsEvent | null> {
    return this.store.get(this.key(organizationId, id)) ?? null;
  }

  async list(organizationId: UUID, query: ListQuery = {}): Promise<PaginatedResult<AnalyticsEvent>> {
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

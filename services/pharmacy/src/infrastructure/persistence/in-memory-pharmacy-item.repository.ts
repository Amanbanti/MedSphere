import { Injectable } from '@nestjs/common';
import {
  createPaginationMeta,
  normalizeListQuery,
  type ListQuery,
  type PaginatedResult,
  type UUID,
} from '@medsphere/shared';
import { PharmacyItem } from '../../domain/entities/pharmacy-item.entity';
import type { PharmacyItemRepository } from '../../domain/repositories/pharmacy-item.repository';

@Injectable()
export class InMemoryPharmacyItemRepository implements PharmacyItemRepository {
  private readonly store = new Map<string, PharmacyItem>();

  private key(organizationId: UUID, id: UUID): string {
    return `${organizationId}:${id}`;
  }

  async save(entity: PharmacyItem): Promise<void> {
    this.store.set(this.key(entity.organizationId, entity.id), entity);
  }

  async findById(organizationId: UUID, id: UUID): Promise<PharmacyItem | null> {
    return this.store.get(this.key(organizationId, id)) ?? null;
  }

  async list(organizationId: UUID, query: ListQuery = {}): Promise<PaginatedResult<PharmacyItem>> {
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

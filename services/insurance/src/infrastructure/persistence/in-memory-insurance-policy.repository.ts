import { Injectable } from '@nestjs/common';
import {
  createPaginationMeta,
  normalizeListQuery,
  type ListQuery,
  type PaginatedResult,
  type UUID,
} from '@medsphere/shared';
import { InsurancePolicy } from '../../domain/entities/insurance-policy.entity';
import type { InsurancePolicyRepository } from '../../domain/repositories/insurance-policy.repository';

@Injectable()
export class InMemoryInsurancePolicyRepository implements InsurancePolicyRepository {
  private readonly store = new Map<string, InsurancePolicy>();

  private key(organizationId: UUID, id: UUID): string {
    return `${organizationId}:${id}`;
  }

  async save(entity: InsurancePolicy): Promise<void> {
    this.store.set(this.key(entity.organizationId, entity.id), entity);
  }

  async findById(organizationId: UUID, id: UUID): Promise<InsurancePolicy | null> {
    return this.store.get(this.key(organizationId, id)) ?? null;
  }

  async list(organizationId: UUID, query: ListQuery = {}): Promise<PaginatedResult<InsurancePolicy>> {
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

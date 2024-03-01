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
import { PrismaService } from '../prisma/prisma.service';
import { InMemoryPharmacyItemRepository } from './in-memory-pharmacy-item.repository';

@Injectable()
export class PrismaPharmacyItemRepository implements PharmacyItemRepository {
  private readonly fallback = new InMemoryPharmacyItemRepository();

  constructor(private readonly prisma: PrismaService) {}

  async save(entity: PharmacyItem): Promise<void> {
    const client = this.prisma.client as Record<string, { upsert?: Function } | undefined>;
    const model = client.pharmacyInventory;
    if (!model?.upsert) {
      return this.fallback.save(entity);
    }
    const props = entity.toProps();
    await model.upsert({
      where: { id: props.id },
      create: props,
      update: props,
    });
  }

  async findById(organizationId: UUID, id: UUID): Promise<PharmacyItem | null> {
    const client = this.prisma.client as Record<string, { findFirst?: Function } | undefined>;
    const model = client.pharmacyInventory;
    if (!model?.findFirst) {
      return this.fallback.findById(organizationId, id);
    }
    const row = await model.findFirst({ where: { id, organizationId, deletedAt: null } });
    return row ? PharmacyItem.create(row as Parameters<typeof PharmacyItem.create>[0]) : null;
  }

  async list(organizationId: UUID, query: ListQuery = {}): Promise<PaginatedResult<PharmacyItem>> {
    const client = this.prisma.client as Record<string, { findMany?: Function; count?: Function } | undefined>;
    const model = client.pharmacyInventory;
    if (!model?.findMany || !model?.count) {
      return this.fallback.list(organizationId, query);
    }
    const normalized = normalizeListQuery(query);
    const where = { organizationId, deletedAt: null };
    const [rows, totalItems] = await Promise.all([
      model.findMany({
        where,
        skip: (normalized.page - 1) * normalized.pageSize,
        take: normalized.pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      model.count({ where }),
    ]);
    return {
      items: rows.map((row: Parameters<typeof PharmacyItem.create>[0]) => PharmacyItem.create(row)),
      meta: createPaginationMeta(normalized.page, normalized.pageSize, totalItems),
    };
  }
}

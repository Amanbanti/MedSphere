import { Injectable } from '@nestjs/common';
import {
  createPaginationMeta,
  normalizeListQuery,
  type ListQuery,
  type PaginatedResult,
  type UUID,
} from '@medsphere/shared';
import { LabOrder } from '../../domain/entities/lab-order.entity';
import type { LabOrderRepository } from '../../domain/repositories/lab-order.repository';
import { PrismaService } from '../prisma/prisma.service';
import { InMemoryLabOrderRepository } from './in-memory-lab-order.repository';

@Injectable()
export class PrismaLabOrderRepository implements LabOrderRepository {
  private readonly fallback = new InMemoryLabOrderRepository();

  constructor(private readonly prisma: PrismaService) {}

  async save(entity: LabOrder): Promise<void> {
    const client = this.prisma.client as Record<string, { upsert?: Function } | undefined>;
    const model = client.labOrder;
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

  async findById(organizationId: UUID, id: UUID): Promise<LabOrder | null> {
    const client = this.prisma.client as Record<string, { findFirst?: Function } | undefined>;
    const model = client.labOrder;
    if (!model?.findFirst) {
      return this.fallback.findById(organizationId, id);
    }
    const row = await model.findFirst({ where: { id, organizationId, deletedAt: null } });
    return row ? LabOrder.create(row as Parameters<typeof LabOrder.create>[0]) : null;
  }

  async list(organizationId: UUID, query: ListQuery = {}): Promise<PaginatedResult<LabOrder>> {
    const client = this.prisma.client as Record<string, { findMany?: Function; count?: Function } | undefined>;
    const model = client.labOrder;
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
      items: rows.map((row: Parameters<typeof LabOrder.create>[0]) => LabOrder.create(row)),
      meta: createPaginationMeta(normalized.page, normalized.pageSize, totalItems),
    };
  }
}

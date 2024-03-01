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
import { PrismaService } from '../prisma/prisma.service';
import { InMemoryAnalyticsEventRepository } from './in-memory-analytics-event.repository';

@Injectable()
export class PrismaAnalyticsEventRepository implements AnalyticsEventRepository {
  private readonly fallback = new InMemoryAnalyticsEventRepository();

  constructor(private readonly prisma: PrismaService) {}

  async save(entity: AnalyticsEvent): Promise<void> {
    const client = this.prisma.client as Record<string, { upsert?: Function } | undefined>;
    const model = client.analyticsEvent;
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

  async findById(organizationId: UUID, id: UUID): Promise<AnalyticsEvent | null> {
    const client = this.prisma.client as Record<string, { findFirst?: Function } | undefined>;
    const model = client.analyticsEvent;
    if (!model?.findFirst) {
      return this.fallback.findById(organizationId, id);
    }
    const row = await model.findFirst({ where: { id, organizationId, deletedAt: null } });
    return row ? AnalyticsEvent.create(row as Parameters<typeof AnalyticsEvent.create>[0]) : null;
  }

  async list(organizationId: UUID, query: ListQuery = {}): Promise<PaginatedResult<AnalyticsEvent>> {
    const client = this.prisma.client as Record<string, { findMany?: Function; count?: Function } | undefined>;
    const model = client.analyticsEvent;
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
      items: rows.map((row: Parameters<typeof AnalyticsEvent.create>[0]) => AnalyticsEvent.create(row)),
      meta: createPaginationMeta(normalized.page, normalized.pageSize, totalItems),
    };
  }
}

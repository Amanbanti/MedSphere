import { Injectable } from '@nestjs/common';
import {
  createPaginationMeta,
  normalizeListQuery,
  type ListQuery,
  type PaginatedResult,
  type UUID,
} from '@medsphere/shared';
import { RadiologyStudy } from '../../domain/entities/radiology-study.entity';
import type { RadiologyStudyRepository } from '../../domain/repositories/radiology-study.repository';
import { PrismaService } from '../prisma/prisma.service';
import { InMemoryRadiologyStudyRepository } from './in-memory-radiology-study.repository';

@Injectable()
export class PrismaRadiologyStudyRepository implements RadiologyStudyRepository {
  private readonly fallback = new InMemoryRadiologyStudyRepository();

  constructor(private readonly prisma: PrismaService) {}

  async save(entity: RadiologyStudy): Promise<void> {
    const client = this.prisma.client as Record<string, { upsert?: Function } | undefined>;
    const model = client.radiologyStudy;
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

  async findById(organizationId: UUID, id: UUID): Promise<RadiologyStudy | null> {
    const client = this.prisma.client as Record<string, { findFirst?: Function } | undefined>;
    const model = client.radiologyStudy;
    if (!model?.findFirst) {
      return this.fallback.findById(organizationId, id);
    }
    const row = await model.findFirst({ where: { id, organizationId, deletedAt: null } });
    return row ? RadiologyStudy.create(row as Parameters<typeof RadiologyStudy.create>[0]) : null;
  }

  async list(organizationId: UUID, query: ListQuery = {}): Promise<PaginatedResult<RadiologyStudy>> {
    const client = this.prisma.client as Record<string, { findMany?: Function; count?: Function } | undefined>;
    const model = client.radiologyStudy;
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
      items: rows.map((row: Parameters<typeof RadiologyStudy.create>[0]) => RadiologyStudy.create(row)),
      meta: createPaginationMeta(normalized.page, normalized.pageSize, totalItems),
    };
  }
}

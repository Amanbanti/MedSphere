import { Injectable } from '@nestjs/common';
import {
  createPaginationMeta,
  normalizeListQuery,
  type ListQuery,
  type PaginatedResult,
  type UUID,
} from '@medsphere/shared';
import { Prescription } from '../../domain/entities/prescription.entity';
import type { PrescriptionRepository } from '../../domain/repositories/prescription.repository';
import { PrismaService } from '../prisma/prisma.service';
import { InMemoryPrescriptionRepository } from './in-memory-prescription.repository';

@Injectable()
export class PrismaPrescriptionRepository implements PrescriptionRepository {
  private readonly fallback = new InMemoryPrescriptionRepository();

  constructor(private readonly prisma: PrismaService) {}

  async save(entity: Prescription): Promise<void> {
    const client = this.prisma.client as Record<string, { upsert?: Function } | undefined>;
    const model = client.prescription;
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

  async findById(organizationId: UUID, id: UUID): Promise<Prescription | null> {
    const client = this.prisma.client as Record<string, { findFirst?: Function } | undefined>;
    const model = client.prescription;
    if (!model?.findFirst) {
      return this.fallback.findById(organizationId, id);
    }
    const row = await model.findFirst({ where: { id, organizationId, deletedAt: null } });
    return row ? Prescription.create(row as Parameters<typeof Prescription.create>[0]) : null;
  }

  async list(organizationId: UUID, query: ListQuery = {}): Promise<PaginatedResult<Prescription>> {
    const client = this.prisma.client as Record<string, { findMany?: Function; count?: Function } | undefined>;
    const model = client.prescription;
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
      items: rows.map((row: Parameters<typeof Prescription.create>[0]) => Prescription.create(row)),
      meta: createPaginationMeta(normalized.page, normalized.pageSize, totalItems),
    };
  }
}

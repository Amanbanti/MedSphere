import { Injectable } from '@nestjs/common';
import {
  createPaginationMeta,
  normalizeListQuery,
  type ListQuery,
  type PaginatedResult,
  type UUID,
} from '@medsphere/shared';
import { Patient } from '../../domain/entities/patient.entity';
import type { PatientRepository } from '../../domain/repositories/patient.repository';
import { PrismaService } from '../prisma/prisma.service';
import { InMemoryPatientRepository } from './in-memory-patient.repository';
import { OptimisticLockError } from '../../domain/errors/patient.errors';

@Injectable()
export class PrismaPatientRepository implements PatientRepository {
  private readonly fallback = new InMemoryPatientRepository();

  constructor(private readonly prisma: PrismaService) {}

  private get model() {
    const client = this.prisma.client as Record<string, {
      upsert?: Function;
      findFirst?: Function;
      findMany?: Function;
      count?: Function;
      update?: Function;
    }>;
    return client.patient;
  }

  async save(entity: Patient): Promise<void> {
    const model = this.model;
    if (!model?.upsert) return this.fallback.save(entity);

    const props = entity.toProps();
    const { id, organizationId, version, ...rest } = props as Record<string, unknown>;

    if (version && (version as number) > 1) {
      const existing = await model.findFirst?.({
        where: { id, organizationId, deletedAt: null },
      });
      if (existing && (existing as { version: number }).version !== (version as number) - 1) {
        throw new OptimisticLockError(id as UUID, (existing as { version: number }).version);
      }
    }

    await model.upsert({
      where: { id: id as string },
      create: { ...props, deletedAt: null },
      update: { ...rest, version: (version as number) ?? 1 },
    });
  }

  async findById(organizationId: UUID, id: UUID): Promise<Patient | null> {
    const model = this.model;
    if (!model?.findFirst) return this.fallback.findById(organizationId, id);

    const row = await model.findFirst({
      where: { id, organizationId, deletedAt: null },
    });
    return row ? Patient.create(row as Parameters<typeof Patient.create>[0]) : null;
  }

  async list(organizationId: UUID, query: ListQuery = {}): Promise<PaginatedResult<Patient>> {
    const model = this.model;
    if (!model?.findMany || !model?.count) return this.fallback.list(organizationId, query);

    const normalized = normalizeListQuery(query);
    const where: Record<string, unknown> = { organizationId, deletedAt: null };

    if (query.filter?.status) where.status = query.filter.status;
    if (query.filter?.patientId) where.patientId = query.filter.patientId;
    if (query.filter?.providerId) where.providerId = query.filter.providerId;

    const orderBy = query.sort?.field
      ? { [query.sort.field]: query.sort.direction ?? 'desc' }
      : { createdAt: 'desc' };

    const [rows, totalItems] = await Promise.all([
      model.findMany({
        where,
        skip: (normalized.page - 1) * normalized.pageSize,
        take: normalized.pageSize,
        orderBy,
      }),
      model.count({ where }),
    ]);

    return {
      items: rows.map((row: Parameters<typeof Patient.create>[0]) => Patient.create(row)),
      meta: createPaginationMeta(normalized.page, normalized.pageSize, totalItems),
    };
  }

  async softDelete(organizationId: UUID, id: UUID, deletedBy: UUID): Promise<void> {
    const model = this.model;
    if (!model?.update) return this.fallback.softDelete?.(organizationId, id, deletedBy);

    await model.update({
      where: { id },
      data: { deletedAt: new Date(), deletedBy, version: { increment: 1 } },
    });
  }
}

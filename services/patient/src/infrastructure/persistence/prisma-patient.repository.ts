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

@Injectable()
export class PrismaPatientRepository implements PatientRepository {
  private readonly fallback = new InMemoryPatientRepository();

  constructor(private readonly prisma: PrismaService) {}

  async save(entity: Patient): Promise<void> {
    const client = this.prisma.client as Record<string, { upsert?: Function } | undefined>;
    const model = client.patient;
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

  async findById(organizationId: UUID, id: UUID): Promise<Patient | null> {
    const client = this.prisma.client as Record<string, { findFirst?: Function } | undefined>;
    const model = client.patient;
    if (!model?.findFirst) {
      return this.fallback.findById(organizationId, id);
    }
    const row = await model.findFirst({ where: { id, organizationId, deletedAt: null } });
    return row ? Patient.create(row as Parameters<typeof Patient.create>[0]) : null;
  }

  async list(organizationId: UUID, query: ListQuery = {}): Promise<PaginatedResult<Patient>> {
    const client = this.prisma.client as Record<string, { findMany?: Function; count?: Function } | undefined>;
    const model = client.patient;
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
      items: rows.map((row: Parameters<typeof Patient.create>[0]) => Patient.create(row)),
      meta: createPaginationMeta(normalized.page, normalized.pageSize, totalItems),
    };
  }
}

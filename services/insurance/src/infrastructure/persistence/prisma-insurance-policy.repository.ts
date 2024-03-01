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
import { PrismaService } from '../prisma/prisma.service';
import { InMemoryInsurancePolicyRepository } from './in-memory-insurance-policy.repository';

@Injectable()
export class PrismaInsurancePolicyRepository implements InsurancePolicyRepository {
  private readonly fallback = new InMemoryInsurancePolicyRepository();

  constructor(private readonly prisma: PrismaService) {}

  async save(entity: InsurancePolicy): Promise<void> {
    const client = this.prisma.client as Record<string, { upsert?: Function } | undefined>;
    const model = client.insurancePolicy;
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

  async findById(organizationId: UUID, id: UUID): Promise<InsurancePolicy | null> {
    const client = this.prisma.client as Record<string, { findFirst?: Function } | undefined>;
    const model = client.insurancePolicy;
    if (!model?.findFirst) {
      return this.fallback.findById(organizationId, id);
    }
    const row = await model.findFirst({ where: { id, organizationId, deletedAt: null } });
    return row ? InsurancePolicy.create(row as Parameters<typeof InsurancePolicy.create>[0]) : null;
  }

  async list(organizationId: UUID, query: ListQuery = {}): Promise<PaginatedResult<InsurancePolicy>> {
    const client = this.prisma.client as Record<string, { findMany?: Function; count?: Function } | undefined>;
    const model = client.insurancePolicy;
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
      items: rows.map((row: Parameters<typeof InsurancePolicy.create>[0]) => InsurancePolicy.create(row)),
      meta: createPaginationMeta(normalized.page, normalized.pageSize, totalItems),
    };
  }
}

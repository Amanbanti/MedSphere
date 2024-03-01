import { Injectable } from '@nestjs/common';
import {
  createPaginationMeta,
  normalizeListQuery,
  type ListQuery,
  type PaginatedResult,
  type UUID,
} from '@medsphere/shared';
import { AuditEntry } from '../../domain/entities/audit-entry.entity';
import type { AuditEntryRepository } from '../../domain/repositories/audit-entry.repository';
import { PrismaService } from '../prisma/prisma.service';
import { InMemoryAuditEntryRepository } from './in-memory-audit-entry.repository';

@Injectable()
export class PrismaAuditEntryRepository implements AuditEntryRepository {
  private readonly fallback = new InMemoryAuditEntryRepository();

  constructor(private readonly prisma: PrismaService) {}

  async save(entity: AuditEntry): Promise<void> {
    const client = this.prisma.client as Record<string, { upsert?: Function } | undefined>;
    const model = client.auditLog;
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

  async findById(organizationId: UUID, id: UUID): Promise<AuditEntry | null> {
    const client = this.prisma.client as Record<string, { findFirst?: Function } | undefined>;
    const model = client.auditLog;
    if (!model?.findFirst) {
      return this.fallback.findById(organizationId, id);
    }
    const row = await model.findFirst({ where: { id, organizationId, deletedAt: null } });
    return row ? AuditEntry.create(row as Parameters<typeof AuditEntry.create>[0]) : null;
  }

  async list(organizationId: UUID, query: ListQuery = {}): Promise<PaginatedResult<AuditEntry>> {
    const client = this.prisma.client as Record<string, { findMany?: Function; count?: Function } | undefined>;
    const model = client.auditLog;
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
      items: rows.map((row: Parameters<typeof AuditEntry.create>[0]) => AuditEntry.create(row)),
      meta: createPaginationMeta(normalized.page, normalized.pageSize, totalItems),
    };
  }
}

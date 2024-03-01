import { Injectable } from '@nestjs/common';
import {
  createPaginationMeta,
  normalizeListQuery,
  type ListQuery,
  type PaginatedResult,
  type UUID,
} from '@medsphere/shared';
import { PaymentTransaction } from '../../domain/entities/payment-transaction.entity';
import type { PaymentTransactionRepository } from '../../domain/repositories/payment-transaction.repository';
import { PrismaService } from '../prisma/prisma.service';
import { InMemoryPaymentTransactionRepository } from './in-memory-payment-transaction.repository';

@Injectable()
export class PrismaPaymentTransactionRepository implements PaymentTransactionRepository {
  private readonly fallback = new InMemoryPaymentTransactionRepository();

  constructor(private readonly prisma: PrismaService) {}

  async save(entity: PaymentTransaction): Promise<void> {
    const client = this.prisma.client as Record<string, { upsert?: Function } | undefined>;
    const model = client.paymentTransaction;
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

  async findById(organizationId: UUID, id: UUID): Promise<PaymentTransaction | null> {
    const client = this.prisma.client as Record<string, { findFirst?: Function } | undefined>;
    const model = client.paymentTransaction;
    if (!model?.findFirst) {
      return this.fallback.findById(organizationId, id);
    }
    const row = await model.findFirst({ where: { id, organizationId, deletedAt: null } });
    return row ? PaymentTransaction.create(row as Parameters<typeof PaymentTransaction.create>[0]) : null;
  }

  async list(organizationId: UUID, query: ListQuery = {}): Promise<PaginatedResult<PaymentTransaction>> {
    const client = this.prisma.client as Record<string, { findMany?: Function; count?: Function } | undefined>;
    const model = client.paymentTransaction;
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
      items: rows.map((row: Parameters<typeof PaymentTransaction.create>[0]) => PaymentTransaction.create(row)),
      meta: createPaginationMeta(normalized.page, normalized.pageSize, totalItems),
    };
  }
}

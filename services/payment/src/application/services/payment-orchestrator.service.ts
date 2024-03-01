import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import { PAYMENT_TRANSACTION_REPOSITORY, type PaymentTransactionRepository } from '../../domain/repositories/payment-transaction.repository';
import { PaymentDomainRules } from '../../domain/services/payment-rules.service';
import { PaymentTransaction } from '../../domain/entities/payment-transaction.entity';
import { PaymentNotFoundError } from '../../domain/errors/payment.errors';

@Injectable()
export class PaymentOrchestrator {
  private readonly rules = new PaymentDomainRules();

  constructor(
    @Inject(PAYMENT_TRANSACTION_REPOSITORY) private readonly repository: PaymentTransactionRepository,
  ) {}

  async getOrThrow(organizationId: UUID, id: UUID): Promise<PaymentTransaction> {
    const entity = await this.repository.findById(organizationId, id);
    if (!entity) {
      throw new PaymentNotFoundError(id);
    }
    entity.assertActive();
    return entity;
  }

  async list(organizationId: UUID, query: ListQuery) {
    return this.repository.list(organizationId, query);
  }

  async persist(entity: PaymentTransaction): Promise<void> {
    await this.repository.save(entity);
  }

  async applyMutation(
    organizationId: UUID,
    id: UUID,
    verb: string,
    payload: Record<string, unknown> = {},
  ): Promise<PaymentTransaction> {
    const entity = await this.getOrThrow(organizationId, id);
    const now = nowIso();
    const sanitized = this.rules.sanitizePayload(payload);
    const handler = (entity as unknown as Record<string, (now: typeof now, payload?: Record<string, unknown>) => void>)[verb];
    if (typeof handler === 'function') {
      handler.call(entity, now, sanitized);
    } else {
      entity.touch(now);
    }
    await this.persist(entity);
    return entity;
  }
}

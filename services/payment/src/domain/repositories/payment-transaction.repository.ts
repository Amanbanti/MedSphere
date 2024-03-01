import type { UUID } from '@medsphere/shared';
import type { PaymentTransaction } from '../entities/payment-transaction.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const PAYMENT_TRANSACTION_REPOSITORY = Symbol('PAYMENT_TRANSACTION_REPOSITORY');

export interface PaymentTransactionRepository {
  save(entity: PaymentTransaction): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<PaymentTransaction | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<PaymentTransaction>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}


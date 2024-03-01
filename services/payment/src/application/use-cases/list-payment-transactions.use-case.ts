import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { ListPaymentTransactionsCommand } from '../commands/list-payment-transactions.command';
import { PAYMENT_TRANSACTION_REPOSITORY, type PaymentTransactionRepository } from '../../domain/repositories/payment-transaction.repository';
import { PaymentTransaction } from '../../domain/entities/payment-transaction.entity';
import {
  PaymentNotFoundError,
  ValidationError,
} from '../../domain/errors/payment.errors';
import { PaymentTransactionMapper } from '../mappers/payment-transaction.mapper';

@Injectable()
export class ListPaymentTransactionsUseCase {
  constructor(
    @Inject(PAYMENT_TRANSACTION_REPOSITORY) private readonly repository: PaymentTransactionRepository,
  ) {}

  async execute(command: ListPaymentTransactionsCommand) {
    const query = command.query ?? {};
    const result = await this.repository.list(command.organizationId, query);
    return {
      items: result.items.map((item) => PaymentTransactionMapper.toDto(item)),
      meta: result.meta,
    };
  }
}

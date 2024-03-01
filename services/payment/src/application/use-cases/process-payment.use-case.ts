import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { ProcessPaymentCommand } from '../commands/process-payment.command';
import { PAYMENT_TRANSACTION_REPOSITORY, type PaymentTransactionRepository } from '../../domain/repositories/payment-transaction.repository';
import { PaymentTransaction } from '../../domain/entities/payment-transaction.entity';
import {
  PaymentNotFoundError,
  ValidationError,
} from '../../domain/errors/payment.errors';
import { PaymentTransactionMapper } from '../mappers/payment-transaction.mapper';

@Injectable()
export class ProcessPaymentUseCase {
  constructor(
    @Inject(PAYMENT_TRANSACTION_REPOSITORY) private readonly repository: PaymentTransactionRepository,
  ) {}

  async execute(command: ProcessPaymentCommand) {
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = PaymentTransaction.register({
      id,
      organizationId: command.organizationId,
      now,
      ...(command.payload as Record<string, never>),
    } as Parameters<typeof PaymentTransaction.register>[0]);
    await this.repository.save(entity);
    return PaymentTransactionMapper.toDto(entity);
  }
}

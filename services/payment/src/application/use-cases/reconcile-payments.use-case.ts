import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { ReconcilePaymentsCommand } from '../commands/reconcile-payments.command';
import { PAYMENT_TRANSACTION_REPOSITORY, type PaymentTransactionRepository } from '../../domain/repositories/payment-transaction.repository';
import { PaymentTransaction } from '../../domain/entities/payment-transaction.entity';
import {
  PaymentNotFoundError,
  ValidationError,
} from '../../domain/errors/payment.errors';
import { PaymentTransactionMapper } from '../mappers/payment-transaction.mapper';

@Injectable()
export class ReconcilePaymentsUseCase {
  constructor(
    @Inject(PAYMENT_TRANSACTION_REPOSITORY) private readonly repository: PaymentTransactionRepository,
  ) {}

  async execute(command: ReconcilePaymentsCommand) {
    if (!command.id && !command.payload) {
      throw new ValidationError('id or payload is required');
    }
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (!targetId) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, targetId);
    if (!entity) {
      throw new PaymentNotFoundError(targetId);
    }
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    return PaymentTransactionMapper.toDto(entity);
  }
}

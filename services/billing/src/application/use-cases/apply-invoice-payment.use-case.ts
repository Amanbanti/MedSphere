import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { ApplyInvoicePaymentCommand } from '../commands/apply-invoice-payment.command';
import { INVOICE_REPOSITORY, type InvoiceRepository } from '../../domain/repositories/invoice.repository';
import { Invoice } from '../../domain/entities/invoice.entity';
import {
  BillingNotFoundError,
  ValidationError,
} from '../../domain/errors/billing.errors';
import { InvoiceMapper } from '../mappers/invoice.mapper';

@Injectable()
export class ApplyInvoicePaymentUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY) private readonly repository: InvoiceRepository,
  ) {}

  async execute(command: ApplyInvoicePaymentCommand) {
    if (!command.id && !command.payload) {
      throw new ValidationError('id or payload is required');
    }
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (!targetId) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, targetId);
    if (!entity) {
      throw new BillingNotFoundError(targetId);
    }
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    return InvoiceMapper.toDto(entity);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { GetInvoiceCommand } from '../commands/get-invoice.command';
import { INVOICE_REPOSITORY, type InvoiceRepository } from '../../domain/repositories/invoice.repository';
import { Invoice } from '../../domain/entities/invoice.entity';
import {
  BillingNotFoundError,
  ValidationError,
} from '../../domain/errors/billing.errors';
import { InvoiceMapper } from '../mappers/invoice.mapper';

@Injectable()
export class GetInvoiceUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY) private readonly repository: InvoiceRepository,
  ) {}

  async execute(command: GetInvoiceCommand) {
    if (!command.id) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, command.id);
    if (!entity) {
      throw new BillingNotFoundError(command.id);
    }
    return InvoiceMapper.toDto(entity);
  }
}

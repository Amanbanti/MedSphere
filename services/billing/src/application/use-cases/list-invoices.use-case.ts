import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { ListInvoicesCommand } from '../commands/list-invoices.command';
import { INVOICE_REPOSITORY, type InvoiceRepository } from '../../domain/repositories/invoice.repository';
import { Invoice } from '../../domain/entities/invoice.entity';
import {
  BillingNotFoundError,
  ValidationError,
} from '../../domain/errors/billing.errors';
import { InvoiceMapper } from '../mappers/invoice.mapper';

@Injectable()
export class ListInvoicesUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY) private readonly repository: InvoiceRepository,
  ) {}

  async execute(command: ListInvoicesCommand) {
    const query = command.query ?? {};
    const result = await this.repository.list(command.organizationId, query);
    return {
      items: result.items.map((item) => InvoiceMapper.toDto(item)),
      meta: result.meta,
    };
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { CreateInvoiceCommand } from '../commands/create-invoice.command';
import { INVOICE_REPOSITORY, type InvoiceRepository } from '../../domain/repositories/invoice.repository';
import { Invoice } from '../../domain/entities/invoice.entity';
import {
  BillingNotFoundError,
  ValidationError,
} from '../../domain/errors/billing.errors';
import { InvoiceMapper } from '../mappers/invoice.mapper';

@Injectable()
export class CreateInvoiceUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY) private readonly repository: InvoiceRepository,
  ) {}

  async execute(command: CreateInvoiceCommand) {
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = Invoice.register({
      id,
      organizationId: command.organizationId,
      now,
      ...(command.payload as Record<string, never>),
    } as Parameters<typeof Invoice.register>[0]);
    await this.repository.save(entity);
    return InvoiceMapper.toDto(entity);
  }
}

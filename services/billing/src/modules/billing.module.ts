import { Module } from '@nestjs/common';
import { InvoiceController } from '../presentation/http/invoice.controller';
import { INVOICE_REPOSITORY } from '../domain/repositories/invoice.repository';
import { InMemoryInvoiceRepository } from '../infrastructure/persistence/in-memory-invoice.repository';
import { PrismaInvoiceRepository } from '../infrastructure/persistence/prisma-invoice.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { BillingOrchestrator } from '../application/services/billing-orchestrator.service';
import { BillingEventPublisher } from '../infrastructure/messaging/billing-event.publisher';
import { InMemoryInvoiceLineItemRepository } from '../infrastructure/persistence/in-memory-invoice-line-item.repository';
import {
  CreateInvoiceUseCase,
    ApplyInvoicePaymentUseCase,
    AdjustInvoiceChargeUseCase,
    ListInvoicesUseCase,
    GetInvoiceUseCase,
} from '../application/use-cases';

@Module({
  controllers: [InvoiceController],
  providers: [
    PrismaService,
    InMemoryInvoiceRepository,
    BillingOrchestrator,
    BillingEventPublisher,
    { provide: INVOICE_LINE_ITEM_REPOSITORY, useClass: InMemoryInvoiceLineItemRepository },
    {
      provide: INVOICE_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemoryInvoiceRepository
        : PrismaInvoiceRepository,
    },
    CreateInvoiceUseCase,
    ApplyInvoicePaymentUseCase,
    AdjustInvoiceChargeUseCase,
    ListInvoicesUseCase,
    GetInvoiceUseCase,
  ],
  exports: [INVOICE_REPOSITORY, BillingOrchestrator],
})
export class BillingModule {}

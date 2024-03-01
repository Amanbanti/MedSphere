import { Module } from '@nestjs/common';
import { PaymentTransactionController } from '../presentation/http/payment-transaction.controller';
import { PAYMENT_TRANSACTION_REPOSITORY } from '../domain/repositories/payment-transaction.repository';
import { InMemoryPaymentTransactionRepository } from '../infrastructure/persistence/in-memory-payment-transaction.repository';
import { PrismaPaymentTransactionRepository } from '../infrastructure/persistence/prisma-payment-transaction.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { PaymentOrchestrator } from '../application/services/payment-orchestrator.service';
import { PaymentEventPublisher } from '../infrastructure/messaging/payment-event.publisher';

import {
  ProcessPaymentUseCase,
    RefundPaymentUseCase,
    ReconcilePaymentsUseCase,
    ListPaymentTransactionsUseCase,
} from '../application/use-cases';

@Module({
  controllers: [PaymentTransactionController],
  providers: [
    PrismaService,
    InMemoryPaymentTransactionRepository,
    PaymentOrchestrator,
    PaymentEventPublisher,
    {
      provide: PAYMENT_TRANSACTION_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemoryPaymentTransactionRepository
        : PrismaPaymentTransactionRepository,
    },
    ProcessPaymentUseCase,
    RefundPaymentUseCase,
    ReconcilePaymentsUseCase,
    ListPaymentTransactionsUseCase,
  ],
  exports: [PAYMENT_TRANSACTION_REPOSITORY, PaymentOrchestrator],
})
export class PaymentModule {}

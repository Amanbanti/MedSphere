import { Module } from '@nestjs/common';
import { LabOrderController } from '../presentation/http/lab-order.controller';
import { LAB_ORDER_REPOSITORY } from '../domain/repositories/lab-order.repository';
import { InMemoryLabOrderRepository } from '../infrastructure/persistence/in-memory-lab-order.repository';
import { PrismaLabOrderRepository } from '../infrastructure/persistence/prisma-lab-order.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { LaboratoryOrchestrator } from '../application/services/laboratory-orchestrator.service';
import { LaboratoryEventPublisher } from '../infrastructure/messaging/laboratory-event.publisher';

import {
  OrderLabTestUseCase,
    CollectLabSampleUseCase,
    ReportLabResultUseCase,
    ListLabOrdersUseCase,
    GetLabOrderUseCase,
} from '../application/use-cases';

@Module({
  controllers: [LabOrderController],
  providers: [
    PrismaService,
    InMemoryLabOrderRepository,
    LaboratoryOrchestrator,
    LaboratoryEventPublisher,
    {
      provide: LAB_ORDER_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemoryLabOrderRepository
        : PrismaLabOrderRepository,
    },
    OrderLabTestUseCase,
    CollectLabSampleUseCase,
    ReportLabResultUseCase,
    ListLabOrdersUseCase,
    GetLabOrderUseCase,
  ],
  exports: [LAB_ORDER_REPOSITORY, LaboratoryOrchestrator],
})
export class LaboratoryModule {}

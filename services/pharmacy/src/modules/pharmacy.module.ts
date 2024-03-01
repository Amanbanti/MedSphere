import { Module } from '@nestjs/common';
import { PharmacyItemController } from '../presentation/http/pharmacy-item.controller';
import { PHARMACY_ITEM_REPOSITORY } from '../domain/repositories/pharmacy-item.repository';
import { InMemoryPharmacyItemRepository } from '../infrastructure/persistence/in-memory-pharmacy-item.repository';
import { PrismaPharmacyItemRepository } from '../infrastructure/persistence/prisma-pharmacy-item.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { PharmacyOrchestrator } from '../application/services/pharmacy-orchestrator.service';
import { PharmacyEventPublisher } from '../infrastructure/messaging/pharmacy-event.publisher';

import {
  AddPharmacyInventoryUseCase,
    DispenseMedicationUseCase,
    CheckPharmacyStockUseCase,
    UpdatePharmacyPricingUseCase,
    ListPharmacyInventoryUseCase,
} from '../application/use-cases';

@Module({
  controllers: [PharmacyItemController],
  providers: [
    PrismaService,
    InMemoryPharmacyItemRepository,
    PharmacyOrchestrator,
    PharmacyEventPublisher,
    {
      provide: PHARMACY_ITEM_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemoryPharmacyItemRepository
        : PrismaPharmacyItemRepository,
    },
    AddPharmacyInventoryUseCase,
    DispenseMedicationUseCase,
    CheckPharmacyStockUseCase,
    UpdatePharmacyPricingUseCase,
    ListPharmacyInventoryUseCase,
  ],
  exports: [PHARMACY_ITEM_REPOSITORY, PharmacyOrchestrator],
})
export class PharmacyModule {}

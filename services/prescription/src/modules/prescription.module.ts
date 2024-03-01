import { Module } from '@nestjs/common';
import { PrescriptionController } from '../presentation/http/prescription.controller';
import { PRESCRIPTION_REPOSITORY } from '../domain/repositories/prescription.repository';
import { InMemoryPrescriptionRepository } from '../infrastructure/persistence/in-memory-prescription.repository';
import { PrismaPrescriptionRepository } from '../infrastructure/persistence/prisma-prescription.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { PrescriptionOrchestrator } from '../application/services/prescription-orchestrator.service';
import { PrescriptionEventPublisher } from '../infrastructure/messaging/prescription-event.publisher';

import {
  CreatePrescriptionUseCase,
    RenewPrescriptionUseCase,
    CancelPrescriptionUseCase,
    CheckPrescriptionInteractionsUseCase,
    ListPrescriptionsUseCase,
} from '../application/use-cases';

@Module({
  controllers: [PrescriptionController],
  providers: [
    PrismaService,
    InMemoryPrescriptionRepository,
    PrescriptionOrchestrator,
    PrescriptionEventPublisher,
    {
      provide: PRESCRIPTION_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemoryPrescriptionRepository
        : PrismaPrescriptionRepository,
    },
    CreatePrescriptionUseCase,
    RenewPrescriptionUseCase,
    CancelPrescriptionUseCase,
    CheckPrescriptionInteractionsUseCase,
    ListPrescriptionsUseCase,
  ],
  exports: [PRESCRIPTION_REPOSITORY, PrescriptionOrchestrator],
})
export class PrescriptionModule {}

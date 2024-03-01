import { Module } from '@nestjs/common';
import { MedicalRecordController } from '../presentation/http/medical-record.controller';
import { MEDICAL_RECORD_REPOSITORY } from '../domain/repositories/medical-record.repository';
import { InMemoryMedicalRecordRepository } from '../infrastructure/persistence/in-memory-medical-record.repository';
import { PrismaMedicalRecordRepository } from '../infrastructure/persistence/prisma-medical-record.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { MedicalRecordOrchestrator } from '../application/services/medical-record-orchestrator.service';
import { MedicalRecordEventPublisher } from '../infrastructure/messaging/medical-record-event.publisher';
import { InMemoryClinicalNoteRepository } from '../infrastructure/persistence/in-memory-clinical-note.repository';
import {
  CreateMedicalRecordUseCase,
    AddClinicalNoteUseCase,
    AttachMedicalDocumentUseCase,
    SignMedicalRecordUseCase,
    GetMedicalRecordHistoryUseCase,
    GetMedicalRecordUseCase,
} from '../application/use-cases';

@Module({
  controllers: [MedicalRecordController],
  providers: [
    PrismaService,
    InMemoryMedicalRecordRepository,
    MedicalRecordOrchestrator,
    MedicalRecordEventPublisher,
    { provide: CLINICAL_NOTE_REPOSITORY, useClass: InMemoryClinicalNoteRepository },
    {
      provide: MEDICAL_RECORD_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemoryMedicalRecordRepository
        : PrismaMedicalRecordRepository,
    },
    CreateMedicalRecordUseCase,
    AddClinicalNoteUseCase,
    AttachMedicalDocumentUseCase,
    SignMedicalRecordUseCase,
    GetMedicalRecordHistoryUseCase,
    GetMedicalRecordUseCase,
  ],
  exports: [MEDICAL_RECORD_REPOSITORY, MedicalRecordOrchestrator],
})
export class MedicalRecordModule {}

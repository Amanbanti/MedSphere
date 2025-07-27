import { Module } from '@nestjs/common';
import { PatientController } from '../presentation/http/patient.controller';
import { PATIENT_REPOSITORY } from '../domain/repositories/patient.repository';
import { InMemoryPatientRepository } from '../infrastructure/persistence/in-memory-patient.repository';
import { PrismaPatientRepository } from '../infrastructure/persistence/prisma-patient.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { PatientOrchestrator } from '../application/services/patient-orchestrator.service';
import { PatientEventPublisher } from '../infrastructure/messaging/patient-event.publisher';
import { PatientKafkaPublisher } from '../infrastructure/messaging/patient-kafka.publisher';
import { InMemoryPatientCacheAdapter } from '../infrastructure/cache/in-memory-patient.cache';
import {
  RegisterPatientUseCase,
  UpdatePatientDemographicsUseCase,
  RecordPatientAllergyUseCase,
  AddPatientVitalsUseCase,
  GetPatientProfileUseCase,
  ListPatientsUseCase,
  DeactivatePatientUseCase,
  MergePatientRecordsUseCase,
} from '../application/use-cases';

@Module({
  controllers: [PatientController],
  providers: [
    PrismaService,
    InMemoryPatientRepository,
    PatientOrchestrator,
    PatientEventPublisher,
    PatientKafkaPublisher,
    InMemoryPatientCacheAdapter,
    {
      provide: PATIENT_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemoryPatientRepository
        : PrismaPatientRepository,
    },
    RegisterPatientUseCase,
    UpdatePatientDemographicsUseCase,
    RecordPatientAllergyUseCase,
    AddPatientVitalsUseCase,
    GetPatientProfileUseCase,
    ListPatientsUseCase,
    DeactivatePatientUseCase,
    MergePatientRecordsUseCase,
  ],
  exports: [PATIENT_REPOSITORY, PatientOrchestrator],
})
export class PatientModule {}

import { Module } from '@nestjs/common';
import { PatientController } from '../presentation/http/patient.controller';
import { PATIENT_REPOSITORY } from '../domain/repositories/patient.repository';
import { InMemoryPatientRepository } from '../infrastructure/persistence/in-memory-patient.repository';
import { PrismaPatientRepository } from '../infrastructure/persistence/prisma-patient.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { PatientOrchestrator } from '../application/services/patient-orchestrator.service';
import { PatientEventPublisher } from '../infrastructure/messaging/patient-event.publisher';
import { InMemoryPatientAllergyRepository } from '../infrastructure/persistence/in-memory-patient-allergy.repository';
import { InMemoryPatientVitalRepository } from '../infrastructure/persistence/in-memory-patient-vital.repository';
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
    { provide: PATIENT_ALLERGY_REPOSITORY, useClass: InMemoryPatientAllergyRepository },
    { provide: PATIENT_VITAL_REPOSITORY, useClass: InMemoryPatientVitalRepository },
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

import { Module } from '@nestjs/common';
import { DoctorController } from '../presentation/http/doctor.controller';
import { DOCTOR_REPOSITORY } from '../domain/repositories/doctor.repository';
import { InMemoryDoctorRepository } from '../infrastructure/persistence/in-memory-doctor.repository';
import { PrismaDoctorRepository } from '../infrastructure/persistence/prisma-doctor.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { DoctorOrchestrator } from '../application/services/doctor-orchestrator.service';
import { DoctorEventPublisher } from '../infrastructure/messaging/doctor-event.publisher';
import { InMemoryDoctorAvailabilityRepository } from '../infrastructure/persistence/in-memory-doctor-availability.repository';
import {
  RegisterDoctorUseCase,
    UpdateDoctorCredentialsUseCase,
    AssignDoctorDepartmentUseCase,
    SetDoctorAvailabilityUseCase,
    GetDoctorProfileUseCase,
    ListDoctorsUseCase,
    SuspendDoctorUseCase,
} from '../application/use-cases';

@Module({
  controllers: [DoctorController],
  providers: [
    PrismaService,
    InMemoryDoctorRepository,
    DoctorOrchestrator,
    DoctorEventPublisher,
    { provide: DOCTOR_AVAILABILITY_REPOSITORY, useClass: InMemoryDoctorAvailabilityRepository },
    {
      provide: DOCTOR_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemoryDoctorRepository
        : PrismaDoctorRepository,
    },
    RegisterDoctorUseCase,
    UpdateDoctorCredentialsUseCase,
    AssignDoctorDepartmentUseCase,
    SetDoctorAvailabilityUseCase,
    GetDoctorProfileUseCase,
    ListDoctorsUseCase,
    SuspendDoctorUseCase,
  ],
  exports: [DOCTOR_REPOSITORY, DoctorOrchestrator],
})
export class DoctorModule {}

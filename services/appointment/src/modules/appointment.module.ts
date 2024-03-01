import { Module } from '@nestjs/common';
import { AppointmentController } from '../presentation/http/appointment.controller';
import { APPOINTMENT_REPOSITORY } from '../domain/repositories/appointment.repository';
import { InMemoryAppointmentRepository } from '../infrastructure/persistence/in-memory-appointment.repository';
import { PrismaAppointmentRepository } from '../infrastructure/persistence/prisma-appointment.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { AppointmentOrchestrator } from '../application/services/appointment-orchestrator.service';
import { AppointmentEventPublisher } from '../infrastructure/messaging/appointment-event.publisher';

import {
  BookAppointmentUseCase,
    RescheduleAppointmentUseCase,
    CancelAppointmentUseCase,
    CheckInAppointmentUseCase,
    GetAppointmentUseCase,
    ListAppointmentsByPatientUseCase,
    ListAppointmentsByDoctorUseCase,
} from '../application/use-cases';

@Module({
  controllers: [AppointmentController],
  providers: [
    PrismaService,
    InMemoryAppointmentRepository,
    AppointmentOrchestrator,
    AppointmentEventPublisher,
    {
      provide: APPOINTMENT_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemoryAppointmentRepository
        : PrismaAppointmentRepository,
    },
    BookAppointmentUseCase,
    RescheduleAppointmentUseCase,
    CancelAppointmentUseCase,
    CheckInAppointmentUseCase,
    GetAppointmentUseCase,
    ListAppointmentsByPatientUseCase,
    ListAppointmentsByDoctorUseCase,
  ],
  exports: [APPOINTMENT_REPOSITORY, AppointmentOrchestrator],
})
export class AppointmentModule {}

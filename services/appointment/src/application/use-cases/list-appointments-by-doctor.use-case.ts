import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { ListAppointmentsByDoctorCommand } from '../commands/list-appointments-by-doctor.command';
import { APPOINTMENT_REPOSITORY, type AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment } from '../../domain/entities/appointment.entity';
import {
  AppointmentNotFoundError,
  ValidationError,
} from '../../domain/errors/appointment.errors';
import { AppointmentMapper } from '../mappers/appointment.mapper';

@Injectable()
export class ListAppointmentsByDoctorUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY) private readonly repository: AppointmentRepository,
  ) {}

  async execute(command: ListAppointmentsByDoctorCommand) {
    const query = command.query ?? {};
    const result = await this.repository.list(command.organizationId, query);
    return {
      items: result.items.map((item) => AppointmentMapper.toDto(item)),
      meta: result.meta,
    };
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { CancelAppointmentCommand } from '../commands/cancel-appointment.command';
import { APPOINTMENT_REPOSITORY, type AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment } from '../../domain/entities/appointment.entity';
import {
  AppointmentNotFoundError,
  ValidationError,
} from '../../domain/errors/appointment.errors';
import { AppointmentMapper } from '../mappers/appointment.mapper';

@Injectable()
export class CancelAppointmentUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY) private readonly repository: AppointmentRepository,
  ) {}

  async execute(command: CancelAppointmentCommand) {
    if (!command.id) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, command.id);
    if (!entity) {
      throw new AppointmentNotFoundError(command.id);
    }
    const now = command.now ?? nowIso();
    entity.softDelete(now);
    await this.repository.save(entity);
    return { success: true, id: entity.id };
  }
}

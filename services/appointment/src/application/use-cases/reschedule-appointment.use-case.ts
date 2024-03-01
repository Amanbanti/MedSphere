import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { RescheduleAppointmentCommand } from '../commands/reschedule-appointment.command';
import { APPOINTMENT_REPOSITORY, type AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment } from '../../domain/entities/appointment.entity';
import {
  AppointmentNotFoundError,
  ValidationError,
} from '../../domain/errors/appointment.errors';
import { AppointmentMapper } from '../mappers/appointment.mapper';

@Injectable()
export class RescheduleAppointmentUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY) private readonly repository: AppointmentRepository,
  ) {}

  async execute(command: RescheduleAppointmentCommand) {
    if (!command.id && !command.payload) {
      throw new ValidationError('id or payload is required');
    }
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (!targetId) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, targetId);
    if (!entity) {
      throw new AppointmentNotFoundError(targetId);
    }
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    return AppointmentMapper.toDto(entity);
  }
}

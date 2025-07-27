import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { RescheduleAppointmentCommand } from '../commands/reschedule-appointment.command';
import { APPOINTMENT_REPOSITORY, type AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment } from '../../domain/entities/appointment.entity';
import { AppointmentAccessPolicy } from '../../domain/policies/appointment-access.policy';
import { AppointmentDomainRules } from '../../domain/services/appointment-rules.service';
import { AppointmentKafkaPublisher } from '../../infrastructure/messaging/appointment-kafka.publisher';
import { InMemoryAppointmentCacheAdapter } from '../../infrastructure/cache/in-memory-appointment.cache';
import {
  AppointmentNotFoundError,
  ValidationError,
} from '../../domain/errors/appointment.errors';
import { AppointmentMapper } from '../mappers/appointment.mapper';

@Injectable()
export class RescheduleAppointmentUseCase {
  private readonly rules = new AppointmentDomainRules();

  constructor(
    @Inject(APPOINTMENT_REPOSITORY) private readonly repository: AppointmentRepository,
    private readonly eventPublisher: AppointmentKafkaPublisher,
    private readonly cache: InMemoryAppointmentCacheAdapter,
  ) {}

  async execute(command: RescheduleAppointmentCommand) {
    AppointmentAccessPolicy.assertTenantScope(command.actor, command.organizationId);
    AppointmentAccessPolicy.assertCanWrite(command.actor);

    if (!command.id && !command.payload) throw new ValidationError('id or payload is required');
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (targetId) {
      const entity = await this.repository.findById(command.organizationId, targetId);
      if (!entity) throw new AppointmentNotFoundError(targetId);
      entity.assertActive();
      const now = command.now ?? nowIso();
      entity.touch(now);
      await this.repository.save(entity);
      await this.cache.invalidate(command.organizationId, targetId);
      this.eventPublisher.publishUpdated(command.organizationId, targetId, command.actorId, {});
      return AppointmentMapper.toDto(entity);
    }
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = Appointment.register({ id, organizationId: command.organizationId, now, ...(command.payload as Record<string, never>) } as Parameters<typeof Appointment.register>[0]);
    await this.repository.save(entity);
    this.eventPublisher.publishCreated(command.organizationId, id, command.actorId, {});
    return AppointmentMapper.toDto(entity);
  }
}

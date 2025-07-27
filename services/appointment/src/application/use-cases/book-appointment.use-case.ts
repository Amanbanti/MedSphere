import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { BookAppointmentCommand } from '../commands/book-appointment.command';
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
export class BookAppointmentUseCase {
  private readonly rules = new AppointmentDomainRules();

  constructor(
    @Inject(APPOINTMENT_REPOSITORY) private readonly repository: AppointmentRepository,
    private readonly eventPublisher: AppointmentKafkaPublisher,
    private readonly cache: InMemoryAppointmentCacheAdapter,
  ) {}

  async execute(command: BookAppointmentCommand) {
    AppointmentAccessPolicy.assertTenantScope(command.actor, command.organizationId);
    AppointmentAccessPolicy.assertCanWrite(command.actor);

    const payload = this.rules.sanitizePayload(command.payload ?? {});
    const scheduledStart = payload.scheduledStart as string;
    const scheduledEnd = payload.scheduledEnd as string;
    if (!scheduledStart || !scheduledEnd) throw new ValidationError('scheduledStart and scheduledEnd are required');
    if (new Date(scheduledEnd) <= new Date(scheduledStart)) throw new ValidationError('scheduledEnd must be after scheduledStart');
    const now = command.now ?? nowIso();
    const id = (payload.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = Appointment.register({ id, organizationId: command.organizationId, now, ...payload } as Parameters<typeof Appointment.register>[0]);
    await this.repository.save(entity);
    this.eventPublisher.publishCreated(command.organizationId, id, command.actorId, { status: 'SCHEDULED' });
    return AppointmentMapper.toDto(entity);
  }
}

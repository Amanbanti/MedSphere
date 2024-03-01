import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import { APPOINTMENT_REPOSITORY, type AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { AppointmentDomainRules } from '../../domain/services/appointment-rules.service';
import { Appointment } from '../../domain/entities/appointment.entity';
import { AppointmentNotFoundError } from '../../domain/errors/appointment.errors';

@Injectable()
export class AppointmentOrchestrator {
  private readonly rules = new AppointmentDomainRules();

  constructor(
    @Inject(APPOINTMENT_REPOSITORY) private readonly repository: AppointmentRepository,
  ) {}

  async getOrThrow(organizationId: UUID, id: UUID): Promise<Appointment> {
    const entity = await this.repository.findById(organizationId, id);
    if (!entity) {
      throw new AppointmentNotFoundError(id);
    }
    entity.assertActive();
    return entity;
  }

  async list(organizationId: UUID, query: ListQuery) {
    return this.repository.list(organizationId, query);
  }

  async persist(entity: Appointment): Promise<void> {
    await this.repository.save(entity);
  }

  async applyMutation(
    organizationId: UUID,
    id: UUID,
    verb: string,
    payload: Record<string, unknown> = {},
  ): Promise<Appointment> {
    const entity = await this.getOrThrow(organizationId, id);
    const now = nowIso();
    const sanitized = this.rules.sanitizePayload(payload);
    const handler = (entity as unknown as Record<string, (now: typeof now, payload?: Record<string, unknown>) => void>)[verb];
    if (typeof handler === 'function') {
      handler.call(entity, now, sanitized);
    } else {
      entity.touch(now);
    }
    await this.persist(entity);
    return entity;
  }
}

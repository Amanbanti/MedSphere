import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import { DOCTOR_REPOSITORY, type DoctorRepository } from '../../domain/repositories/doctor.repository';
import { DoctorDomainRules } from '../../domain/services/doctor-rules.service';
import { Doctor } from '../../domain/entities/doctor.entity';
import { DoctorNotFoundError } from '../../domain/errors/doctor.errors';

@Injectable()
export class DoctorOrchestrator {
  private readonly rules = new DoctorDomainRules();

  constructor(
    @Inject(DOCTOR_REPOSITORY) private readonly repository: DoctorRepository,
  ) {}

  async getOrThrow(organizationId: UUID, id: UUID): Promise<Doctor> {
    const entity = await this.repository.findById(organizationId, id);
    if (!entity) {
      throw new DoctorNotFoundError(id);
    }
    entity.assertActive();
    return entity;
  }

  async list(organizationId: UUID, query: ListQuery) {
    return this.repository.list(organizationId, query);
  }

  async persist(entity: Doctor): Promise<void> {
    await this.repository.save(entity);
  }

  async applyMutation(
    organizationId: UUID,
    id: UUID,
    verb: string,
    payload: Record<string, unknown> = {},
  ): Promise<Doctor> {
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

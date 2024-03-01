import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import { PATIENT_REPOSITORY, type PatientRepository } from '../../domain/repositories/patient.repository';
import { PatientDomainRules } from '../../domain/services/patient-rules.service';
import { Patient } from '../../domain/entities/patient.entity';
import { PatientNotFoundError } from '../../domain/errors/patient.errors';

@Injectable()
export class PatientOrchestrator {
  private readonly rules = new PatientDomainRules();

  constructor(
    @Inject(PATIENT_REPOSITORY) private readonly repository: PatientRepository,
  ) {}

  async getOrThrow(organizationId: UUID, id: UUID): Promise<Patient> {
    const entity = await this.repository.findById(organizationId, id);
    if (!entity) {
      throw new PatientNotFoundError(id);
    }
    entity.assertActive();
    return entity;
  }

  async list(organizationId: UUID, query: ListQuery) {
    return this.repository.list(organizationId, query);
  }

  async persist(entity: Patient): Promise<void> {
    await this.repository.save(entity);
  }

  async applyMutation(
    organizationId: UUID,
    id: UUID,
    verb: string,
    payload: Record<string, unknown> = {},
  ): Promise<Patient> {
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

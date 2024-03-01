import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import { MEDICAL_RECORD_REPOSITORY, type MedicalRecordRepository } from '../../domain/repositories/medical-record.repository';
import { MedicalRecordDomainRules } from '../../domain/services/medical-record-rules.service';
import { MedicalRecord } from '../../domain/entities/medical-record.entity';
import { MedicalRecordNotFoundError } from '../../domain/errors/medical-record.errors';

@Injectable()
export class MedicalRecordOrchestrator {
  private readonly rules = new MedicalRecordDomainRules();

  constructor(
    @Inject(MEDICAL_RECORD_REPOSITORY) private readonly repository: MedicalRecordRepository,
  ) {}

  async getOrThrow(organizationId: UUID, id: UUID): Promise<MedicalRecord> {
    const entity = await this.repository.findById(organizationId, id);
    if (!entity) {
      throw new MedicalRecordNotFoundError(id);
    }
    entity.assertActive();
    return entity;
  }

  async list(organizationId: UUID, query: ListQuery) {
    return this.repository.list(organizationId, query);
  }

  async persist(entity: MedicalRecord): Promise<void> {
    await this.repository.save(entity);
  }

  async applyMutation(
    organizationId: UUID,
    id: UUID,
    verb: string,
    payload: Record<string, unknown> = {},
  ): Promise<MedicalRecord> {
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

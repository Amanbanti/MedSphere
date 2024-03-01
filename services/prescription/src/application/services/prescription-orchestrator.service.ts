import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import { PRESCRIPTION_REPOSITORY, type PrescriptionRepository } from '../../domain/repositories/prescription.repository';
import { PrescriptionDomainRules } from '../../domain/services/prescription-rules.service';
import { Prescription } from '../../domain/entities/prescription.entity';
import { PrescriptionNotFoundError } from '../../domain/errors/prescription.errors';

@Injectable()
export class PrescriptionOrchestrator {
  private readonly rules = new PrescriptionDomainRules();

  constructor(
    @Inject(PRESCRIPTION_REPOSITORY) private readonly repository: PrescriptionRepository,
  ) {}

  async getOrThrow(organizationId: UUID, id: UUID): Promise<Prescription> {
    const entity = await this.repository.findById(organizationId, id);
    if (!entity) {
      throw new PrescriptionNotFoundError(id);
    }
    entity.assertActive();
    return entity;
  }

  async list(organizationId: UUID, query: ListQuery) {
    return this.repository.list(organizationId, query);
  }

  async persist(entity: Prescription): Promise<void> {
    await this.repository.save(entity);
  }

  async applyMutation(
    organizationId: UUID,
    id: UUID,
    verb: string,
    payload: Record<string, unknown> = {},
  ): Promise<Prescription> {
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

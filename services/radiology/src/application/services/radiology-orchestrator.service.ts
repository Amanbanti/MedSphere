import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import { RADIOLOGY_STUDY_REPOSITORY, type RadiologyStudyRepository } from '../../domain/repositories/radiology-study.repository';
import { RadiologyDomainRules } from '../../domain/services/radiology-rules.service';
import { RadiologyStudy } from '../../domain/entities/radiology-study.entity';
import { RadiologyNotFoundError } from '../../domain/errors/radiology.errors';

@Injectable()
export class RadiologyOrchestrator {
  private readonly rules = new RadiologyDomainRules();

  constructor(
    @Inject(RADIOLOGY_STUDY_REPOSITORY) private readonly repository: RadiologyStudyRepository,
  ) {}

  async getOrThrow(organizationId: UUID, id: UUID): Promise<RadiologyStudy> {
    const entity = await this.repository.findById(organizationId, id);
    if (!entity) {
      throw new RadiologyNotFoundError(id);
    }
    entity.assertActive();
    return entity;
  }

  async list(organizationId: UUID, query: ListQuery) {
    return this.repository.list(organizationId, query);
  }

  async persist(entity: RadiologyStudy): Promise<void> {
    await this.repository.save(entity);
  }

  async applyMutation(
    organizationId: UUID,
    id: UUID,
    verb: string,
    payload: Record<string, unknown> = {},
  ): Promise<RadiologyStudy> {
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

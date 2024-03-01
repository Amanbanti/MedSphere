import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import { IMAGING_STUDY_REPOSITORY, type ImagingStudyRepository } from '../../domain/repositories/imaging-study.repository';
import { ImagingDomainRules } from '../../domain/services/imaging-rules.service';
import { ImagingStudy } from '../../domain/entities/imaging-study.entity';
import { ImagingNotFoundError } from '../../domain/errors/imaging.errors';

@Injectable()
export class ImagingOrchestrator {
  private readonly rules = new ImagingDomainRules();

  constructor(
    @Inject(IMAGING_STUDY_REPOSITORY) private readonly repository: ImagingStudyRepository,
  ) {}

  async getOrThrow(organizationId: UUID, id: UUID): Promise<ImagingStudy> {
    const entity = await this.repository.findById(organizationId, id);
    if (!entity) {
      throw new ImagingNotFoundError(id);
    }
    entity.assertActive();
    return entity;
  }

  async list(organizationId: UUID, query: ListQuery) {
    return this.repository.list(organizationId, query);
  }

  async persist(entity: ImagingStudy): Promise<void> {
    await this.repository.save(entity);
  }

  async applyMutation(
    organizationId: UUID,
    id: UUID,
    verb: string,
    payload: Record<string, unknown> = {},
  ): Promise<ImagingStudy> {
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

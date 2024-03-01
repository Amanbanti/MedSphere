import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import { VIDEO_SESSION_REPOSITORY, type VideoSessionRepository } from '../../domain/repositories/video-session.repository';
import { VideoConsultationDomainRules } from '../../domain/services/video-consultation-rules.service';
import { VideoSession } from '../../domain/entities/video-session.entity';
import { VideoConsultationNotFoundError } from '../../domain/errors/video-consultation.errors';

@Injectable()
export class VideoConsultationOrchestrator {
  private readonly rules = new VideoConsultationDomainRules();

  constructor(
    @Inject(VIDEO_SESSION_REPOSITORY) private readonly repository: VideoSessionRepository,
  ) {}

  async getOrThrow(organizationId: UUID, id: UUID): Promise<VideoSession> {
    const entity = await this.repository.findById(organizationId, id);
    if (!entity) {
      throw new VideoConsultationNotFoundError(id);
    }
    entity.assertActive();
    return entity;
  }

  async list(organizationId: UUID, query: ListQuery) {
    return this.repository.list(organizationId, query);
  }

  async persist(entity: VideoSession): Promise<void> {
    await this.repository.save(entity);
  }

  async applyMutation(
    organizationId: UUID,
    id: UUID,
    verb: string,
    payload: Record<string, unknown> = {},
  ): Promise<VideoSession> {
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

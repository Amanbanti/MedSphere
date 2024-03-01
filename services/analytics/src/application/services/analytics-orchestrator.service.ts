import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import { ANALYTICS_EVENT_REPOSITORY, type AnalyticsEventRepository } from '../../domain/repositories/analytics-event.repository';
import { AnalyticsDomainRules } from '../../domain/services/analytics-rules.service';
import { AnalyticsEvent } from '../../domain/entities/analytics-event.entity';
import { AnalyticsNotFoundError } from '../../domain/errors/analytics.errors';

@Injectable()
export class AnalyticsOrchestrator {
  private readonly rules = new AnalyticsDomainRules();

  constructor(
    @Inject(ANALYTICS_EVENT_REPOSITORY) private readonly repository: AnalyticsEventRepository,
  ) {}

  async getOrThrow(organizationId: UUID, id: UUID): Promise<AnalyticsEvent> {
    const entity = await this.repository.findById(organizationId, id);
    if (!entity) {
      throw new AnalyticsNotFoundError(id);
    }
    entity.assertActive();
    return entity;
  }

  async list(organizationId: UUID, query: ListQuery) {
    return this.repository.list(organizationId, query);
  }

  async persist(entity: AnalyticsEvent): Promise<void> {
    await this.repository.save(entity);
  }

  async applyMutation(
    organizationId: UUID,
    id: UUID,
    verb: string,
    payload: Record<string, unknown> = {},
  ): Promise<AnalyticsEvent> {
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

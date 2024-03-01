import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import { NOTIFICATION_REPOSITORY, type NotificationRepository } from '../../domain/repositories/notification.repository';
import { NotificationDomainRules } from '../../domain/services/notification-rules.service';
import { Notification } from '../../domain/entities/notification.entity';
import { NotificationNotFoundError } from '../../domain/errors/notification.errors';

@Injectable()
export class NotificationOrchestrator {
  private readonly rules = new NotificationDomainRules();

  constructor(
    @Inject(NOTIFICATION_REPOSITORY) private readonly repository: NotificationRepository,
  ) {}

  async getOrThrow(organizationId: UUID, id: UUID): Promise<Notification> {
    const entity = await this.repository.findById(organizationId, id);
    if (!entity) {
      throw new NotificationNotFoundError(id);
    }
    entity.assertActive();
    return entity;
  }

  async list(organizationId: UUID, query: ListQuery) {
    return this.repository.list(organizationId, query);
  }

  async persist(entity: Notification): Promise<void> {
    await this.repository.save(entity);
  }

  async applyMutation(
    organizationId: UUID,
    id: UUID,
    verb: string,
    payload: Record<string, unknown> = {},
  ): Promise<Notification> {
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

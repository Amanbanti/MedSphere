import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import { PHARMACY_ITEM_REPOSITORY, type PharmacyItemRepository } from '../../domain/repositories/pharmacy-item.repository';
import { PharmacyDomainRules } from '../../domain/services/pharmacy-rules.service';
import { PharmacyItem } from '../../domain/entities/pharmacy-item.entity';
import { PharmacyNotFoundError } from '../../domain/errors/pharmacy.errors';

@Injectable()
export class PharmacyOrchestrator {
  private readonly rules = new PharmacyDomainRules();

  constructor(
    @Inject(PHARMACY_ITEM_REPOSITORY) private readonly repository: PharmacyItemRepository,
  ) {}

  async getOrThrow(organizationId: UUID, id: UUID): Promise<PharmacyItem> {
    const entity = await this.repository.findById(organizationId, id);
    if (!entity) {
      throw new PharmacyNotFoundError(id);
    }
    entity.assertActive();
    return entity;
  }

  async list(organizationId: UUID, query: ListQuery) {
    return this.repository.list(organizationId, query);
  }

  async persist(entity: PharmacyItem): Promise<void> {
    await this.repository.save(entity);
  }

  async applyMutation(
    organizationId: UUID,
    id: UUID,
    verb: string,
    payload: Record<string, unknown> = {},
  ): Promise<PharmacyItem> {
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

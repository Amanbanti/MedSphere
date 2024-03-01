import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import { LAB_ORDER_REPOSITORY, type LabOrderRepository } from '../../domain/repositories/lab-order.repository';
import { LaboratoryDomainRules } from '../../domain/services/laboratory-rules.service';
import { LabOrder } from '../../domain/entities/lab-order.entity';
import { LaboratoryNotFoundError } from '../../domain/errors/laboratory.errors';

@Injectable()
export class LaboratoryOrchestrator {
  private readonly rules = new LaboratoryDomainRules();

  constructor(
    @Inject(LAB_ORDER_REPOSITORY) private readonly repository: LabOrderRepository,
  ) {}

  async getOrThrow(organizationId: UUID, id: UUID): Promise<LabOrder> {
    const entity = await this.repository.findById(organizationId, id);
    if (!entity) {
      throw new LaboratoryNotFoundError(id);
    }
    entity.assertActive();
    return entity;
  }

  async list(organizationId: UUID, query: ListQuery) {
    return this.repository.list(organizationId, query);
  }

  async persist(entity: LabOrder): Promise<void> {
    await this.repository.save(entity);
  }

  async applyMutation(
    organizationId: UUID,
    id: UUID,
    verb: string,
    payload: Record<string, unknown> = {},
  ): Promise<LabOrder> {
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

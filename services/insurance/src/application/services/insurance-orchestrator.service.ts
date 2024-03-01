import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import { INSURANCE_POLICY_REPOSITORY, type InsurancePolicyRepository } from '../../domain/repositories/insurance-policy.repository';
import { InsuranceDomainRules } from '../../domain/services/insurance-rules.service';
import { InsurancePolicy } from '../../domain/entities/insurance-policy.entity';
import { InsuranceNotFoundError } from '../../domain/errors/insurance.errors';

@Injectable()
export class InsuranceOrchestrator {
  private readonly rules = new InsuranceDomainRules();

  constructor(
    @Inject(INSURANCE_POLICY_REPOSITORY) private readonly repository: InsurancePolicyRepository,
  ) {}

  async getOrThrow(organizationId: UUID, id: UUID): Promise<InsurancePolicy> {
    const entity = await this.repository.findById(organizationId, id);
    if (!entity) {
      throw new InsuranceNotFoundError(id);
    }
    entity.assertActive();
    return entity;
  }

  async list(organizationId: UUID, query: ListQuery) {
    return this.repository.list(organizationId, query);
  }

  async persist(entity: InsurancePolicy): Promise<void> {
    await this.repository.save(entity);
  }

  async applyMutation(
    organizationId: UUID,
    id: UUID,
    verb: string,
    payload: Record<string, unknown> = {},
  ): Promise<InsurancePolicy> {
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

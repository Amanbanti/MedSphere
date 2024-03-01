import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { AuditTrailCommand } from '../commands/audit-trail.command';
import { INSURANCEPOLICY_REPOSITORY, type InsurancePolicyRepository } from '../../domain/repositories/insurance-policy.repository';
import { InsuranceOrchestrator } from '../services/insurance-orchestrator.service';
import { InsuranceAccessPolicy } from '../../domain/policies/insurance-access.policy';
import { InsurancePolicyMapper } from '../mappers/insurance-policy.mapper';

@Injectable()
export class AuditTrailUseCase {
  constructor(
    @Inject(INSURANCEPOLICY_REPOSITORY) private readonly repository: InsurancePolicyRepository,
    private readonly orchestrator: InsuranceOrchestrator,
  ) {}

  async execute(command: AuditTrailCommand) {
    InsuranceAccessPolicy.assertCanWrite(command.actor);
    InsuranceAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleQuery(command);
  }

  private async handleCommand(command: AuditTrailCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.insurancePolicyId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['auditTrail'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return InsurancePolicyMapper.toDto(entity);
  }

  private async handleQuery(command: AuditTrailCommand) {
    const query: ListQuery = {
      page: command.page ?? 1,
      pageSize: command.pageSize ?? 25,
      search: command.search,
      filters: command.filters,
    };
    const result = await this.repository.list(command.organizationId, query);
    return {
      data: result.data.map((e) => InsurancePolicyMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { BulkImportCommand } from '../commands/bulk-import.command';
import { INSURANCEPOLICY_REPOSITORY, type InsurancePolicyRepository } from '../../domain/repositories/insurance-policy.repository';
import { InsuranceOrchestrator } from '../services/insurance-orchestrator.service';
import { InsuranceAccessPolicy } from '../../domain/policies/insurance-access.policy';
import { InsurancePolicyMapper } from '../mappers/insurance-policy.mapper';

@Injectable()
export class BulkImportUseCase {
  constructor(
    @Inject(INSURANCEPOLICY_REPOSITORY) private readonly repository: InsurancePolicyRepository,
    private readonly orchestrator: InsuranceOrchestrator,
  ) {}

  async execute(command: BulkImportCommand) {
    InsuranceAccessPolicy.assertCanWrite(command.actor);
    InsuranceAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleCommand(command);
  }

  private async handleCommand(command: BulkImportCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.insurancePolicyId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['bulkImport'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return InsurancePolicyMapper.toDto(entity);
  }

  private async handleQuery(command: BulkImportCommand) {
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

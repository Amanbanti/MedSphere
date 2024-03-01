import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { GenerateSummaryCommand } from '../commands/generate-summary.command';
import { LABORDER_REPOSITORY, type LabOrderRepository } from '../../domain/repositories/lab-order.repository';
import { LaboratoryOrchestrator } from '../services/laboratory-orchestrator.service';
import { LaboratoryAccessPolicy } from '../../domain/policies/laboratory-access.policy';
import { LabOrderMapper } from '../mappers/lab-order.mapper';

@Injectable()
export class GenerateSummaryUseCase {
  constructor(
    @Inject(LABORDER_REPOSITORY) private readonly repository: LabOrderRepository,
    private readonly orchestrator: LaboratoryOrchestrator,
  ) {}

  async execute(command: GenerateSummaryCommand) {
    LaboratoryAccessPolicy.assertCanWrite(command.actor);
    LaboratoryAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleQuery(command);
  }

  private async handleCommand(command: GenerateSummaryCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.labOrderId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['generateSummary'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return LabOrderMapper.toDto(entity);
  }

  private async handleQuery(command: GenerateSummaryCommand) {
    const query: ListQuery = {
      page: command.page ?? 1,
      pageSize: command.pageSize ?? 25,
      search: command.search,
      filters: command.filters,
    };
    const result = await this.repository.list(command.organizationId, query);
    return {
      data: result.data.map((e) => LabOrderMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}

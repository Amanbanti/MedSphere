import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { RestoreLabOrderCommand } from '../commands/restore-lab-order.command';
import { LABORDER_REPOSITORY, type LabOrderRepository } from '../../domain/repositories/lab-order.repository';
import { LaboratoryOrchestrator } from '../services/laboratory-orchestrator.service';
import { LaboratoryAccessPolicy } from '../../domain/policies/laboratory-access.policy';
import { LabOrderMapper } from '../mappers/lab-order.mapper';

@Injectable()
export class RestoreLabOrderUseCase {
  constructor(
    @Inject(LABORDER_REPOSITORY) private readonly repository: LabOrderRepository,
    private readonly orchestrator: LaboratoryOrchestrator,
  ) {}

  async execute(command: RestoreLabOrderCommand) {
    LaboratoryAccessPolicy.assertCanWrite(command.actor);
    LaboratoryAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleCommand(command);
  }

  private async handleCommand(command: RestoreLabOrderCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.labOrderId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['restore'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return LabOrderMapper.toDto(entity);
  }

  private async handleQuery(command: RestoreLabOrderCommand) {
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

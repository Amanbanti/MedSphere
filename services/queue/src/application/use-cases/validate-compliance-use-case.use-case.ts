import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { ValidateComplianceCommand } from '../commands/validate-compliance.command';
import { QUEUEJOB_REPOSITORY, type QueueJobRepository } from '../../domain/repositories/queue-job.repository';
import { QueueOrchestrator } from '../services/queue-orchestrator.service';
import { QueueAccessPolicy } from '../../domain/policies/queue-access.policy';
import { QueueJobMapper } from '../mappers/queue-job.mapper';

@Injectable()
export class ValidateComplianceUseCase {
  constructor(
    @Inject(QUEUEJOB_REPOSITORY) private readonly repository: QueueJobRepository,
    private readonly orchestrator: QueueOrchestrator,
  ) {}

  async execute(command: ValidateComplianceCommand) {
    QueueAccessPolicy.assertCanWrite(command.actor);
    QueueAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleCommand(command);
  }

  private async handleCommand(command: ValidateComplianceCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.queueJobId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['validateCompliance'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return QueueJobMapper.toDto(entity);
  }

  private async handleQuery(command: ValidateComplianceCommand) {
    const query: ListQuery = {
      page: command.page ?? 1,
      pageSize: command.pageSize ?? 25,
      search: command.search,
      filters: command.filters,
    };
    const result = await this.repository.list(command.organizationId, query);
    return {
      data: result.data.map((e) => QueueJobMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}

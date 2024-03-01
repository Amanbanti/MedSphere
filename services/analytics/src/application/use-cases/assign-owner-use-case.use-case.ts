import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { AssignOwnerCommand } from '../commands/assign-owner.command';
import { ANALYTICSEVENT_REPOSITORY, type AnalyticsEventRepository } from '../../domain/repositories/analytics-event.repository';
import { AnalyticsOrchestrator } from '../services/analytics-orchestrator.service';
import { AnalyticsAccessPolicy } from '../../domain/policies/analytics-access.policy';
import { AnalyticsEventMapper } from '../mappers/analytics-event.mapper';

@Injectable()
export class AssignOwnerUseCase {
  constructor(
    @Inject(ANALYTICSEVENT_REPOSITORY) private readonly repository: AnalyticsEventRepository,
    private readonly orchestrator: AnalyticsOrchestrator,
  ) {}

  async execute(command: AssignOwnerCommand) {
    AnalyticsAccessPolicy.assertCanWrite(command.actor);
    AnalyticsAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleCommand(command);
  }

  private async handleCommand(command: AssignOwnerCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.analyticsEventId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['assignOwner'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return AnalyticsEventMapper.toDto(entity);
  }

  private async handleQuery(command: AssignOwnerCommand) {
    const query: ListQuery = {
      page: command.page ?? 1,
      pageSize: command.pageSize ?? 25,
      search: command.search,
      filters: command.filters,
    };
    const result = await this.repository.list(command.organizationId, query);
    return {
      data: result.data.map((e) => AnalyticsEventMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}

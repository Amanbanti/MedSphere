import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { ExportReportCommand } from '../commands/export-report.command';
import { NOTIFICATION_REPOSITORY, type NotificationRepository } from '../../domain/repositories/notification.repository';
import { NotificationOrchestrator } from '../services/notification-orchestrator.service';
import { NotificationAccessPolicy } from '../../domain/policies/notification-access.policy';
import { NotificationMapper } from '../mappers/notification.mapper';

@Injectable()
export class ExportReportUseCase {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY) private readonly repository: NotificationRepository,
    private readonly orchestrator: NotificationOrchestrator,
  ) {}

  async execute(command: ExportReportCommand) {
    NotificationAccessPolicy.assertCanWrite(command.actor);
    NotificationAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleQuery(command);
  }

  private async handleCommand(command: ExportReportCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.notificationId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['exportReport'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return NotificationMapper.toDto(entity);
  }

  private async handleQuery(command: ExportReportCommand) {
    const query: ListQuery = {
      page: command.page ?? 1,
      pageSize: command.pageSize ?? 25,
      search: command.search,
      filters: command.filters,
    };
    const result = await this.repository.list(command.organizationId, query);
    return {
      data: result.data.map((e) => NotificationMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}

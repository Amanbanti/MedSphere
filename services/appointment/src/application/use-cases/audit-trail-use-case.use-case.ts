import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { AuditTrailCommand } from '../commands/audit-trail.command';
import { APPOINTMENT_REPOSITORY, type AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { AppointmentOrchestrator } from '../services/appointment-orchestrator.service';
import { AppointmentAccessPolicy } from '../../domain/policies/appointment-access.policy';
import { AppointmentMapper } from '../mappers/appointment.mapper';

@Injectable()
export class AuditTrailUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY) private readonly repository: AppointmentRepository,
    private readonly orchestrator: AppointmentOrchestrator,
  ) {}

  async execute(command: AuditTrailCommand) {
    AppointmentAccessPolicy.assertCanWrite(command.actor);
    AppointmentAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleQuery(command);
  }

  private async handleCommand(command: AuditTrailCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.appointmentId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['auditTrail'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return AppointmentMapper.toDto(entity);
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
      data: result.data.map((e) => AppointmentMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}

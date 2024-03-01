import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { ExportReportCommand } from '../commands/export-report.command';
import { PRESCRIPTION_REPOSITORY, type PrescriptionRepository } from '../../domain/repositories/prescription.repository';
import { PrescriptionOrchestrator } from '../services/prescription-orchestrator.service';
import { PrescriptionAccessPolicy } from '../../domain/policies/prescription-access.policy';
import { PrescriptionMapper } from '../mappers/prescription.mapper';

@Injectable()
export class ExportReportUseCase {
  constructor(
    @Inject(PRESCRIPTION_REPOSITORY) private readonly repository: PrescriptionRepository,
    private readonly orchestrator: PrescriptionOrchestrator,
  ) {}

  async execute(command: ExportReportCommand) {
    PrescriptionAccessPolicy.assertCanWrite(command.actor);
    PrescriptionAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleQuery(command);
  }

  private async handleCommand(command: ExportReportCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.prescriptionId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['exportReport'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return PrescriptionMapper.toDto(entity);
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
      data: result.data.map((e) => PrescriptionMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}

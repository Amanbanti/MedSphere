import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { ExportReportCommand } from '../commands/export-report.command';
import { MEDICALRECORD_REPOSITORY, type MedicalRecordRepository } from '../../domain/repositories/medical-record.repository';
import { MedicalRecordOrchestrator } from '../services/medical-record-orchestrator.service';
import { MedicalRecordAccessPolicy } from '../../domain/policies/medical-record-access.policy';
import { MedicalRecordMapper } from '../mappers/medical-record.mapper';

@Injectable()
export class ExportReportUseCase {
  constructor(
    @Inject(MEDICALRECORD_REPOSITORY) private readonly repository: MedicalRecordRepository,
    private readonly orchestrator: MedicalRecordOrchestrator,
  ) {}

  async execute(command: ExportReportCommand) {
    MedicalRecordAccessPolicy.assertCanWrite(command.actor);
    MedicalRecordAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleQuery(command);
  }

  private async handleCommand(command: ExportReportCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.medicalRecordId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['exportReport'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return MedicalRecordMapper.toDto(entity);
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
      data: result.data.map((e) => MedicalRecordMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}

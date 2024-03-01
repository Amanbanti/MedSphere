import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { GenerateSummaryCommand } from '../commands/generate-summary.command';
import { MEDICALRECORD_REPOSITORY, type MedicalRecordRepository } from '../../domain/repositories/medical-record.repository';
import { MedicalRecordOrchestrator } from '../services/medical-record-orchestrator.service';
import { MedicalRecordAccessPolicy } from '../../domain/policies/medical-record-access.policy';
import { MedicalRecordMapper } from '../mappers/medical-record.mapper';

@Injectable()
export class GenerateSummaryUseCase {
  constructor(
    @Inject(MEDICALRECORD_REPOSITORY) private readonly repository: MedicalRecordRepository,
    private readonly orchestrator: MedicalRecordOrchestrator,
  ) {}

  async execute(command: GenerateSummaryCommand) {
    MedicalRecordAccessPolicy.assertCanWrite(command.actor);
    MedicalRecordAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleQuery(command);
  }

  private async handleCommand(command: GenerateSummaryCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.medicalRecordId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['generateSummary'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return MedicalRecordMapper.toDto(entity);
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
      data: result.data.map((e) => MedicalRecordMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}

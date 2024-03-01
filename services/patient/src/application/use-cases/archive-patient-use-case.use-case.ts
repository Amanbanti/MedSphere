import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { ArchivePatientCommand } from '../commands/archive-patient.command';
import { PATIENT_REPOSITORY, type PatientRepository } from '../../domain/repositories/patient.repository';
import { PatientOrchestrator } from '../services/patient-orchestrator.service';
import { PatientAccessPolicy } from '../../domain/policies/patient-access.policy';
import { PatientMapper } from '../mappers/patient.mapper';

@Injectable()
export class ArchivePatientUseCase {
  constructor(
    @Inject(PATIENT_REPOSITORY) private readonly repository: PatientRepository,
    private readonly orchestrator: PatientOrchestrator,
  ) {}

  async execute(command: ArchivePatientCommand) {
    PatientAccessPolicy.assertCanWrite(command.actor);
    PatientAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleCommand(command);
  }

  private async handleCommand(command: ArchivePatientCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.patientId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['archive'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return PatientMapper.toDto(entity);
  }

  private async handleQuery(command: ArchivePatientCommand) {
    const query: ListQuery = {
      page: command.page ?? 1,
      pageSize: command.pageSize ?? 25,
      search: command.search,
      filters: command.filters,
    };
    const result = await this.repository.list(command.organizationId, query);
    return {
      data: result.data.map((e) => PatientMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}

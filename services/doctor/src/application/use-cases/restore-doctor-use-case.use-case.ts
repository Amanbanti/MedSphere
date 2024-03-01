import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { RestoreDoctorCommand } from '../commands/restore-doctor.command';
import { DOCTOR_REPOSITORY, type DoctorRepository } from '../../domain/repositories/doctor.repository';
import { DoctorOrchestrator } from '../services/doctor-orchestrator.service';
import { DoctorAccessPolicy } from '../../domain/policies/doctor-access.policy';
import { DoctorMapper } from '../mappers/doctor.mapper';

@Injectable()
export class RestoreDoctorUseCase {
  constructor(
    @Inject(DOCTOR_REPOSITORY) private readonly repository: DoctorRepository,
    private readonly orchestrator: DoctorOrchestrator,
  ) {}

  async execute(command: RestoreDoctorCommand) {
    DoctorAccessPolicy.assertCanWrite(command.actor);
    DoctorAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleCommand(command);
  }

  private async handleCommand(command: RestoreDoctorCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.doctorId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['restore'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return DoctorMapper.toDto(entity);
  }

  private async handleQuery(command: RestoreDoctorCommand) {
    const query: ListQuery = {
      page: command.page ?? 1,
      pageSize: command.pageSize ?? 25,
      search: command.search,
      filters: command.filters,
    };
    const result = await this.repository.list(command.organizationId, query);
    return {
      data: result.data.map((e) => DoctorMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}

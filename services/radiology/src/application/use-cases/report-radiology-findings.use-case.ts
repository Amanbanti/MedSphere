import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { ReportRadiologyFindingsCommand } from '../commands/report-radiology-findings.command';
import { RADIOLOGY_STUDY_REPOSITORY, type RadiologyStudyRepository } from '../../domain/repositories/radiology-study.repository';
import { RadiologyStudy } from '../../domain/entities/radiology-study.entity';
import {
  RadiologyNotFoundError,
  ValidationError,
} from '../../domain/errors/radiology.errors';
import { RadiologyStudyMapper } from '../mappers/radiology-study.mapper';

@Injectable()
export class ReportRadiologyFindingsUseCase {
  constructor(
    @Inject(RADIOLOGY_STUDY_REPOSITORY) private readonly repository: RadiologyStudyRepository,
  ) {}

  async execute(command: ReportRadiologyFindingsCommand) {
    if (!command.id && !command.payload) {
      throw new ValidationError('id or payload is required');
    }
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (!targetId) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, targetId);
    if (!entity) {
      throw new RadiologyNotFoundError(targetId);
    }
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    return RadiologyStudyMapper.toDto(entity);
  }
}

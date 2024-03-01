import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { ScheduleRadiologyStudyCommand } from '../commands/schedule-radiology-study.command';
import { RADIOLOGY_STUDY_REPOSITORY, type RadiologyStudyRepository } from '../../domain/repositories/radiology-study.repository';
import { RadiologyStudy } from '../../domain/entities/radiology-study.entity';
import {
  RadiologyNotFoundError,
  ValidationError,
} from '../../domain/errors/radiology.errors';
import { RadiologyStudyMapper } from '../mappers/radiology-study.mapper';

@Injectable()
export class ScheduleRadiologyStudyUseCase {
  constructor(
    @Inject(RADIOLOGY_STUDY_REPOSITORY) private readonly repository: RadiologyStudyRepository,
  ) {}

  async execute(command: ScheduleRadiologyStudyCommand) {
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = RadiologyStudy.register({
      id,
      organizationId: command.organizationId,
      now,
      ...(command.payload as Record<string, never>),
    } as Parameters<typeof RadiologyStudy.register>[0]);
    await this.repository.save(entity);
    return RadiologyStudyMapper.toDto(entity);
  }
}

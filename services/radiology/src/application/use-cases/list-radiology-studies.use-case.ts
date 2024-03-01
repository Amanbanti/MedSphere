import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { ListRadiologyStudiesCommand } from '../commands/list-radiology-studies.command';
import { RADIOLOGY_STUDY_REPOSITORY, type RadiologyStudyRepository } from '../../domain/repositories/radiology-study.repository';
import { RadiologyStudy } from '../../domain/entities/radiology-study.entity';
import {
  RadiologyNotFoundError,
  ValidationError,
} from '../../domain/errors/radiology.errors';
import { RadiologyStudyMapper } from '../mappers/radiology-study.mapper';

@Injectable()
export class ListRadiologyStudiesUseCase {
  constructor(
    @Inject(RADIOLOGY_STUDY_REPOSITORY) private readonly repository: RadiologyStudyRepository,
  ) {}

  async execute(command: ListRadiologyStudiesCommand) {
    const query = command.query ?? {};
    const result = await this.repository.list(command.organizationId, query);
    return {
      items: result.items.map((item) => RadiologyStudyMapper.toDto(item)),
      meta: result.meta,
    };
  }
}

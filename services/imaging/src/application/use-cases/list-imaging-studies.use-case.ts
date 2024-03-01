import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { ListImagingStudiesCommand } from '../commands/list-imaging-studies.command';
import { IMAGING_STUDY_REPOSITORY, type ImagingStudyRepository } from '../../domain/repositories/imaging-study.repository';
import { ImagingStudy } from '../../domain/entities/imaging-study.entity';
import {
  ImagingNotFoundError,
  ValidationError,
} from '../../domain/errors/imaging.errors';
import { ImagingStudyMapper } from '../mappers/imaging-study.mapper';

@Injectable()
export class ListImagingStudiesUseCase {
  constructor(
    @Inject(IMAGING_STUDY_REPOSITORY) private readonly repository: ImagingStudyRepository,
  ) {}

  async execute(command: ListImagingStudiesCommand) {
    const query = command.query ?? {};
    const result = await this.repository.list(command.organizationId, query);
    return {
      items: result.items.map((item) => ImagingStudyMapper.toDto(item)),
      meta: result.meta,
    };
  }
}

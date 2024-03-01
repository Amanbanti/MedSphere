import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { AnnotateImagingStudyCommand } from '../commands/annotate-imaging-study.command';
import { IMAGING_STUDY_REPOSITORY, type ImagingStudyRepository } from '../../domain/repositories/imaging-study.repository';
import { ImagingStudy } from '../../domain/entities/imaging-study.entity';
import {
  ImagingNotFoundError,
  ValidationError,
} from '../../domain/errors/imaging.errors';
import { ImagingStudyMapper } from '../mappers/imaging-study.mapper';

@Injectable()
export class AnnotateImagingStudyUseCase {
  constructor(
    @Inject(IMAGING_STUDY_REPOSITORY) private readonly repository: ImagingStudyRepository,
  ) {}

  async execute(command: AnnotateImagingStudyCommand) {
    if (!command.id && !command.payload) {
      throw new ValidationError('id or payload is required');
    }
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (!targetId) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, targetId);
    if (!entity) {
      throw new ImagingNotFoundError(targetId);
    }
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    return ImagingStudyMapper.toDto(entity);
  }
}

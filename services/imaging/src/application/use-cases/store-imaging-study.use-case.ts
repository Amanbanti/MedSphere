import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { StoreImagingStudyCommand } from '../commands/store-imaging-study.command';
import { IMAGING_STUDY_REPOSITORY, type ImagingStudyRepository } from '../../domain/repositories/imaging-study.repository';
import { ImagingStudy } from '../../domain/entities/imaging-study.entity';
import {
  ImagingNotFoundError,
  ValidationError,
} from '../../domain/errors/imaging.errors';
import { ImagingStudyMapper } from '../mappers/imaging-study.mapper';

@Injectable()
export class StoreImagingStudyUseCase {
  constructor(
    @Inject(IMAGING_STUDY_REPOSITORY) private readonly repository: ImagingStudyRepository,
  ) {}

  async execute(command: StoreImagingStudyCommand) {
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = ImagingStudy.register({
      id,
      organizationId: command.organizationId,
      now,
      ...(command.payload as Record<string, never>),
    } as Parameters<typeof ImagingStudy.register>[0]);
    await this.repository.save(entity);
    return ImagingStudyMapper.toDto(entity);
  }
}

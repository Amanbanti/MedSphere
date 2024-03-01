import type { UUID } from '@medsphere/shared';
import type { ImagingStudy } from '../entities/imaging-study.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const IMAGING_STUDY_REPOSITORY = Symbol('IMAGING_STUDY_REPOSITORY');

export interface ImagingStudyRepository {
  save(entity: ImagingStudy): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<ImagingStudy | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<ImagingStudy>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}


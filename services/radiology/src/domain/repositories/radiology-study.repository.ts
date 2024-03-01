import type { UUID } from '@medsphere/shared';
import type { RadiologyStudy } from '../entities/radiology-study.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const RADIOLOGY_STUDY_REPOSITORY = Symbol('RADIOLOGY_STUDY_REPOSITORY');

export interface RadiologyStudyRepository {
  save(entity: RadiologyStudy): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<RadiologyStudy | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<RadiologyStudy>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}


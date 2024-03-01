import type { UUID } from '@medsphere/shared';
import type { Prescription } from '../entities/prescription.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const PRESCRIPTION_REPOSITORY = Symbol('PRESCRIPTION_REPOSITORY');

export interface PrescriptionRepository {
  save(entity: Prescription): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<Prescription | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<Prescription>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}


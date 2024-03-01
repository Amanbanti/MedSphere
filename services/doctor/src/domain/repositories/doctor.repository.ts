import type { UUID } from '@medsphere/shared';
import type { Doctor } from '../entities/doctor.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const DOCTOR_REPOSITORY = Symbol('DOCTOR_REPOSITORY');

export interface DoctorRepository {
  save(entity: Doctor): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<Doctor | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<Doctor>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}

export const DOCTOR_AVAILABILITY_REPOSITORY = Symbol('DOCTOR_AVAILABILITY_REPOSITORY');

export interface DoctorAvailabilityRepository {
  save(record: import('../entities/doctor-availability.entity').DoctorAvailability): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<import('../entities/doctor-availability.entity').DoctorAvailability | null>;
  listByParent(organizationId: UUID, parentId: UUID): Promise<import('../entities/doctor-availability.entity').DoctorAvailability[]>;
}


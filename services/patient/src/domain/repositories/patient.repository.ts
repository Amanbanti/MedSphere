import type { UUID } from '@medsphere/shared';
import type { Patient } from '../entities/patient.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const PATIENT_REPOSITORY = Symbol('PATIENT_REPOSITORY');

export interface PatientRepository {
  save(entity: Patient): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<Patient | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<Patient>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}

export const PATIENT_ALLERGY_REPOSITORY = Symbol('PATIENT_ALLERGY_REPOSITORY');

export interface PatientAllergyRepository {
  save(record: import('../entities/patient-allergy.entity').PatientAllergy): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<import('../entities/patient-allergy.entity').PatientAllergy | null>;
  listByParent(organizationId: UUID, parentId: UUID): Promise<import('../entities/patient-allergy.entity').PatientAllergy[]>;
}


export const PATIENT_VITAL_REPOSITORY = Symbol('PATIENT_VITAL_REPOSITORY');

export interface PatientVitalRepository {
  save(record: import('../entities/patient-vital.entity').PatientVital): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<import('../entities/patient-vital.entity').PatientVital | null>;
  listByParent(organizationId: UUID, parentId: UUID): Promise<import('../entities/patient-vital.entity').PatientVital[]>;
}


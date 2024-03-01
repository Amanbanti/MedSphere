import type { UUID } from '@medsphere/shared';
import type { MedicalRecord } from '../entities/medical-record.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const MEDICAL_RECORD_REPOSITORY = Symbol('MEDICAL_RECORD_REPOSITORY');

export interface MedicalRecordRepository {
  save(entity: MedicalRecord): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<MedicalRecord | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<MedicalRecord>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}

export const CLINICAL_NOTE_REPOSITORY = Symbol('CLINICAL_NOTE_REPOSITORY');

export interface ClinicalNoteRepository {
  save(record: import('../entities/clinical-note.entity').ClinicalNote): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<import('../entities/clinical-note.entity').ClinicalNote | null>;
  listByParent(organizationId: UUID, parentId: UUID): Promise<import('../entities/clinical-note.entity').ClinicalNote[]>;
}


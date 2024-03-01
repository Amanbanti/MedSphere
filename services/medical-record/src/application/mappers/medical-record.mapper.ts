import type { MedicalRecord } from '../../domain/entities/medical-record.entity';

export interface MedicalRecordDto {
  id: string;
  organizationId: string;
  patientId: string;
  encounterId: string | null;
  recordType: MedicalRecordType;
  title: string;
  summary: string;
  status: RecordStatus;
  signedAt: string | null;
  signedBy: string | null;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class MedicalRecordMapper {
  static toDto(entity: MedicalRecord): MedicalRecordDto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
      patientId: entity.patientId,
      encounterId: entity.encounterId,
      recordType: entity.recordType,
      title: entity.title,
      summary: entity.summary,
      status: entity.status,
      signedAt: entity.signedAt,
      signedBy: entity.signedBy,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}

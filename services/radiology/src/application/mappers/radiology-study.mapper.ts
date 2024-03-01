import type { RadiologyStudy } from '../../domain/entities/radiology-study.entity';

export interface RadiologyStudyDto {
  id: string;
  organizationId: string;
  patientId: string;
  modality: string;
  bodyPart: string;
  scheduledAt: string;
  status: RadiologyStatus;
  findings: string | null;
  reportedBy: string | null;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class RadiologyStudyMapper {
  static toDto(entity: RadiologyStudy): RadiologyStudyDto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
      patientId: entity.patientId,
      modality: entity.modality,
      bodyPart: entity.bodyPart,
      scheduledAt: entity.scheduledAt,
      status: entity.status,
      findings: entity.findings,
      reportedBy: entity.reportedBy,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}

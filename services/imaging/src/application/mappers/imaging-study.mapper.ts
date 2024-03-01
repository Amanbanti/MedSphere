import type { ImagingStudy } from '../../domain/entities/imaging-study.entity';

export interface ImagingStudyDto {
  id: string;
  organizationId: string;
  studyInstanceUid: string;
  patientId: string;
  modality: string;
  seriesCount: number;
  storagePath: string;
  status: ImagingStatus;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class ImagingStudyMapper {
  static toDto(entity: ImagingStudy): ImagingStudyDto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
      studyInstanceUid: entity.studyInstanceUid,
      patientId: entity.patientId,
      modality: entity.modality,
      seriesCount: entity.seriesCount,
      storagePath: entity.storagePath,
      status: entity.status,
      archivedAt: entity.archivedAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}

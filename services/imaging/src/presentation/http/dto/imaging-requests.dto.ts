import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class StoreImagingStudyRequestDto {
  studyInstanceUid: string;
  patientId: string;
  modality: string;
  seriesCount: number;
  metadata?: Record<string, unknown>;
}

export class AnnotateImagingStudyRequestDto {
  studyInstanceUid: string;
  patientId: string;
  modality: string;
  seriesCount: number;
  metadata?: Record<string, unknown>;
}

export class ArchiveImagingStudyRequestDto {
  studyInstanceUid: string;
  patientId: string;
  modality: string;
  seriesCount: number;
  metadata?: Record<string, unknown>;
}

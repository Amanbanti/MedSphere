import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class ScheduleRadiologyStudyRequestDto {
  patientId: string;
  modality: string;
  bodyPart: string;
  scheduledAt: string;
  metadata?: Record<string, unknown>;
}

export class AcquireRadiologyImagesRequestDto {
  patientId: string;
  modality: string;
  bodyPart: string;
  scheduledAt: string;
  metadata?: Record<string, unknown>;
}

export class ReportRadiologyFindingsRequestDto {
  patientId: string;
  modality: string;
  bodyPart: string;
  scheduledAt: string;
  metadata?: Record<string, unknown>;
}

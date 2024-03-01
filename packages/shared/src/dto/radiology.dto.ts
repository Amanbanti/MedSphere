/**
 * Radiology DTOs for API and SDK consumers.
 */
import type { ISODateString, PaginatedResult, UUID } from '../types';
import type { ImagingModality, StudyStatus, ReportStatus, ContrastAgentType, RadiationDoseUnit, PacsSyncStatus, PeerReviewOutcome, CriticalFindingStatus, ImageQuality, WorklistPriority } from '../types/radiology';

export interface RadiologyImagingStudyDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: ImagingModality;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface RadiologyImagingStudyListItemDto {
  id: UUID;
  status: ImagingModality;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type RadiologyImagingStudyListDto = PaginatedResult<RadiologyImagingStudyListItemDto>;

export interface RadiologyRadiologyReportDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: StudyStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface RadiologyRadiologyReportListItemDto {
  id: UUID;
  status: StudyStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type RadiologyRadiologyReportListDto = PaginatedResult<RadiologyRadiologyReportListItemDto>;

export interface RadiologySeriesInstanceDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: ReportStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface RadiologySeriesInstanceListItemDto {
  id: UUID;
  status: ReportStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type RadiologySeriesInstanceListDto = PaginatedResult<RadiologySeriesInstanceListItemDto>;

export interface RadiologyDoseRecordDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: ContrastAgentType;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface RadiologyDoseRecordListItemDto {
  id: UUID;
  status: ContrastAgentType;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type RadiologyDoseRecordListDto = PaginatedResult<RadiologyDoseRecordListItemDto>;

export interface RadiologyCriticalFindingDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: RadiationDoseUnit;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface RadiologyCriticalFindingListItemDto {
  id: UUID;
  status: RadiationDoseUnit;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type RadiologyCriticalFindingListDto = PaginatedResult<RadiologyCriticalFindingListItemDto>;

export interface RadiologyPeerReviewDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: PacsSyncStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface RadiologyPeerReviewListItemDto {
  id: UUID;
  status: PacsSyncStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type RadiologyPeerReviewListDto = PaginatedResult<RadiologyPeerReviewListItemDto>;

export interface RadiologyWorklistItemDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: PeerReviewOutcome;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface RadiologyWorklistItemListItemDto {
  id: UUID;
  status: PeerReviewOutcome;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type RadiologyWorklistItemListDto = PaginatedResult<RadiologyWorklistItemListItemDto>;

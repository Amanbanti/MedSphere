/**
 * Radiology domain types — MedSphere shared package.
 * @module @medsphere/shared/types/radiology
 */

import type { Auditable, ISODateString, SoftDelete, TenantScoped, UUID } from './index';


export enum ImagingModality {
  CR = 'CR',
  CT = 'CT',
  MR = 'MR',
  US = 'US',
  NM = 'NM',
  PT = 'PT',
  XA = 'XA',
  MG = 'MG',
  RF = 'RF',
  DX = 'DX',
}

export enum StudyStatus {
  SCHEDULED = 'SCHEDULED',
  ARRIVED = 'ARRIVED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  PRELIMINARY = 'PRELIMINARY',
  FINAL = 'FINAL',
  AMENDED = 'AMENDED',
  CANCELLED = 'CANCELLED',
}

export enum ReportStatus {
  DRAFT = 'DRAFT',
  PRELIMINARY = 'PRELIMINARY',
  FINAL = 'FINAL',
  ADDENDUM = 'ADDENDUM',
  CORRECTED = 'CORRECTED',
  CANCELLED = 'CANCELLED',
}

export enum ContrastAgentType {
  IODINATED = 'IODINATED',
  GADOLINIUM = 'GADOLINIUM',
  BARIUM = 'BARIUM',
  NONE = 'NONE',
  OTHER = 'OTHER',
}

export enum RadiationDoseUnit {
  MGY = 'MGY',
  MGYCMC2 = 'MGYCMC2',
  DLP = 'DLP',
  CTDI = 'CTDI',
}

export enum PacsSyncStatus {
  PENDING = 'PENDING',
  SYNCED = 'SYNCED',
  FAILED = 'FAILED',
  PARTIAL = 'PARTIAL',
}

export enum PeerReviewOutcome {
  CONCUR = 'CONCUR',
  MINOR_DISCREPANCY = 'MINOR_DISCREPANCY',
  MAJOR_DISCREPANCY = 'MAJOR_DISCREPANCY',
  NOT_REVIEWED = 'NOT_REVIEWED',
}

export enum CriticalFindingStatus {
  OPEN = 'OPEN',
  COMMUNICATED = 'COMMUNICATED',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  ESCALATED = 'ESCALATED',
  CLOSED = 'CLOSED',
}

export enum ImageQuality {
  DIAGNOSTIC = 'DIAGNOSTIC',
  LIMITED = 'LIMITED',
  NON_DIAGNOSTIC = 'NON_DIAGNOSTIC',
  REPEAT_REQUIRED = 'REPEAT_REQUIRED',
}

export enum WorklistPriority {
  ROUTINE = 'ROUTINE',
  URGENT = 'URGENT',
  STAT = 'STAT',
  CRITICAL = 'CRITICAL',
}

export interface RadiologyImagingStudyRecord {
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
}

export interface RadiologyImagingStudySummary {
  id: UUID;
  status: ImagingModality;
  displayName: string;
  updatedAt: ISODateString;
}

export interface RadiologyImagingStudyCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface RadiologyImagingStudyUpdateInput {
  status?: ImagingModality;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface RadiologyRadiologyReportRecord {
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
}

export interface RadiologyRadiologyReportSummary {
  id: UUID;
  status: StudyStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface RadiologyRadiologyReportCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface RadiologyRadiologyReportUpdateInput {
  status?: StudyStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface RadiologySeriesInstanceRecord {
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
}

export interface RadiologySeriesInstanceSummary {
  id: UUID;
  status: ReportStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface RadiologySeriesInstanceCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface RadiologySeriesInstanceUpdateInput {
  status?: ReportStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface RadiologyDoseRecordRecord {
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
}

export interface RadiologyDoseRecordSummary {
  id: UUID;
  status: ContrastAgentType;
  displayName: string;
  updatedAt: ISODateString;
}

export interface RadiologyDoseRecordCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface RadiologyDoseRecordUpdateInput {
  status?: ContrastAgentType;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface RadiologyCriticalFindingRecord {
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
}

export interface RadiologyCriticalFindingSummary {
  id: UUID;
  status: RadiationDoseUnit;
  displayName: string;
  updatedAt: ISODateString;
}

export interface RadiologyCriticalFindingCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface RadiologyCriticalFindingUpdateInput {
  status?: RadiationDoseUnit;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface RadiologyPeerReviewRecord {
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
}

export interface RadiologyPeerReviewSummary {
  id: UUID;
  status: PacsSyncStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface RadiologyPeerReviewCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface RadiologyPeerReviewUpdateInput {
  status?: PacsSyncStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface RadiologyWorklistItemRecord {
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
}

export interface RadiologyWorklistItemSummary {
  id: UUID;
  status: PeerReviewOutcome;
  displayName: string;
  updatedAt: ISODateString;
}

export interface RadiologyWorklistItemCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface RadiologyWorklistItemUpdateInput {
  status?: PeerReviewOutcome;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface RadiologyAggregateRoot {
  id: UUID;
  version: number;
  tenant: TenantScoped;
  audit: Auditable;
  softDelete: SoftDelete;
  tags: string[];
  extensions: Record<string, unknown>;
}

export interface RadiologySearchFilter {
  query?: string;
  statuses?: ImagingModality[];
  patientId?: UUID;
  facilityId?: UUID;
  dateFrom?: ISODateString;
  dateTo?: ISODateString;
  includeDeleted?: boolean;
}

export type RadiologyImagingStudyBulkOperation =
  | { op: 'create'; items: RadiologyImagingStudyCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: RadiologyImagingStudyUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type RadiologyRadiologyReportBulkOperation =
  | { op: 'create'; items: RadiologyRadiologyReportCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: RadiologyRadiologyReportUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type RadiologySeriesInstanceBulkOperation =
  | { op: 'create'; items: RadiologySeriesInstanceCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: RadiologySeriesInstanceUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type RadiologyDoseRecordBulkOperation =
  | { op: 'create'; items: RadiologyDoseRecordCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: RadiologyDoseRecordUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type RadiologyCriticalFindingBulkOperation =
  | { op: 'create'; items: RadiologyCriticalFindingCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: RadiologyCriticalFindingUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type RadiologyDomainEventType =
  | 'radiology.imaging-study.created'
  | 'radiology.radiology-report.created'
  | 'radiology.series-instance.created'
  | 'radiology.dose-record.created'
  | 'radiology.critical-finding.created'
  | 'radiology.peer-review.created'
  | 'radiology.worklist-item.created'
  | 'radiology.imaging-study.updated'
  | 'radiology.radiology-report.updated'
  | 'radiology.series-instance.updated'
  | 'radiology.dose-record.updated'
  | 'radiology.critical-finding.updated'
  | 'radiology.peer-review.updated'
  | 'radiology.worklist-item.updated'
  | 'radiology.imaging-study.archived'
  | 'radiology.radiology-report.archived'
  | 'radiology.series-instance.archived'
  | 'radiology.dose-record.archived'
  | 'radiology.critical-finding.archived'
  | 'radiology.peer-review.archived'
  | 'radiology.worklist-item.archived';

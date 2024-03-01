/**
 * Laboratory domain types — MedSphere shared package.
 * @module @medsphere/shared/types/laboratory
 */

import type { Auditable, ISODateString, SoftDelete, TenantScoped, UUID } from './index';


export enum LabOrderStatus {
  DRAFT = 'DRAFT',
  ORDERED = 'ORDERED',
  COLLECTED = 'COLLECTED',
  IN_TRANSIT = 'IN_TRANSIT',
  RECEIVED = 'RECEIVED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum SpecimenType {
  BLOOD = 'BLOOD',
  SERUM = 'SERUM',
  PLASMA = 'PLASMA',
  URINE = 'URINE',
  STOOL = 'STOOL',
  CSF = 'CSF',
  TISSUE = 'TISSUE',
  SWAB = 'SWAB',
  OTHER = 'OTHER',
}

export enum SpecimenStatus {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
  UNSATISFACTORY = 'UNSATISFACTORY',
  ENTERED_IN_ERROR = 'ENTERED_IN_ERROR',
}

export enum ResultStatus {
  PRELIMINARY = 'PRELIMINARY',
  FINAL = 'FINAL',
  CORRECTED = 'CORRECTED',
  CANCELLED = 'CANCELLED',
  ENTERED_IN_ERROR = 'ENTERED_IN_ERROR',
}

export enum ResultInterpretation {
  NORMAL = 'NORMAL',
  ABNORMAL = 'ABNORMAL',
  CRITICAL_LOW = 'CRITICAL_LOW',
  CRITICAL_HIGH = 'CRITICAL_HIGH',
  INDETERMINATE = 'INDETERMINATE',
}

export enum LabPanelCategory {
  HEMATOLOGY = 'HEMATOLOGY',
  CHEMISTRY = 'CHEMISTRY',
  MICROBIOLOGY = 'MICROBIOLOGY',
  IMMUNOLOGY = 'IMMUNOLOGY',
  TOXICOLOGY = 'TOXICOLOGY',
  MOLECULAR = 'MOLECULAR',
  PATHOLOGY = 'PATHOLOGY',
}

export enum CollectionMethod {
  VENIPUNCTURE = 'VENIPUNCTURE',
  FINGERSTICK = 'FINGERSTICK',
  MIDSTREAM = 'MIDSTREAM',
  CATHETER = 'CATHETER',
  ASPIRATION = 'ASPIRATION',
}

export enum QualityControlStatus {
  PASS = 'PASS',
  FAIL = 'FAIL',
  PENDING = 'PENDING',
  OUT_OF_RANGE = 'OUT_OF_RANGE',
}

export enum LabInstrumentStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  MAINTENANCE = 'MAINTENANCE',
  CALIBRATION = 'CALIBRATION',
  ERROR = 'ERROR',
}

export enum CriticalValueAckStatus {
  PENDING = 'PENDING',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  ESCALATED = 'ESCALATED',
  OVERRIDE_DOCUMENTED = 'OVERRIDE_DOCUMENTED',
}

export interface LaboratoryLabOrderRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: LabOrderStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface LaboratoryLabOrderSummary {
  id: UUID;
  status: LabOrderStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface LaboratoryLabOrderCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface LaboratoryLabOrderUpdateInput {
  status?: LabOrderStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface LaboratoryLabPanelRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: SpecimenType;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface LaboratoryLabPanelSummary {
  id: UUID;
  status: SpecimenType;
  displayName: string;
  updatedAt: ISODateString;
}

export interface LaboratoryLabPanelCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface LaboratoryLabPanelUpdateInput {
  status?: SpecimenType;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface LaboratoryLabTestRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: SpecimenStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface LaboratoryLabTestSummary {
  id: UUID;
  status: SpecimenStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface LaboratoryLabTestCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface LaboratoryLabTestUpdateInput {
  status?: SpecimenStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface LaboratorySpecimenRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: ResultStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface LaboratorySpecimenSummary {
  id: UUID;
  status: ResultStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface LaboratorySpecimenCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface LaboratorySpecimenUpdateInput {
  status?: ResultStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface LaboratoryLabResultRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: ResultInterpretation;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface LaboratoryLabResultSummary {
  id: UUID;
  status: ResultInterpretation;
  displayName: string;
  updatedAt: ISODateString;
}

export interface LaboratoryLabResultCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface LaboratoryLabResultUpdateInput {
  status?: ResultInterpretation;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface LaboratoryCriticalValueAlertRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: LabPanelCategory;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface LaboratoryCriticalValueAlertSummary {
  id: UUID;
  status: LabPanelCategory;
  displayName: string;
  updatedAt: ISODateString;
}

export interface LaboratoryCriticalValueAlertCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface LaboratoryCriticalValueAlertUpdateInput {
  status?: LabPanelCategory;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface LaboratoryQcRunRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: CollectionMethod;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface LaboratoryQcRunSummary {
  id: UUID;
  status: CollectionMethod;
  displayName: string;
  updatedAt: ISODateString;
}

export interface LaboratoryQcRunCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface LaboratoryQcRunUpdateInput {
  status?: CollectionMethod;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface LaboratoryLabInstrumentRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: QualityControlStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface LaboratoryLabInstrumentSummary {
  id: UUID;
  status: QualityControlStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface LaboratoryLabInstrumentCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface LaboratoryLabInstrumentUpdateInput {
  status?: QualityControlStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface LaboratoryAggregateRoot {
  id: UUID;
  version: number;
  tenant: TenantScoped;
  audit: Auditable;
  softDelete: SoftDelete;
  tags: string[];
  extensions: Record<string, unknown>;
}

export interface LaboratorySearchFilter {
  query?: string;
  statuses?: LabOrderStatus[];
  patientId?: UUID;
  facilityId?: UUID;
  dateFrom?: ISODateString;
  dateTo?: ISODateString;
  includeDeleted?: boolean;
}

export type LaboratoryLabOrderBulkOperation =
  | { op: 'create'; items: LaboratoryLabOrderCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: LaboratoryLabOrderUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type LaboratoryLabPanelBulkOperation =
  | { op: 'create'; items: LaboratoryLabPanelCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: LaboratoryLabPanelUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type LaboratoryLabTestBulkOperation =
  | { op: 'create'; items: LaboratoryLabTestCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: LaboratoryLabTestUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type LaboratorySpecimenBulkOperation =
  | { op: 'create'; items: LaboratorySpecimenCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: LaboratorySpecimenUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type LaboratoryLabResultBulkOperation =
  | { op: 'create'; items: LaboratoryLabResultCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: LaboratoryLabResultUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type LaboratoryDomainEventType =
  | 'laboratory.lab-order.created'
  | 'laboratory.lab-panel.created'
  | 'laboratory.lab-test.created'
  | 'laboratory.specimen.created'
  | 'laboratory.lab-result.created'
  | 'laboratory.critical-value-alert.created'
  | 'laboratory.qc-run.created'
  | 'laboratory.lab-instrument.created'
  | 'laboratory.lab-order.updated'
  | 'laboratory.lab-panel.updated'
  | 'laboratory.lab-test.updated'
  | 'laboratory.specimen.updated'
  | 'laboratory.lab-result.updated'
  | 'laboratory.critical-value-alert.updated'
  | 'laboratory.qc-run.updated'
  | 'laboratory.lab-instrument.updated'
  | 'laboratory.lab-order.archived'
  | 'laboratory.lab-panel.archived'
  | 'laboratory.lab-test.archived'
  | 'laboratory.specimen.archived'
  | 'laboratory.lab-result.archived'
  | 'laboratory.critical-value-alert.archived'
  | 'laboratory.qc-run.archived'
  | 'laboratory.lab-instrument.archived';

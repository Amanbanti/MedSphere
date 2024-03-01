/**
 * Clinical domain types — MedSphere shared package.
 * @module @medsphere/shared/types/clinical
 */

import type { Auditable, ISODateString, SoftDelete, TenantScoped, UUID } from './index';


export enum DiagnosisCertainty {
  CONFIRMED = 'CONFIRMED',
  PROVISIONAL = 'PROVISIONAL',
  DIFFERENTIAL = 'DIFFERENTIAL',
  RULED_OUT = 'RULED_OUT',
  UNKNOWN = 'UNKNOWN',
}

export enum AllergySeverity {
  MILD = 'MILD',
  MODERATE = 'MODERATE',
  SEVERE = 'SEVERE',
  LIFE_THREATENING = 'LIFE_THREATENING',
  UNKNOWN = 'UNKNOWN',
}

export enum VitalSignType {
  BLOOD_PRESSURE = 'BLOOD_PRESSURE',
  HEART_RATE = 'HEART_RATE',
  RESPIRATORY_RATE = 'RESPIRATORY_RATE',
  TEMPERATURE = 'TEMPERATURE',
  SPO2 = 'SPO2',
  WEIGHT = 'WEIGHT',
  HEIGHT = 'HEIGHT',
  BMI = 'BMI',
  PAIN_SCORE = 'PAIN_SCORE',
}

export enum ImmunizationStatus {
  COMPLETED = 'COMPLETED',
  NOT_DONE = 'NOT_DONE',
  PARTIALLY_DONE = 'PARTIALLY_DONE',
  ENTERED_IN_ERROR = 'ENTERED_IN_ERROR',
}

export enum CarePlanStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  ON_HOLD = 'ON_HOLD',
  REVOKED = 'REVOKED',
  COMPLETED = 'COMPLETED',
  ENTERED_IN_ERROR = 'ENTERED_IN_ERROR',
}

export enum ProblemListStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  RESOLVED = 'RESOLVED',
  CHRONIC = 'CHRONIC',
  RECURRENT = 'RECURRENT',
}

export enum ProcedureStatus {
  PREPARATION = 'PREPARATION',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_DONE = 'NOT_DONE',
  ON_HOLD = 'ON_HOLD',
  STOPPED = 'STOPPED',
  COMPLETED = 'COMPLETED',
  ENTERED_IN_ERROR = 'ENTERED_IN_ERROR',
}

export enum ConsentStatus {
  DRAFT = 'DRAFT',
  PROPOSED = 'PROPOSED',
  ACTIVE = 'ACTIVE',
  REJECTED = 'REJECTED',
  INACTIVE = 'INACTIVE',
  ENTERED_IN_ERROR = 'ENTERED_IN_ERROR',
}

export enum AdvanceDirectiveType {
  DNR = 'DNR',
  LIVING_WILL = 'LIVING_WILL',
  HEALTHCARE_PROXY = 'HEALTHCARE_PROXY',
  POLST = 'POLST',
  ORGAN_DONOR = 'ORGAN_DONOR',
}

export enum ClinicalDocumentStatus {
  PRELIMINARY = 'PRELIMINARY',
  FINAL = 'FINAL',
  AMENDED = 'AMENDED',
  ENTERED_IN_ERROR = 'ENTERED_IN_ERROR',
  DEPRECATED = 'DEPRECATED',
}

export enum BodySite {
  HEAD = 'HEAD',
  NECK = 'NECK',
  CHEST = 'CHEST',
  ABDOMEN = 'ABDOMEN',
  PELVIS = 'PELVIS',
  UPPER_EXTREMITY = 'UPPER_EXTREMITY',
  LOWER_EXTREMITY = 'LOWER_EXTREMITY',
  BACK = 'BACK',
  WHOLE_BODY = 'WHOLE_BODY',
}

export enum Laterality {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  BILATERAL = 'BILATERAL',
  UNILATERAL = 'UNILATERAL',
  UNKNOWN = 'UNKNOWN',
}

export enum ClinicalPriority {
  ROUTINE = 'ROUTINE',
  URGENT = 'URGENT',
  ASAP = 'ASAP',
  STAT = 'STAT',
  CRITICAL = 'CRITICAL',
}

export enum ReferralStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  ON_HOLD = 'ON_HOLD',
  REVOKED = 'REVOKED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum DischargeDisposition {
  HOME = 'HOME',
  SNF = 'SNF',
  REHAB = 'REHAB',
  HOSPICE = 'HOSPICE',
  AMA = 'AMA',
  TRANSFER = 'TRANSFER',
  DECEASED = 'DECEASED',
  OTHER = 'OTHER',
}

export interface ClinicalEncounterRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: DiagnosisCertainty;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface ClinicalEncounterSummary {
  id: UUID;
  status: DiagnosisCertainty;
  displayName: string;
  updatedAt: ISODateString;
}

export interface ClinicalEncounterCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalEncounterUpdateInput {
  status?: DiagnosisCertainty;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalDiagnosisRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: AllergySeverity;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface ClinicalDiagnosisSummary {
  id: UUID;
  status: AllergySeverity;
  displayName: string;
  updatedAt: ISODateString;
}

export interface ClinicalDiagnosisCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalDiagnosisUpdateInput {
  status?: AllergySeverity;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalClinicalNoteRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: VitalSignType;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface ClinicalClinicalNoteSummary {
  id: UUID;
  status: VitalSignType;
  displayName: string;
  updatedAt: ISODateString;
}

export interface ClinicalClinicalNoteCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalClinicalNoteUpdateInput {
  status?: VitalSignType;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalCarePlanRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: ImmunizationStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface ClinicalCarePlanSummary {
  id: UUID;
  status: ImmunizationStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface ClinicalCarePlanCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalCarePlanUpdateInput {
  status?: ImmunizationStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalProblemRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: CarePlanStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface ClinicalProblemSummary {
  id: UUID;
  status: CarePlanStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface ClinicalProblemCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalProblemUpdateInput {
  status?: CarePlanStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalProcedureRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: ProblemListStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface ClinicalProcedureSummary {
  id: UUID;
  status: ProblemListStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface ClinicalProcedureCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalProcedureUpdateInput {
  status?: ProblemListStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalConsentRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: ProcedureStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface ClinicalConsentSummary {
  id: UUID;
  status: ProcedureStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface ClinicalConsentCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalConsentUpdateInput {
  status?: ProcedureStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalReferralRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: ConsentStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface ClinicalReferralSummary {
  id: UUID;
  status: ConsentStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface ClinicalReferralCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalReferralUpdateInput {
  status?: ConsentStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalImmunizationRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: AdvanceDirectiveType;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface ClinicalImmunizationSummary {
  id: UUID;
  status: AdvanceDirectiveType;
  displayName: string;
  updatedAt: ISODateString;
}

export interface ClinicalImmunizationCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalImmunizationUpdateInput {
  status?: AdvanceDirectiveType;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalVitalSignReadingRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: ClinicalDocumentStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface ClinicalVitalSignReadingSummary {
  id: UUID;
  status: ClinicalDocumentStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface ClinicalVitalSignReadingCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalVitalSignReadingUpdateInput {
  status?: ClinicalDocumentStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClinicalAggregateRoot {
  id: UUID;
  version: number;
  tenant: TenantScoped;
  audit: Auditable;
  softDelete: SoftDelete;
  tags: string[];
  extensions: Record<string, unknown>;
}

export interface ClinicalSearchFilter {
  query?: string;
  statuses?: DiagnosisCertainty[];
  patientId?: UUID;
  facilityId?: UUID;
  dateFrom?: ISODateString;
  dateTo?: ISODateString;
  includeDeleted?: boolean;
}

export type ClinicalEncounterBulkOperation =
  | { op: 'create'; items: ClinicalEncounterCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: ClinicalEncounterUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type ClinicalDiagnosisBulkOperation =
  | { op: 'create'; items: ClinicalDiagnosisCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: ClinicalDiagnosisUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type ClinicalClinicalNoteBulkOperation =
  | { op: 'create'; items: ClinicalClinicalNoteCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: ClinicalClinicalNoteUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type ClinicalCarePlanBulkOperation =
  | { op: 'create'; items: ClinicalCarePlanCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: ClinicalCarePlanUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type ClinicalProblemBulkOperation =
  | { op: 'create'; items: ClinicalProblemCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: ClinicalProblemUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type ClinicalDomainEventType =
  | 'clinical.encounter.created'
  | 'clinical.diagnosis.created'
  | 'clinical.clinical-note.created'
  | 'clinical.care-plan.created'
  | 'clinical.problem.created'
  | 'clinical.procedure.created'
  | 'clinical.consent.created'
  | 'clinical.referral.created'
  | 'clinical.immunization.created'
  | 'clinical.vital-sign-reading.created'
  | 'clinical.encounter.updated'
  | 'clinical.diagnosis.updated'
  | 'clinical.clinical-note.updated'
  | 'clinical.care-plan.updated'
  | 'clinical.problem.updated'
  | 'clinical.procedure.updated'
  | 'clinical.consent.updated'
  | 'clinical.referral.updated'
  | 'clinical.immunization.updated'
  | 'clinical.vital-sign-reading.updated'
  | 'clinical.encounter.archived'
  | 'clinical.diagnosis.archived'
  | 'clinical.clinical-note.archived'
  | 'clinical.care-plan.archived'
  | 'clinical.problem.archived'
  | 'clinical.procedure.archived'
  | 'clinical.consent.archived'
  | 'clinical.referral.archived'
  | 'clinical.immunization.archived'
  | 'clinical.vital-sign-reading.archived';

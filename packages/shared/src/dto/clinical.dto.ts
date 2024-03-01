/**
 * Clinical DTOs for API and SDK consumers.
 */
import type { ISODateString, PaginatedResult, UUID } from '../types';
import type { DiagnosisCertainty, AllergySeverity, VitalSignType, ImmunizationStatus, CarePlanStatus, ProblemListStatus, ProcedureStatus, ConsentStatus, AdvanceDirectiveType, ClinicalDocumentStatus, BodySite, Laterality, ClinicalPriority, ReferralStatus, DischargeDisposition } from '../types/clinical';

export interface ClinicalEncounterDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface ClinicalEncounterListItemDto {
  id: UUID;
  status: DiagnosisCertainty;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type ClinicalEncounterListDto = PaginatedResult<ClinicalEncounterListItemDto>;

export interface ClinicalDiagnosisDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface ClinicalDiagnosisListItemDto {
  id: UUID;
  status: AllergySeverity;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type ClinicalDiagnosisListDto = PaginatedResult<ClinicalDiagnosisListItemDto>;

export interface ClinicalClinicalNoteDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface ClinicalClinicalNoteListItemDto {
  id: UUID;
  status: VitalSignType;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type ClinicalClinicalNoteListDto = PaginatedResult<ClinicalClinicalNoteListItemDto>;

export interface ClinicalCarePlanDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface ClinicalCarePlanListItemDto {
  id: UUID;
  status: ImmunizationStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type ClinicalCarePlanListDto = PaginatedResult<ClinicalCarePlanListItemDto>;

export interface ClinicalProblemDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface ClinicalProblemListItemDto {
  id: UUID;
  status: CarePlanStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type ClinicalProblemListDto = PaginatedResult<ClinicalProblemListItemDto>;

export interface ClinicalProcedureDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface ClinicalProcedureListItemDto {
  id: UUID;
  status: ProblemListStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type ClinicalProcedureListDto = PaginatedResult<ClinicalProcedureListItemDto>;

export interface ClinicalConsentDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface ClinicalConsentListItemDto {
  id: UUID;
  status: ProcedureStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type ClinicalConsentListDto = PaginatedResult<ClinicalConsentListItemDto>;

export interface ClinicalReferralDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface ClinicalReferralListItemDto {
  id: UUID;
  status: ConsentStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type ClinicalReferralListDto = PaginatedResult<ClinicalReferralListItemDto>;

export interface ClinicalImmunizationDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface ClinicalImmunizationListItemDto {
  id: UUID;
  status: AdvanceDirectiveType;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type ClinicalImmunizationListDto = PaginatedResult<ClinicalImmunizationListItemDto>;

export interface ClinicalVitalSignReadingDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface ClinicalVitalSignReadingListItemDto {
  id: UUID;
  status: ClinicalDocumentStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type ClinicalVitalSignReadingListDto = PaginatedResult<ClinicalVitalSignReadingListItemDto>;

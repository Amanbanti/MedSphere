/**
 * Laboratory DTOs for API and SDK consumers.
 */
import type { ISODateString, PaginatedResult, UUID } from '../types';
import type { LabOrderStatus, SpecimenType, SpecimenStatus, ResultStatus, ResultInterpretation, LabPanelCategory, CollectionMethod, QualityControlStatus, LabInstrumentStatus, CriticalValueAckStatus } from '../types/laboratory';

export interface LaboratoryLabOrderDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface LaboratoryLabOrderListItemDto {
  id: UUID;
  status: LabOrderStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type LaboratoryLabOrderListDto = PaginatedResult<LaboratoryLabOrderListItemDto>;

export interface LaboratoryLabPanelDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface LaboratoryLabPanelListItemDto {
  id: UUID;
  status: SpecimenType;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type LaboratoryLabPanelListDto = PaginatedResult<LaboratoryLabPanelListItemDto>;

export interface LaboratoryLabTestDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface LaboratoryLabTestListItemDto {
  id: UUID;
  status: SpecimenStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type LaboratoryLabTestListDto = PaginatedResult<LaboratoryLabTestListItemDto>;

export interface LaboratorySpecimenDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface LaboratorySpecimenListItemDto {
  id: UUID;
  status: ResultStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type LaboratorySpecimenListDto = PaginatedResult<LaboratorySpecimenListItemDto>;

export interface LaboratoryLabResultDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface LaboratoryLabResultListItemDto {
  id: UUID;
  status: ResultInterpretation;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type LaboratoryLabResultListDto = PaginatedResult<LaboratoryLabResultListItemDto>;

export interface LaboratoryCriticalValueAlertDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface LaboratoryCriticalValueAlertListItemDto {
  id: UUID;
  status: LabPanelCategory;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type LaboratoryCriticalValueAlertListDto = PaginatedResult<LaboratoryCriticalValueAlertListItemDto>;

export interface LaboratoryQcRunDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface LaboratoryQcRunListItemDto {
  id: UUID;
  status: CollectionMethod;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type LaboratoryQcRunListDto = PaginatedResult<LaboratoryQcRunListItemDto>;

export interface LaboratoryLabInstrumentDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface LaboratoryLabInstrumentListItemDto {
  id: UUID;
  status: QualityControlStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type LaboratoryLabInstrumentListDto = PaginatedResult<LaboratoryLabInstrumentListItemDto>;

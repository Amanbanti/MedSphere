/**
 * Pharmacy DTOs for API and SDK consumers.
 */
import type { ISODateString, PaginatedResult, UUID } from '../types';
import type { MedicationForm, PrescriptionStatus, DispenseStatus, DrugSchedule, InteractionSeverity, FormularyTier, MedicationRoute, RefillAuthorizationStatus, InventoryTransactionType, CompoundingStatus } from '../types/pharmacy';

export interface PharmacyMedicationDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: MedicationForm;
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

export interface PharmacyMedicationListItemDto {
  id: UUID;
  status: MedicationForm;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type PharmacyMedicationListDto = PaginatedResult<PharmacyMedicationListItemDto>;

export interface PharmacyPrescriptionDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: PrescriptionStatus;
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

export interface PharmacyPrescriptionListItemDto {
  id: UUID;
  status: PrescriptionStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type PharmacyPrescriptionListDto = PaginatedResult<PharmacyPrescriptionListItemDto>;

export interface PharmacyDispenseRecordDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: DispenseStatus;
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

export interface PharmacyDispenseRecordListItemDto {
  id: UUID;
  status: DispenseStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type PharmacyDispenseRecordListDto = PaginatedResult<PharmacyDispenseRecordListItemDto>;

export interface PharmacyDrugInteractionDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: DrugSchedule;
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

export interface PharmacyDrugInteractionListItemDto {
  id: UUID;
  status: DrugSchedule;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type PharmacyDrugInteractionListDto = PaginatedResult<PharmacyDrugInteractionListItemDto>;

export interface PharmacyFormularyEntryDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: InteractionSeverity;
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

export interface PharmacyFormularyEntryListItemDto {
  id: UUID;
  status: InteractionSeverity;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type PharmacyFormularyEntryListDto = PaginatedResult<PharmacyFormularyEntryListItemDto>;

export interface PharmacyInventoryLotDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: FormularyTier;
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

export interface PharmacyInventoryLotListItemDto {
  id: UUID;
  status: FormularyTier;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type PharmacyInventoryLotListDto = PaginatedResult<PharmacyInventoryLotListItemDto>;

export interface PharmacyCompoundingOrderDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: MedicationRoute;
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

export interface PharmacyCompoundingOrderListItemDto {
  id: UUID;
  status: MedicationRoute;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type PharmacyCompoundingOrderListDto = PaginatedResult<PharmacyCompoundingOrderListItemDto>;

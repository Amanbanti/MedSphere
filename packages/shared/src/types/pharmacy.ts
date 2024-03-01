/**
 * Pharmacy domain types — MedSphere shared package.
 * @module @medsphere/shared/types/pharmacy
 */

import type { Auditable, ISODateString, SoftDelete, TenantScoped, UUID } from './index';


export enum MedicationForm {
  TABLET = 'TABLET',
  CAPSULE = 'CAPSULE',
  LIQUID = 'LIQUID',
  INJECTION = 'INJECTION',
  TOPICAL = 'TOPICAL',
  INHALER = 'INHALER',
  PATCH = 'PATCH',
  SUPPOSITORY = 'SUPPOSITORY',
  OTHER = 'OTHER',
}

export enum PrescriptionStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  ON_HOLD = 'ON_HOLD',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
  DISCONTINUED = 'DISCONTINUED',
}

export enum DispenseStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY',
  PICKED_UP = 'PICKED_UP',
  RETURNED = 'RETURNED',
  CANCELLED = 'CANCELLED',
}

export enum DrugSchedule {
  OTC = 'OTC',
  CII = 'CII',
  CIII = 'CIII',
  CIV = 'CIV',
  CV = 'CV',
  NON_CONTROLLED = 'NON_CONTROLLED',
}

export enum InteractionSeverity {
  MINOR = 'MINOR',
  MODERATE = 'MODERATE',
  MAJOR = 'MAJOR',
  CONTRAINDICATED = 'CONTRAINDICATED',
}

export enum FormularyTier {
  TIER_1 = 'TIER_1',
  TIER_2 = 'TIER_2',
  TIER_3 = 'TIER_3',
  TIER_4 = 'TIER_4',
  NON_FORMULARY = 'NON_FORMULARY',
  SPECIALTY = 'SPECIALTY',
}

export enum MedicationRoute {
  ORAL = 'ORAL',
  IV = 'IV',
  IM = 'IM',
  SC = 'SC',
  TOPICAL = 'TOPICAL',
  INHALATION = 'INHALATION',
  RECTAL = 'RECTAL',
  OPHTHALMIC = 'OPHTHALMIC',
  OTIC = 'OTIC',
}

export enum RefillAuthorizationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  EXPIRED = 'EXPIRED',
}

export enum InventoryTransactionType {
  RECEIPT = 'RECEIPT',
  DISPENSE = 'DISPENSE',
  ADJUSTMENT = 'ADJUSTMENT',
  TRANSFER = 'TRANSFER',
  RETURN = 'RETURN',
  WASTE = 'WASTE',
}

export enum CompoundingStatus {
  ORDERED = 'ORDERED',
  IN_PROGRESS = 'IN_PROGRESS',
  QC = 'QC',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface PharmacyMedicationRecord {
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
}

export interface PharmacyMedicationSummary {
  id: UUID;
  status: MedicationForm;
  displayName: string;
  updatedAt: ISODateString;
}

export interface PharmacyMedicationCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface PharmacyMedicationUpdateInput {
  status?: MedicationForm;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface PharmacyPrescriptionRecord {
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
}

export interface PharmacyPrescriptionSummary {
  id: UUID;
  status: PrescriptionStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface PharmacyPrescriptionCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface PharmacyPrescriptionUpdateInput {
  status?: PrescriptionStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface PharmacyDispenseRecordRecord {
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
}

export interface PharmacyDispenseRecordSummary {
  id: UUID;
  status: DispenseStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface PharmacyDispenseRecordCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface PharmacyDispenseRecordUpdateInput {
  status?: DispenseStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface PharmacyDrugInteractionRecord {
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
}

export interface PharmacyDrugInteractionSummary {
  id: UUID;
  status: DrugSchedule;
  displayName: string;
  updatedAt: ISODateString;
}

export interface PharmacyDrugInteractionCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface PharmacyDrugInteractionUpdateInput {
  status?: DrugSchedule;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface PharmacyFormularyEntryRecord {
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
}

export interface PharmacyFormularyEntrySummary {
  id: UUID;
  status: InteractionSeverity;
  displayName: string;
  updatedAt: ISODateString;
}

export interface PharmacyFormularyEntryCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface PharmacyFormularyEntryUpdateInput {
  status?: InteractionSeverity;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface PharmacyInventoryLotRecord {
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
}

export interface PharmacyInventoryLotSummary {
  id: UUID;
  status: FormularyTier;
  displayName: string;
  updatedAt: ISODateString;
}

export interface PharmacyInventoryLotCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface PharmacyInventoryLotUpdateInput {
  status?: FormularyTier;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface PharmacyCompoundingOrderRecord {
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
}

export interface PharmacyCompoundingOrderSummary {
  id: UUID;
  status: MedicationRoute;
  displayName: string;
  updatedAt: ISODateString;
}

export interface PharmacyCompoundingOrderCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface PharmacyCompoundingOrderUpdateInput {
  status?: MedicationRoute;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface PharmacyAggregateRoot {
  id: UUID;
  version: number;
  tenant: TenantScoped;
  audit: Auditable;
  softDelete: SoftDelete;
  tags: string[];
  extensions: Record<string, unknown>;
}

export interface PharmacySearchFilter {
  query?: string;
  statuses?: MedicationForm[];
  patientId?: UUID;
  facilityId?: UUID;
  dateFrom?: ISODateString;
  dateTo?: ISODateString;
  includeDeleted?: boolean;
}

export type PharmacyMedicationBulkOperation =
  | { op: 'create'; items: PharmacyMedicationCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: PharmacyMedicationUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type PharmacyPrescriptionBulkOperation =
  | { op: 'create'; items: PharmacyPrescriptionCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: PharmacyPrescriptionUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type PharmacyDispenseRecordBulkOperation =
  | { op: 'create'; items: PharmacyDispenseRecordCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: PharmacyDispenseRecordUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type PharmacyDrugInteractionBulkOperation =
  | { op: 'create'; items: PharmacyDrugInteractionCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: PharmacyDrugInteractionUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type PharmacyFormularyEntryBulkOperation =
  | { op: 'create'; items: PharmacyFormularyEntryCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: PharmacyFormularyEntryUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type PharmacyDomainEventType =
  | 'pharmacy.medication.created'
  | 'pharmacy.prescription.created'
  | 'pharmacy.dispense-record.created'
  | 'pharmacy.drug-interaction.created'
  | 'pharmacy.formulary-entry.created'
  | 'pharmacy.inventory-lot.created'
  | 'pharmacy.compounding-order.created'
  | 'pharmacy.medication.updated'
  | 'pharmacy.prescription.updated'
  | 'pharmacy.dispense-record.updated'
  | 'pharmacy.drug-interaction.updated'
  | 'pharmacy.formulary-entry.updated'
  | 'pharmacy.inventory-lot.updated'
  | 'pharmacy.compounding-order.updated'
  | 'pharmacy.medication.archived'
  | 'pharmacy.prescription.archived'
  | 'pharmacy.dispense-record.archived'
  | 'pharmacy.drug-interaction.archived'
  | 'pharmacy.formulary-entry.archived'
  | 'pharmacy.inventory-lot.archived'
  | 'pharmacy.compounding-order.archived';

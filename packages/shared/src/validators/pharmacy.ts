/**
 * Pharmacy Zod validators.
 */
import { z } from 'zod';
import { isoDateSchema, uuidSchema } from '../validators';
import {
  MedicationForm,
  PrescriptionStatus,
  DispenseStatus,
  DrugSchedule,
  InteractionSeverity,
  FormularyTier,
  MedicationRoute,
  RefillAuthorizationStatus,
  InventoryTransactionType,
  CompoundingStatus,
} from '../types/pharmacy';

export const medicationCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const medicationUpdateSchema = z.object({
  status: z.nativeEnum(MedicationForm).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type PharmacyMedicationCreateInput = z.infer<typeof medicationCreateSchema>;
export type PharmacyMedicationUpdateInput = z.infer<typeof medicationUpdateSchema>;

export const prescriptionCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const prescriptionUpdateSchema = z.object({
  status: z.nativeEnum(PrescriptionStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type PharmacyPrescriptionCreateInput = z.infer<typeof prescriptionCreateSchema>;
export type PharmacyPrescriptionUpdateInput = z.infer<typeof prescriptionUpdateSchema>;

export const dispenseRecordCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const dispenseRecordUpdateSchema = z.object({
  status: z.nativeEnum(DispenseStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type PharmacyDispenseRecordCreateInput = z.infer<typeof dispenseRecordCreateSchema>;
export type PharmacyDispenseRecordUpdateInput = z.infer<typeof dispenseRecordUpdateSchema>;

export const drugInteractionCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const drugInteractionUpdateSchema = z.object({
  status: z.nativeEnum(DrugSchedule).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type PharmacyDrugInteractionCreateInput = z.infer<typeof drugInteractionCreateSchema>;
export type PharmacyDrugInteractionUpdateInput = z.infer<typeof drugInteractionUpdateSchema>;

export const formularyEntryCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const formularyEntryUpdateSchema = z.object({
  status: z.nativeEnum(InteractionSeverity).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type PharmacyFormularyEntryCreateInput = z.infer<typeof formularyEntryCreateSchema>;
export type PharmacyFormularyEntryUpdateInput = z.infer<typeof formularyEntryUpdateSchema>;

export const inventoryLotCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const inventoryLotUpdateSchema = z.object({
  status: z.nativeEnum(FormularyTier).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type PharmacyInventoryLotCreateInput = z.infer<typeof inventoryLotCreateSchema>;
export type PharmacyInventoryLotUpdateInput = z.infer<typeof inventoryLotUpdateSchema>;

export const compoundingOrderCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const compoundingOrderUpdateSchema = z.object({
  status: z.nativeEnum(MedicationRoute).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type PharmacyCompoundingOrderCreateInput = z.infer<typeof compoundingOrderCreateSchema>;
export type PharmacyCompoundingOrderUpdateInput = z.infer<typeof compoundingOrderUpdateSchema>;

export const pharmacySearchFilterSchema = z.object({
  query: z.string().trim().max(200).optional(),
  statuses: z.array(z.nativeEnum(MedicationForm)).max(20).optional(),
  patientId: uuidSchema.optional(),
  facilityId: uuidSchema.optional(),
  dateFrom: isoDateSchema.optional(),
  dateTo: isoDateSchema.optional(),
  includeDeleted: z.boolean().optional(),
});

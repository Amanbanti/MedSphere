/**
 * Laboratory Zod validators.
 */
import { z } from 'zod';
import { isoDateSchema, uuidSchema } from '../validators';
import {
  LabOrderStatus,
  SpecimenType,
  SpecimenStatus,
  ResultStatus,
  ResultInterpretation,
  LabPanelCategory,
  CollectionMethod,
  QualityControlStatus,
  LabInstrumentStatus,
  CriticalValueAckStatus,
} from '../types/laboratory';

export const labOrderCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const labOrderUpdateSchema = z.object({
  status: z.nativeEnum(LabOrderStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type LaboratoryLabOrderCreateInput = z.infer<typeof labOrderCreateSchema>;
export type LaboratoryLabOrderUpdateInput = z.infer<typeof labOrderUpdateSchema>;

export const labPanelCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const labPanelUpdateSchema = z.object({
  status: z.nativeEnum(SpecimenType).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type LaboratoryLabPanelCreateInput = z.infer<typeof labPanelCreateSchema>;
export type LaboratoryLabPanelUpdateInput = z.infer<typeof labPanelUpdateSchema>;

export const labTestCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const labTestUpdateSchema = z.object({
  status: z.nativeEnum(SpecimenStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type LaboratoryLabTestCreateInput = z.infer<typeof labTestCreateSchema>;
export type LaboratoryLabTestUpdateInput = z.infer<typeof labTestUpdateSchema>;

export const specimenCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const specimenUpdateSchema = z.object({
  status: z.nativeEnum(ResultStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type LaboratorySpecimenCreateInput = z.infer<typeof specimenCreateSchema>;
export type LaboratorySpecimenUpdateInput = z.infer<typeof specimenUpdateSchema>;

export const labResultCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const labResultUpdateSchema = z.object({
  status: z.nativeEnum(ResultInterpretation).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type LaboratoryLabResultCreateInput = z.infer<typeof labResultCreateSchema>;
export type LaboratoryLabResultUpdateInput = z.infer<typeof labResultUpdateSchema>;

export const criticalValueAlertCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const criticalValueAlertUpdateSchema = z.object({
  status: z.nativeEnum(LabPanelCategory).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type LaboratoryCriticalValueAlertCreateInput = z.infer<typeof criticalValueAlertCreateSchema>;
export type LaboratoryCriticalValueAlertUpdateInput = z.infer<typeof criticalValueAlertUpdateSchema>;

export const qcRunCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const qcRunUpdateSchema = z.object({
  status: z.nativeEnum(CollectionMethod).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type LaboratoryQcRunCreateInput = z.infer<typeof qcRunCreateSchema>;
export type LaboratoryQcRunUpdateInput = z.infer<typeof qcRunUpdateSchema>;

export const labInstrumentCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const labInstrumentUpdateSchema = z.object({
  status: z.nativeEnum(QualityControlStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type LaboratoryLabInstrumentCreateInput = z.infer<typeof labInstrumentCreateSchema>;
export type LaboratoryLabInstrumentUpdateInput = z.infer<typeof labInstrumentUpdateSchema>;

export const laboratorySearchFilterSchema = z.object({
  query: z.string().trim().max(200).optional(),
  statuses: z.array(z.nativeEnum(LabOrderStatus)).max(20).optional(),
  patientId: uuidSchema.optional(),
  facilityId: uuidSchema.optional(),
  dateFrom: isoDateSchema.optional(),
  dateTo: isoDateSchema.optional(),
  includeDeleted: z.boolean().optional(),
});

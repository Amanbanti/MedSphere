/**
 * Clinical Zod validators.
 */
import { z } from 'zod';
import { isoDateSchema, uuidSchema } from '../validators';
import {
  DiagnosisCertainty,
  AllergySeverity,
  VitalSignType,
  ImmunizationStatus,
  CarePlanStatus,
  ProblemListStatus,
  ProcedureStatus,
  ConsentStatus,
  AdvanceDirectiveType,
  ClinicalDocumentStatus,
  BodySite,
  Laterality,
  ClinicalPriority,
  ReferralStatus,
  DischargeDisposition,
} from '../types/clinical';

export const encounterCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const encounterUpdateSchema = z.object({
  status: z.nativeEnum(DiagnosisCertainty).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type ClinicalEncounterCreateInput = z.infer<typeof encounterCreateSchema>;
export type ClinicalEncounterUpdateInput = z.infer<typeof encounterUpdateSchema>;

export const diagnosisCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const diagnosisUpdateSchema = z.object({
  status: z.nativeEnum(AllergySeverity).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type ClinicalDiagnosisCreateInput = z.infer<typeof diagnosisCreateSchema>;
export type ClinicalDiagnosisUpdateInput = z.infer<typeof diagnosisUpdateSchema>;

export const clinicalNoteCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const clinicalNoteUpdateSchema = z.object({
  status: z.nativeEnum(VitalSignType).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type ClinicalClinicalNoteCreateInput = z.infer<typeof clinicalNoteCreateSchema>;
export type ClinicalClinicalNoteUpdateInput = z.infer<typeof clinicalNoteUpdateSchema>;

export const carePlanCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const carePlanUpdateSchema = z.object({
  status: z.nativeEnum(ImmunizationStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type ClinicalCarePlanCreateInput = z.infer<typeof carePlanCreateSchema>;
export type ClinicalCarePlanUpdateInput = z.infer<typeof carePlanUpdateSchema>;

export const problemCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const problemUpdateSchema = z.object({
  status: z.nativeEnum(CarePlanStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type ClinicalProblemCreateInput = z.infer<typeof problemCreateSchema>;
export type ClinicalProblemUpdateInput = z.infer<typeof problemUpdateSchema>;

export const procedureCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const procedureUpdateSchema = z.object({
  status: z.nativeEnum(ProblemListStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type ClinicalProcedureCreateInput = z.infer<typeof procedureCreateSchema>;
export type ClinicalProcedureUpdateInput = z.infer<typeof procedureUpdateSchema>;

export const consentCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const consentUpdateSchema = z.object({
  status: z.nativeEnum(ProcedureStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type ClinicalConsentCreateInput = z.infer<typeof consentCreateSchema>;
export type ClinicalConsentUpdateInput = z.infer<typeof consentUpdateSchema>;

export const referralCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const referralUpdateSchema = z.object({
  status: z.nativeEnum(ConsentStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type ClinicalReferralCreateInput = z.infer<typeof referralCreateSchema>;
export type ClinicalReferralUpdateInput = z.infer<typeof referralUpdateSchema>;

export const immunizationCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const immunizationUpdateSchema = z.object({
  status: z.nativeEnum(AdvanceDirectiveType).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type ClinicalImmunizationCreateInput = z.infer<typeof immunizationCreateSchema>;
export type ClinicalImmunizationUpdateInput = z.infer<typeof immunizationUpdateSchema>;

export const vitalSignReadingCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const vitalSignReadingUpdateSchema = z.object({
  status: z.nativeEnum(ClinicalDocumentStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type ClinicalVitalSignReadingCreateInput = z.infer<typeof vitalSignReadingCreateSchema>;
export type ClinicalVitalSignReadingUpdateInput = z.infer<typeof vitalSignReadingUpdateSchema>;

export const clinicalSearchFilterSchema = z.object({
  query: z.string().trim().max(200).optional(),
  statuses: z.array(z.nativeEnum(DiagnosisCertainty)).max(20).optional(),
  patientId: uuidSchema.optional(),
  facilityId: uuidSchema.optional(),
  dateFrom: isoDateSchema.optional(),
  dateTo: isoDateSchema.optional(),
  includeDeleted: z.boolean().optional(),
});

/**
 * Radiology Zod validators.
 */
import { z } from 'zod';
import { isoDateSchema, uuidSchema } from '../validators';
import {
  ImagingModality,
  StudyStatus,
  ReportStatus,
  ContrastAgentType,
  RadiationDoseUnit,
  PacsSyncStatus,
  PeerReviewOutcome,
  CriticalFindingStatus,
  ImageQuality,
  WorklistPriority,
} from '../types/radiology';

export const imagingStudyCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const imagingStudyUpdateSchema = z.object({
  status: z.nativeEnum(ImagingModality).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type RadiologyImagingStudyCreateInput = z.infer<typeof imagingStudyCreateSchema>;
export type RadiologyImagingStudyUpdateInput = z.infer<typeof imagingStudyUpdateSchema>;

export const radiologyReportCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const radiologyReportUpdateSchema = z.object({
  status: z.nativeEnum(StudyStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type RadiologyRadiologyReportCreateInput = z.infer<typeof radiologyReportCreateSchema>;
export type RadiologyRadiologyReportUpdateInput = z.infer<typeof radiologyReportUpdateSchema>;

export const seriesInstanceCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const seriesInstanceUpdateSchema = z.object({
  status: z.nativeEnum(ReportStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type RadiologySeriesInstanceCreateInput = z.infer<typeof seriesInstanceCreateSchema>;
export type RadiologySeriesInstanceUpdateInput = z.infer<typeof seriesInstanceUpdateSchema>;

export const doseRecordCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const doseRecordUpdateSchema = z.object({
  status: z.nativeEnum(ContrastAgentType).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type RadiologyDoseRecordCreateInput = z.infer<typeof doseRecordCreateSchema>;
export type RadiologyDoseRecordUpdateInput = z.infer<typeof doseRecordUpdateSchema>;

export const criticalFindingCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const criticalFindingUpdateSchema = z.object({
  status: z.nativeEnum(RadiationDoseUnit).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type RadiologyCriticalFindingCreateInput = z.infer<typeof criticalFindingCreateSchema>;
export type RadiologyCriticalFindingUpdateInput = z.infer<typeof criticalFindingUpdateSchema>;

export const peerReviewCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const peerReviewUpdateSchema = z.object({
  status: z.nativeEnum(PacsSyncStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type RadiologyPeerReviewCreateInput = z.infer<typeof peerReviewCreateSchema>;
export type RadiologyPeerReviewUpdateInput = z.infer<typeof peerReviewUpdateSchema>;

export const worklistItemCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const worklistItemUpdateSchema = z.object({
  status: z.nativeEnum(PeerReviewOutcome).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type RadiologyWorklistItemCreateInput = z.infer<typeof worklistItemCreateSchema>;
export type RadiologyWorklistItemUpdateInput = z.infer<typeof worklistItemUpdateSchema>;

export const radiologySearchFilterSchema = z.object({
  query: z.string().trim().max(200).optional(),
  statuses: z.array(z.nativeEnum(ImagingModality)).max(20).optional(),
  patientId: uuidSchema.optional(),
  facilityId: uuidSchema.optional(),
  dateFrom: isoDateSchema.optional(),
  dateTo: isoDateSchema.optional(),
  includeDeleted: z.boolean().optional(),
});

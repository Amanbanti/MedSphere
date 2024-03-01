/**
 * Telemedicine Zod validators.
 */
import { z } from 'zod';
import { isoDateSchema, uuidSchema } from '../validators';
import {
  SessionStatus,
  SessionType,
  ConnectionQuality,
  WaitingRoomStatus,
  RecordingConsentStatus,
  TelehealthPlatform,
  VirtualVisitReason,
  InterpreterRequestStatus,
  DeviceType,
  SessionBillingStatus,
} from '../types/telemedicine';

export const videoSessionCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const videoSessionUpdateSchema = z.object({
  status: z.nativeEnum(SessionStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type TelemedicineVideoSessionCreateInput = z.infer<typeof videoSessionCreateSchema>;
export type TelemedicineVideoSessionUpdateInput = z.infer<typeof videoSessionUpdateSchema>;

export const waitingRoomEntryCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const waitingRoomEntryUpdateSchema = z.object({
  status: z.nativeEnum(SessionType).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type TelemedicineWaitingRoomEntryCreateInput = z.infer<typeof waitingRoomEntryCreateSchema>;
export type TelemedicineWaitingRoomEntryUpdateInput = z.infer<typeof waitingRoomEntryUpdateSchema>;

export const sessionParticipantCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const sessionParticipantUpdateSchema = z.object({
  status: z.nativeEnum(ConnectionQuality).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type TelemedicineSessionParticipantCreateInput = z.infer<typeof sessionParticipantCreateSchema>;
export type TelemedicineSessionParticipantUpdateInput = z.infer<typeof sessionParticipantUpdateSchema>;

export const sessionRecordingCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const sessionRecordingUpdateSchema = z.object({
  status: z.nativeEnum(WaitingRoomStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type TelemedicineSessionRecordingCreateInput = z.infer<typeof sessionRecordingCreateSchema>;
export type TelemedicineSessionRecordingUpdateInput = z.infer<typeof sessionRecordingUpdateSchema>;

export const chatMessageCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const chatMessageUpdateSchema = z.object({
  status: z.nativeEnum(RecordingConsentStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type TelemedicineChatMessageCreateInput = z.infer<typeof chatMessageCreateSchema>;
export type TelemedicineChatMessageUpdateInput = z.infer<typeof chatMessageUpdateSchema>;

export const connectionMetricCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const connectionMetricUpdateSchema = z.object({
  status: z.nativeEnum(TelehealthPlatform).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type TelemedicineConnectionMetricCreateInput = z.infer<typeof connectionMetricCreateSchema>;
export type TelemedicineConnectionMetricUpdateInput = z.infer<typeof connectionMetricUpdateSchema>;

export const interpreterSessionCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const interpreterSessionUpdateSchema = z.object({
  status: z.nativeEnum(VirtualVisitReason).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type TelemedicineInterpreterSessionCreateInput = z.infer<typeof interpreterSessionCreateSchema>;
export type TelemedicineInterpreterSessionUpdateInput = z.infer<typeof interpreterSessionUpdateSchema>;

export const telemedicineSearchFilterSchema = z.object({
  query: z.string().trim().max(200).optional(),
  statuses: z.array(z.nativeEnum(SessionStatus)).max(20).optional(),
  patientId: uuidSchema.optional(),
  facilityId: uuidSchema.optional(),
  dateFrom: isoDateSchema.optional(),
  dateTo: isoDateSchema.optional(),
  includeDeleted: z.boolean().optional(),
});

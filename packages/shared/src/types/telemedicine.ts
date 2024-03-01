/**
 * Telemedicine domain types — MedSphere shared package.
 * @module @medsphere/shared/types/telemedicine
 */

import type { Auditable, ISODateString, SoftDelete, TenantScoped, UUID } from './index';


export enum SessionStatus {
  SCHEDULED = 'SCHEDULED',
  WAITING_ROOM = 'WAITING_ROOM',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
  TECHNICAL_FAILURE = 'TECHNICAL_FAILURE',
}

export enum SessionType {
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  CHAT = 'CHAT',
  HYBRID = 'HYBRID',
  ASYNC_MESSAGE = 'ASYNC_MESSAGE',
}

export enum ConnectionQuality {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
  DISCONNECTED = 'DISCONNECTED',
}

export enum WaitingRoomStatus {
  OPEN = 'OPEN',
  CHECKED_IN = 'CHECKED_IN',
  ADMITTED = 'ADMITTED',
  LEFT = 'LEFT',
  EXPIRED = 'EXPIRED',
}

export enum RecordingConsentStatus {
  NOT_REQUESTED = 'NOT_REQUESTED',
  PENDING = 'PENDING',
  GRANTED = 'GRANTED',
  DENIED = 'DENIED',
  REVOKED = 'REVOKED',
}

export enum TelehealthPlatform {
  WEBRTC = 'WEBRTC',
  ZOOM = 'ZOOM',
  TEAMS = 'TEAMS',
  CUSTOM = 'CUSTOM',
  PSTN_BRIDGE = 'PSTN_BRIDGE',
}

export enum VirtualVisitReason {
  FOLLOW_UP = 'FOLLOW_UP',
  NEW_CONSULT = 'NEW_CONSULT',
  URGENT_CARE = 'URGENT_CARE',
  BEHAVIORAL_HEALTH = 'BEHAVIORAL_HEALTH',
  CHRONIC_CARE = 'CHRONIC_CARE',
  PRE_OP = 'PRE_OP',
  POST_OP = 'POST_OP',
}

export enum InterpreterRequestStatus {
  NOT_NEEDED = 'NOT_NEEDED',
  REQUESTED = 'REQUESTED',
  CONNECTED = 'CONNECTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum DeviceType {
  DESKTOP = 'DESKTOP',
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  KIOSK = 'KIOSK',
  EMBEDDED = 'EMBEDDED',
}

export enum SessionBillingStatus {
  NOT_BILLED = 'NOT_BILLED',
  READY = 'READY',
  SUBMITTED = 'SUBMITTED',
  PAID = 'PAID',
  DENIED = 'DENIED',
}

export interface TelemedicineVideoSessionRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: SessionStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface TelemedicineVideoSessionSummary {
  id: UUID;
  status: SessionStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface TelemedicineVideoSessionCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface TelemedicineVideoSessionUpdateInput {
  status?: SessionStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface TelemedicineWaitingRoomEntryRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: SessionType;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface TelemedicineWaitingRoomEntrySummary {
  id: UUID;
  status: SessionType;
  displayName: string;
  updatedAt: ISODateString;
}

export interface TelemedicineWaitingRoomEntryCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface TelemedicineWaitingRoomEntryUpdateInput {
  status?: SessionType;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface TelemedicineSessionParticipantRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: ConnectionQuality;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface TelemedicineSessionParticipantSummary {
  id: UUID;
  status: ConnectionQuality;
  displayName: string;
  updatedAt: ISODateString;
}

export interface TelemedicineSessionParticipantCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface TelemedicineSessionParticipantUpdateInput {
  status?: ConnectionQuality;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface TelemedicineSessionRecordingRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: WaitingRoomStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface TelemedicineSessionRecordingSummary {
  id: UUID;
  status: WaitingRoomStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface TelemedicineSessionRecordingCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface TelemedicineSessionRecordingUpdateInput {
  status?: WaitingRoomStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface TelemedicineChatMessageRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: RecordingConsentStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface TelemedicineChatMessageSummary {
  id: UUID;
  status: RecordingConsentStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface TelemedicineChatMessageCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface TelemedicineChatMessageUpdateInput {
  status?: RecordingConsentStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface TelemedicineConnectionMetricRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: TelehealthPlatform;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface TelemedicineConnectionMetricSummary {
  id: UUID;
  status: TelehealthPlatform;
  displayName: string;
  updatedAt: ISODateString;
}

export interface TelemedicineConnectionMetricCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface TelemedicineConnectionMetricUpdateInput {
  status?: TelehealthPlatform;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface TelemedicineInterpreterSessionRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: VirtualVisitReason;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface TelemedicineInterpreterSessionSummary {
  id: UUID;
  status: VirtualVisitReason;
  displayName: string;
  updatedAt: ISODateString;
}

export interface TelemedicineInterpreterSessionCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface TelemedicineInterpreterSessionUpdateInput {
  status?: VirtualVisitReason;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface TelemedicineAggregateRoot {
  id: UUID;
  version: number;
  tenant: TenantScoped;
  audit: Auditable;
  softDelete: SoftDelete;
  tags: string[];
  extensions: Record<string, unknown>;
}

export interface TelemedicineSearchFilter {
  query?: string;
  statuses?: SessionStatus[];
  patientId?: UUID;
  facilityId?: UUID;
  dateFrom?: ISODateString;
  dateTo?: ISODateString;
  includeDeleted?: boolean;
}

export type TelemedicineVideoSessionBulkOperation =
  | { op: 'create'; items: TelemedicineVideoSessionCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: TelemedicineVideoSessionUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type TelemedicineWaitingRoomEntryBulkOperation =
  | { op: 'create'; items: TelemedicineWaitingRoomEntryCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: TelemedicineWaitingRoomEntryUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type TelemedicineSessionParticipantBulkOperation =
  | { op: 'create'; items: TelemedicineSessionParticipantCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: TelemedicineSessionParticipantUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type TelemedicineSessionRecordingBulkOperation =
  | { op: 'create'; items: TelemedicineSessionRecordingCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: TelemedicineSessionRecordingUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type TelemedicineChatMessageBulkOperation =
  | { op: 'create'; items: TelemedicineChatMessageCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: TelemedicineChatMessageUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type TelemedicineDomainEventType =
  | 'telemedicine.video-session.created'
  | 'telemedicine.waiting-room-entry.created'
  | 'telemedicine.session-participant.created'
  | 'telemedicine.session-recording.created'
  | 'telemedicine.chat-message.created'
  | 'telemedicine.connection-metric.created'
  | 'telemedicine.interpreter-session.created'
  | 'telemedicine.video-session.updated'
  | 'telemedicine.waiting-room-entry.updated'
  | 'telemedicine.session-participant.updated'
  | 'telemedicine.session-recording.updated'
  | 'telemedicine.chat-message.updated'
  | 'telemedicine.connection-metric.updated'
  | 'telemedicine.interpreter-session.updated'
  | 'telemedicine.video-session.archived'
  | 'telemedicine.waiting-room-entry.archived'
  | 'telemedicine.session-participant.archived'
  | 'telemedicine.session-recording.archived'
  | 'telemedicine.chat-message.archived'
  | 'telemedicine.connection-metric.archived'
  | 'telemedicine.interpreter-session.archived';

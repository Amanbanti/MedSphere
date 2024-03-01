/**
 * Telemedicine DTOs for API and SDK consumers.
 */
import type { ISODateString, PaginatedResult, UUID } from '../types';
import type { SessionStatus, SessionType, ConnectionQuality, WaitingRoomStatus, RecordingConsentStatus, TelehealthPlatform, VirtualVisitReason, InterpreterRequestStatus, DeviceType, SessionBillingStatus } from '../types/telemedicine';

export interface TelemedicineVideoSessionDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface TelemedicineVideoSessionListItemDto {
  id: UUID;
  status: SessionStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type TelemedicineVideoSessionListDto = PaginatedResult<TelemedicineVideoSessionListItemDto>;

export interface TelemedicineWaitingRoomEntryDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface TelemedicineWaitingRoomEntryListItemDto {
  id: UUID;
  status: SessionType;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type TelemedicineWaitingRoomEntryListDto = PaginatedResult<TelemedicineWaitingRoomEntryListItemDto>;

export interface TelemedicineSessionParticipantDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface TelemedicineSessionParticipantListItemDto {
  id: UUID;
  status: ConnectionQuality;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type TelemedicineSessionParticipantListDto = PaginatedResult<TelemedicineSessionParticipantListItemDto>;

export interface TelemedicineSessionRecordingDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface TelemedicineSessionRecordingListItemDto {
  id: UUID;
  status: WaitingRoomStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type TelemedicineSessionRecordingListDto = PaginatedResult<TelemedicineSessionRecordingListItemDto>;

export interface TelemedicineChatMessageDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface TelemedicineChatMessageListItemDto {
  id: UUID;
  status: RecordingConsentStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type TelemedicineChatMessageListDto = PaginatedResult<TelemedicineChatMessageListItemDto>;

export interface TelemedicineConnectionMetricDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface TelemedicineConnectionMetricListItemDto {
  id: UUID;
  status: TelehealthPlatform;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type TelemedicineConnectionMetricListDto = PaginatedResult<TelemedicineConnectionMetricListItemDto>;

export interface TelemedicineInterpreterSessionDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface TelemedicineInterpreterSessionListItemDto {
  id: UUID;
  status: VirtualVisitReason;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type TelemedicineInterpreterSessionListDto = PaginatedResult<TelemedicineInterpreterSessionListItemDto>;

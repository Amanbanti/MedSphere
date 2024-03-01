/**
 * Telemedicine domain event catalog.
 */
import type { DomainEventEnvelope } from './index';
import type { UUID } from '../types';

export type TelemedicineVideoSessionCreatedPayload = {
  videoSessionId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type TelemedicineVideoSessionUpdatedPayload = {
  videoSessionId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type TelemedicineVideoSessionArchivedPayload = {
  videoSessionId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type TelemedicineWaitingRoomEntryCreatedPayload = {
  waitingRoomEntryId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type TelemedicineWaitingRoomEntryUpdatedPayload = {
  waitingRoomEntryId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type TelemedicineWaitingRoomEntryArchivedPayload = {
  waitingRoomEntryId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type TelemedicineSessionParticipantCreatedPayload = {
  sessionParticipantId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type TelemedicineSessionParticipantUpdatedPayload = {
  sessionParticipantId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type TelemedicineSessionParticipantArchivedPayload = {
  sessionParticipantId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type TelemedicineSessionRecordingCreatedPayload = {
  sessionRecordingId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type TelemedicineSessionRecordingUpdatedPayload = {
  sessionRecordingId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type TelemedicineSessionRecordingArchivedPayload = {
  sessionRecordingId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type TelemedicineChatMessageCreatedPayload = {
  chatMessageId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type TelemedicineChatMessageUpdatedPayload = {
  chatMessageId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type TelemedicineChatMessageArchivedPayload = {
  chatMessageId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type TelemedicineConnectionMetricCreatedPayload = {
  connectionMetricId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type TelemedicineConnectionMetricUpdatedPayload = {
  connectionMetricId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type TelemedicineConnectionMetricArchivedPayload = {
  connectionMetricId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type TelemedicineInterpreterSessionCreatedPayload = {
  interpreterSessionId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type TelemedicineInterpreterSessionUpdatedPayload = {
  interpreterSessionId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type TelemedicineInterpreterSessionArchivedPayload = {
  interpreterSessionId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type TelemedicineDomainEvent =
  | DomainEventEnvelope<TelemedicineVideoSessionCreatedPayload, 'telemedicine.video-session.created'>
  | DomainEventEnvelope<TelemedicineVideoSessionUpdatedPayload, 'telemedicine.video-session.updated'>
  | DomainEventEnvelope<TelemedicineVideoSessionArchivedPayload, 'telemedicine.video-session.archived'>
  | DomainEventEnvelope<TelemedicineWaitingRoomEntryCreatedPayload, 'telemedicine.waiting-room-entry.created'>
  | DomainEventEnvelope<TelemedicineWaitingRoomEntryUpdatedPayload, 'telemedicine.waiting-room-entry.updated'>
  | DomainEventEnvelope<TelemedicineWaitingRoomEntryArchivedPayload, 'telemedicine.waiting-room-entry.archived'>
  | DomainEventEnvelope<TelemedicineSessionParticipantCreatedPayload, 'telemedicine.session-participant.created'>
  | DomainEventEnvelope<TelemedicineSessionParticipantUpdatedPayload, 'telemedicine.session-participant.updated'>
  | DomainEventEnvelope<TelemedicineSessionParticipantArchivedPayload, 'telemedicine.session-participant.archived'>
  | DomainEventEnvelope<TelemedicineSessionRecordingCreatedPayload, 'telemedicine.session-recording.created'>
  | DomainEventEnvelope<TelemedicineSessionRecordingUpdatedPayload, 'telemedicine.session-recording.updated'>
  | DomainEventEnvelope<TelemedicineSessionRecordingArchivedPayload, 'telemedicine.session-recording.archived'>
  | DomainEventEnvelope<TelemedicineChatMessageCreatedPayload, 'telemedicine.chat-message.created'>
  | DomainEventEnvelope<TelemedicineChatMessageUpdatedPayload, 'telemedicine.chat-message.updated'>
  | DomainEventEnvelope<TelemedicineChatMessageArchivedPayload, 'telemedicine.chat-message.archived'>
  | DomainEventEnvelope<TelemedicineConnectionMetricCreatedPayload, 'telemedicine.connection-metric.created'>
  | DomainEventEnvelope<TelemedicineConnectionMetricUpdatedPayload, 'telemedicine.connection-metric.updated'>
  | DomainEventEnvelope<TelemedicineConnectionMetricArchivedPayload, 'telemedicine.connection-metric.archived'>
  | DomainEventEnvelope<TelemedicineInterpreterSessionCreatedPayload, 'telemedicine.interpreter-session.created'>
  | DomainEventEnvelope<TelemedicineInterpreterSessionUpdatedPayload, 'telemedicine.interpreter-session.updated'>
  | DomainEventEnvelope<TelemedicineInterpreterSessionArchivedPayload, 'telemedicine.interpreter-session.archived'>;

export const TELEMEDICINE_EVENT_TOPIC = 'medsphere.telemedicine.events.v1';

export function isTelemedicineDomainEvent(event: { eventType: string }): event is TelemedicineDomainEvent {
  return event.eventType.startsWith('telemedicine.');
}

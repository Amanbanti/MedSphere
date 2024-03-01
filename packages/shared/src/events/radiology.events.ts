/**
 * Radiology domain event catalog.
 */
import type { DomainEventEnvelope } from './index';
import type { UUID } from '../types';

export type RadiologyImagingStudyCreatedPayload = {
  imagingStudyId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type RadiologyImagingStudyUpdatedPayload = {
  imagingStudyId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type RadiologyImagingStudyArchivedPayload = {
  imagingStudyId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type RadiologyRadiologyReportCreatedPayload = {
  radiologyReportId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type RadiologyRadiologyReportUpdatedPayload = {
  radiologyReportId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type RadiologyRadiologyReportArchivedPayload = {
  radiologyReportId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type RadiologySeriesInstanceCreatedPayload = {
  seriesInstanceId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type RadiologySeriesInstanceUpdatedPayload = {
  seriesInstanceId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type RadiologySeriesInstanceArchivedPayload = {
  seriesInstanceId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type RadiologyDoseRecordCreatedPayload = {
  doseRecordId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type RadiologyDoseRecordUpdatedPayload = {
  doseRecordId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type RadiologyDoseRecordArchivedPayload = {
  doseRecordId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type RadiologyCriticalFindingCreatedPayload = {
  criticalFindingId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type RadiologyCriticalFindingUpdatedPayload = {
  criticalFindingId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type RadiologyCriticalFindingArchivedPayload = {
  criticalFindingId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type RadiologyPeerReviewCreatedPayload = {
  peerReviewId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type RadiologyPeerReviewUpdatedPayload = {
  peerReviewId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type RadiologyPeerReviewArchivedPayload = {
  peerReviewId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type RadiologyWorklistItemCreatedPayload = {
  worklistItemId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type RadiologyWorklistItemUpdatedPayload = {
  worklistItemId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type RadiologyWorklistItemArchivedPayload = {
  worklistItemId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type RadiologyDomainEvent =
  | DomainEventEnvelope<RadiologyImagingStudyCreatedPayload, 'radiology.imaging-study.created'>
  | DomainEventEnvelope<RadiologyImagingStudyUpdatedPayload, 'radiology.imaging-study.updated'>
  | DomainEventEnvelope<RadiologyImagingStudyArchivedPayload, 'radiology.imaging-study.archived'>
  | DomainEventEnvelope<RadiologyRadiologyReportCreatedPayload, 'radiology.radiology-report.created'>
  | DomainEventEnvelope<RadiologyRadiologyReportUpdatedPayload, 'radiology.radiology-report.updated'>
  | DomainEventEnvelope<RadiologyRadiologyReportArchivedPayload, 'radiology.radiology-report.archived'>
  | DomainEventEnvelope<RadiologySeriesInstanceCreatedPayload, 'radiology.series-instance.created'>
  | DomainEventEnvelope<RadiologySeriesInstanceUpdatedPayload, 'radiology.series-instance.updated'>
  | DomainEventEnvelope<RadiologySeriesInstanceArchivedPayload, 'radiology.series-instance.archived'>
  | DomainEventEnvelope<RadiologyDoseRecordCreatedPayload, 'radiology.dose-record.created'>
  | DomainEventEnvelope<RadiologyDoseRecordUpdatedPayload, 'radiology.dose-record.updated'>
  | DomainEventEnvelope<RadiologyDoseRecordArchivedPayload, 'radiology.dose-record.archived'>
  | DomainEventEnvelope<RadiologyCriticalFindingCreatedPayload, 'radiology.critical-finding.created'>
  | DomainEventEnvelope<RadiologyCriticalFindingUpdatedPayload, 'radiology.critical-finding.updated'>
  | DomainEventEnvelope<RadiologyCriticalFindingArchivedPayload, 'radiology.critical-finding.archived'>
  | DomainEventEnvelope<RadiologyPeerReviewCreatedPayload, 'radiology.peer-review.created'>
  | DomainEventEnvelope<RadiologyPeerReviewUpdatedPayload, 'radiology.peer-review.updated'>
  | DomainEventEnvelope<RadiologyPeerReviewArchivedPayload, 'radiology.peer-review.archived'>
  | DomainEventEnvelope<RadiologyWorklistItemCreatedPayload, 'radiology.worklist-item.created'>
  | DomainEventEnvelope<RadiologyWorklistItemUpdatedPayload, 'radiology.worklist-item.updated'>
  | DomainEventEnvelope<RadiologyWorklistItemArchivedPayload, 'radiology.worklist-item.archived'>;

export const RADIOLOGY_EVENT_TOPIC = 'medsphere.radiology.events.v1';

export function isRadiologyDomainEvent(event: { eventType: string }): event is RadiologyDomainEvent {
  return event.eventType.startsWith('radiology.');
}

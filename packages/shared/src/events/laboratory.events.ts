/**
 * Laboratory domain event catalog.
 */
import type { DomainEventEnvelope } from './index';
import type { UUID } from '../types';

export type LaboratoryLabOrderCreatedPayload = {
  labOrderId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type LaboratoryLabOrderUpdatedPayload = {
  labOrderId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type LaboratoryLabOrderArchivedPayload = {
  labOrderId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type LaboratoryLabPanelCreatedPayload = {
  labPanelId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type LaboratoryLabPanelUpdatedPayload = {
  labPanelId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type LaboratoryLabPanelArchivedPayload = {
  labPanelId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type LaboratoryLabTestCreatedPayload = {
  labTestId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type LaboratoryLabTestUpdatedPayload = {
  labTestId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type LaboratoryLabTestArchivedPayload = {
  labTestId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type LaboratorySpecimenCreatedPayload = {
  specimenId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type LaboratorySpecimenUpdatedPayload = {
  specimenId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type LaboratorySpecimenArchivedPayload = {
  specimenId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type LaboratoryLabResultCreatedPayload = {
  labResultId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type LaboratoryLabResultUpdatedPayload = {
  labResultId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type LaboratoryLabResultArchivedPayload = {
  labResultId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type LaboratoryCriticalValueAlertCreatedPayload = {
  criticalValueAlertId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type LaboratoryCriticalValueAlertUpdatedPayload = {
  criticalValueAlertId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type LaboratoryCriticalValueAlertArchivedPayload = {
  criticalValueAlertId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type LaboratoryQcRunCreatedPayload = {
  qcRunId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type LaboratoryQcRunUpdatedPayload = {
  qcRunId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type LaboratoryQcRunArchivedPayload = {
  qcRunId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type LaboratoryLabInstrumentCreatedPayload = {
  labInstrumentId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type LaboratoryLabInstrumentUpdatedPayload = {
  labInstrumentId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type LaboratoryLabInstrumentArchivedPayload = {
  labInstrumentId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type LaboratoryDomainEvent =
  | DomainEventEnvelope<LaboratoryLabOrderCreatedPayload, 'laboratory.lab-order.created'>
  | DomainEventEnvelope<LaboratoryLabOrderUpdatedPayload, 'laboratory.lab-order.updated'>
  | DomainEventEnvelope<LaboratoryLabOrderArchivedPayload, 'laboratory.lab-order.archived'>
  | DomainEventEnvelope<LaboratoryLabPanelCreatedPayload, 'laboratory.lab-panel.created'>
  | DomainEventEnvelope<LaboratoryLabPanelUpdatedPayload, 'laboratory.lab-panel.updated'>
  | DomainEventEnvelope<LaboratoryLabPanelArchivedPayload, 'laboratory.lab-panel.archived'>
  | DomainEventEnvelope<LaboratoryLabTestCreatedPayload, 'laboratory.lab-test.created'>
  | DomainEventEnvelope<LaboratoryLabTestUpdatedPayload, 'laboratory.lab-test.updated'>
  | DomainEventEnvelope<LaboratoryLabTestArchivedPayload, 'laboratory.lab-test.archived'>
  | DomainEventEnvelope<LaboratorySpecimenCreatedPayload, 'laboratory.specimen.created'>
  | DomainEventEnvelope<LaboratorySpecimenUpdatedPayload, 'laboratory.specimen.updated'>
  | DomainEventEnvelope<LaboratorySpecimenArchivedPayload, 'laboratory.specimen.archived'>
  | DomainEventEnvelope<LaboratoryLabResultCreatedPayload, 'laboratory.lab-result.created'>
  | DomainEventEnvelope<LaboratoryLabResultUpdatedPayload, 'laboratory.lab-result.updated'>
  | DomainEventEnvelope<LaboratoryLabResultArchivedPayload, 'laboratory.lab-result.archived'>
  | DomainEventEnvelope<LaboratoryCriticalValueAlertCreatedPayload, 'laboratory.critical-value-alert.created'>
  | DomainEventEnvelope<LaboratoryCriticalValueAlertUpdatedPayload, 'laboratory.critical-value-alert.updated'>
  | DomainEventEnvelope<LaboratoryCriticalValueAlertArchivedPayload, 'laboratory.critical-value-alert.archived'>
  | DomainEventEnvelope<LaboratoryQcRunCreatedPayload, 'laboratory.qc-run.created'>
  | DomainEventEnvelope<LaboratoryQcRunUpdatedPayload, 'laboratory.qc-run.updated'>
  | DomainEventEnvelope<LaboratoryQcRunArchivedPayload, 'laboratory.qc-run.archived'>
  | DomainEventEnvelope<LaboratoryLabInstrumentCreatedPayload, 'laboratory.lab-instrument.created'>
  | DomainEventEnvelope<LaboratoryLabInstrumentUpdatedPayload, 'laboratory.lab-instrument.updated'>
  | DomainEventEnvelope<LaboratoryLabInstrumentArchivedPayload, 'laboratory.lab-instrument.archived'>;

export const LABORATORY_EVENT_TOPIC = 'medsphere.laboratory.events.v1';

export function isLaboratoryDomainEvent(event: { eventType: string }): event is LaboratoryDomainEvent {
  return event.eventType.startsWith('laboratory.');
}

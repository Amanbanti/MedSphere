/**
 * Clinical domain event catalog.
 */
import type { DomainEventEnvelope } from './index';
import type { UUID } from '../types';

export type ClinicalEncounterCreatedPayload = {
  encounterId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type ClinicalEncounterUpdatedPayload = {
  encounterId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type ClinicalEncounterArchivedPayload = {
  encounterId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type ClinicalDiagnosisCreatedPayload = {
  diagnosisId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type ClinicalDiagnosisUpdatedPayload = {
  diagnosisId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type ClinicalDiagnosisArchivedPayload = {
  diagnosisId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type ClinicalClinicalNoteCreatedPayload = {
  clinicalNoteId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type ClinicalClinicalNoteUpdatedPayload = {
  clinicalNoteId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type ClinicalClinicalNoteArchivedPayload = {
  clinicalNoteId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type ClinicalCarePlanCreatedPayload = {
  carePlanId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type ClinicalCarePlanUpdatedPayload = {
  carePlanId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type ClinicalCarePlanArchivedPayload = {
  carePlanId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type ClinicalProblemCreatedPayload = {
  problemId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type ClinicalProblemUpdatedPayload = {
  problemId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type ClinicalProblemArchivedPayload = {
  problemId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type ClinicalProcedureCreatedPayload = {
  procedureId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type ClinicalProcedureUpdatedPayload = {
  procedureId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type ClinicalProcedureArchivedPayload = {
  procedureId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type ClinicalConsentCreatedPayload = {
  consentId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type ClinicalConsentUpdatedPayload = {
  consentId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type ClinicalConsentArchivedPayload = {
  consentId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type ClinicalReferralCreatedPayload = {
  referralId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type ClinicalReferralUpdatedPayload = {
  referralId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type ClinicalReferralArchivedPayload = {
  referralId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type ClinicalImmunizationCreatedPayload = {
  immunizationId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type ClinicalImmunizationUpdatedPayload = {
  immunizationId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type ClinicalImmunizationArchivedPayload = {
  immunizationId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type ClinicalVitalSignReadingCreatedPayload = {
  vitalSignReadingId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type ClinicalVitalSignReadingUpdatedPayload = {
  vitalSignReadingId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type ClinicalVitalSignReadingArchivedPayload = {
  vitalSignReadingId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type ClinicalDomainEvent =
  | DomainEventEnvelope<ClinicalEncounterCreatedPayload, 'clinical.encounter.created'>
  | DomainEventEnvelope<ClinicalEncounterUpdatedPayload, 'clinical.encounter.updated'>
  | DomainEventEnvelope<ClinicalEncounterArchivedPayload, 'clinical.encounter.archived'>
  | DomainEventEnvelope<ClinicalDiagnosisCreatedPayload, 'clinical.diagnosis.created'>
  | DomainEventEnvelope<ClinicalDiagnosisUpdatedPayload, 'clinical.diagnosis.updated'>
  | DomainEventEnvelope<ClinicalDiagnosisArchivedPayload, 'clinical.diagnosis.archived'>
  | DomainEventEnvelope<ClinicalClinicalNoteCreatedPayload, 'clinical.clinical-note.created'>
  | DomainEventEnvelope<ClinicalClinicalNoteUpdatedPayload, 'clinical.clinical-note.updated'>
  | DomainEventEnvelope<ClinicalClinicalNoteArchivedPayload, 'clinical.clinical-note.archived'>
  | DomainEventEnvelope<ClinicalCarePlanCreatedPayload, 'clinical.care-plan.created'>
  | DomainEventEnvelope<ClinicalCarePlanUpdatedPayload, 'clinical.care-plan.updated'>
  | DomainEventEnvelope<ClinicalCarePlanArchivedPayload, 'clinical.care-plan.archived'>
  | DomainEventEnvelope<ClinicalProblemCreatedPayload, 'clinical.problem.created'>
  | DomainEventEnvelope<ClinicalProblemUpdatedPayload, 'clinical.problem.updated'>
  | DomainEventEnvelope<ClinicalProblemArchivedPayload, 'clinical.problem.archived'>
  | DomainEventEnvelope<ClinicalProcedureCreatedPayload, 'clinical.procedure.created'>
  | DomainEventEnvelope<ClinicalProcedureUpdatedPayload, 'clinical.procedure.updated'>
  | DomainEventEnvelope<ClinicalProcedureArchivedPayload, 'clinical.procedure.archived'>
  | DomainEventEnvelope<ClinicalConsentCreatedPayload, 'clinical.consent.created'>
  | DomainEventEnvelope<ClinicalConsentUpdatedPayload, 'clinical.consent.updated'>
  | DomainEventEnvelope<ClinicalConsentArchivedPayload, 'clinical.consent.archived'>
  | DomainEventEnvelope<ClinicalReferralCreatedPayload, 'clinical.referral.created'>
  | DomainEventEnvelope<ClinicalReferralUpdatedPayload, 'clinical.referral.updated'>
  | DomainEventEnvelope<ClinicalReferralArchivedPayload, 'clinical.referral.archived'>
  | DomainEventEnvelope<ClinicalImmunizationCreatedPayload, 'clinical.immunization.created'>
  | DomainEventEnvelope<ClinicalImmunizationUpdatedPayload, 'clinical.immunization.updated'>
  | DomainEventEnvelope<ClinicalImmunizationArchivedPayload, 'clinical.immunization.archived'>
  | DomainEventEnvelope<ClinicalVitalSignReadingCreatedPayload, 'clinical.vital-sign-reading.created'>
  | DomainEventEnvelope<ClinicalVitalSignReadingUpdatedPayload, 'clinical.vital-sign-reading.updated'>
  | DomainEventEnvelope<ClinicalVitalSignReadingArchivedPayload, 'clinical.vital-sign-reading.archived'>;

export const CLINICAL_EVENT_TOPIC = 'medsphere.clinical.events.v1';

export function isClinicalDomainEvent(event: { eventType: string }): event is ClinicalDomainEvent {
  return event.eventType.startsWith('clinical.');
}

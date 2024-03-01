/**
 * Pharmacy domain event catalog.
 */
import type { DomainEventEnvelope } from './index';
import type { UUID } from '../types';

export type PharmacyMedicationCreatedPayload = {
  medicationId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type PharmacyMedicationUpdatedPayload = {
  medicationId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type PharmacyMedicationArchivedPayload = {
  medicationId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type PharmacyPrescriptionCreatedPayload = {
  prescriptionId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type PharmacyPrescriptionUpdatedPayload = {
  prescriptionId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type PharmacyPrescriptionArchivedPayload = {
  prescriptionId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type PharmacyDispenseRecordCreatedPayload = {
  dispenseRecordId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type PharmacyDispenseRecordUpdatedPayload = {
  dispenseRecordId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type PharmacyDispenseRecordArchivedPayload = {
  dispenseRecordId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type PharmacyDrugInteractionCreatedPayload = {
  drugInteractionId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type PharmacyDrugInteractionUpdatedPayload = {
  drugInteractionId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type PharmacyDrugInteractionArchivedPayload = {
  drugInteractionId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type PharmacyFormularyEntryCreatedPayload = {
  formularyEntryId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type PharmacyFormularyEntryUpdatedPayload = {
  formularyEntryId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type PharmacyFormularyEntryArchivedPayload = {
  formularyEntryId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type PharmacyInventoryLotCreatedPayload = {
  inventoryLotId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type PharmacyInventoryLotUpdatedPayload = {
  inventoryLotId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type PharmacyInventoryLotArchivedPayload = {
  inventoryLotId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type PharmacyCompoundingOrderCreatedPayload = {
  compoundingOrderId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type PharmacyCompoundingOrderUpdatedPayload = {
  compoundingOrderId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type PharmacyCompoundingOrderArchivedPayload = {
  compoundingOrderId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type PharmacyDomainEvent =
  | DomainEventEnvelope<PharmacyMedicationCreatedPayload, 'pharmacy.medication.created'>
  | DomainEventEnvelope<PharmacyMedicationUpdatedPayload, 'pharmacy.medication.updated'>
  | DomainEventEnvelope<PharmacyMedicationArchivedPayload, 'pharmacy.medication.archived'>
  | DomainEventEnvelope<PharmacyPrescriptionCreatedPayload, 'pharmacy.prescription.created'>
  | DomainEventEnvelope<PharmacyPrescriptionUpdatedPayload, 'pharmacy.prescription.updated'>
  | DomainEventEnvelope<PharmacyPrescriptionArchivedPayload, 'pharmacy.prescription.archived'>
  | DomainEventEnvelope<PharmacyDispenseRecordCreatedPayload, 'pharmacy.dispense-record.created'>
  | DomainEventEnvelope<PharmacyDispenseRecordUpdatedPayload, 'pharmacy.dispense-record.updated'>
  | DomainEventEnvelope<PharmacyDispenseRecordArchivedPayload, 'pharmacy.dispense-record.archived'>
  | DomainEventEnvelope<PharmacyDrugInteractionCreatedPayload, 'pharmacy.drug-interaction.created'>
  | DomainEventEnvelope<PharmacyDrugInteractionUpdatedPayload, 'pharmacy.drug-interaction.updated'>
  | DomainEventEnvelope<PharmacyDrugInteractionArchivedPayload, 'pharmacy.drug-interaction.archived'>
  | DomainEventEnvelope<PharmacyFormularyEntryCreatedPayload, 'pharmacy.formulary-entry.created'>
  | DomainEventEnvelope<PharmacyFormularyEntryUpdatedPayload, 'pharmacy.formulary-entry.updated'>
  | DomainEventEnvelope<PharmacyFormularyEntryArchivedPayload, 'pharmacy.formulary-entry.archived'>
  | DomainEventEnvelope<PharmacyInventoryLotCreatedPayload, 'pharmacy.inventory-lot.created'>
  | DomainEventEnvelope<PharmacyInventoryLotUpdatedPayload, 'pharmacy.inventory-lot.updated'>
  | DomainEventEnvelope<PharmacyInventoryLotArchivedPayload, 'pharmacy.inventory-lot.archived'>
  | DomainEventEnvelope<PharmacyCompoundingOrderCreatedPayload, 'pharmacy.compounding-order.created'>
  | DomainEventEnvelope<PharmacyCompoundingOrderUpdatedPayload, 'pharmacy.compounding-order.updated'>
  | DomainEventEnvelope<PharmacyCompoundingOrderArchivedPayload, 'pharmacy.compounding-order.archived'>;

export const PHARMACY_EVENT_TOPIC = 'medsphere.pharmacy.events.v1';

export function isPharmacyDomainEvent(event: { eventType: string }): event is PharmacyDomainEvent {
  return event.eventType.startsWith('pharmacy.');
}

/**
 * Billing domain event catalog.
 */
import type { DomainEventEnvelope } from './index';
import type { UUID } from '../types';

export type BillingInvoiceCreatedPayload = {
  invoiceId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type BillingInvoiceUpdatedPayload = {
  invoiceId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type BillingInvoiceArchivedPayload = {
  invoiceId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type BillingInvoiceLineItemCreatedPayload = {
  invoiceLineItemId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type BillingInvoiceLineItemUpdatedPayload = {
  invoiceLineItemId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type BillingInvoiceLineItemArchivedPayload = {
  invoiceLineItemId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type BillingClaimCreatedPayload = {
  claimId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type BillingClaimUpdatedPayload = {
  claimId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type BillingClaimArchivedPayload = {
  claimId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type BillingPaymentCreatedPayload = {
  paymentId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type BillingPaymentUpdatedPayload = {
  paymentId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type BillingPaymentArchivedPayload = {
  paymentId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type BillingAdjustmentCreatedPayload = {
  adjustmentId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type BillingAdjustmentUpdatedPayload = {
  adjustmentId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type BillingAdjustmentArchivedPayload = {
  adjustmentId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type BillingRemittanceCreatedPayload = {
  remittanceId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type BillingRemittanceUpdatedPayload = {
  remittanceId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type BillingRemittanceArchivedPayload = {
  remittanceId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type BillingFeeScheduleCreatedPayload = {
  feeScheduleId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type BillingFeeScheduleUpdatedPayload = {
  feeScheduleId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type BillingFeeScheduleArchivedPayload = {
  feeScheduleId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type BillingCopayLedgerCreatedPayload = {
  copayLedgerId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type BillingCopayLedgerUpdatedPayload = {
  copayLedgerId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type BillingCopayLedgerArchivedPayload = {
  copayLedgerId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type BillingDomainEvent =
  | DomainEventEnvelope<BillingInvoiceCreatedPayload, 'billing.invoice.created'>
  | DomainEventEnvelope<BillingInvoiceUpdatedPayload, 'billing.invoice.updated'>
  | DomainEventEnvelope<BillingInvoiceArchivedPayload, 'billing.invoice.archived'>
  | DomainEventEnvelope<BillingInvoiceLineItemCreatedPayload, 'billing.invoice-line-item.created'>
  | DomainEventEnvelope<BillingInvoiceLineItemUpdatedPayload, 'billing.invoice-line-item.updated'>
  | DomainEventEnvelope<BillingInvoiceLineItemArchivedPayload, 'billing.invoice-line-item.archived'>
  | DomainEventEnvelope<BillingClaimCreatedPayload, 'billing.claim.created'>
  | DomainEventEnvelope<BillingClaimUpdatedPayload, 'billing.claim.updated'>
  | DomainEventEnvelope<BillingClaimArchivedPayload, 'billing.claim.archived'>
  | DomainEventEnvelope<BillingPaymentCreatedPayload, 'billing.payment.created'>
  | DomainEventEnvelope<BillingPaymentUpdatedPayload, 'billing.payment.updated'>
  | DomainEventEnvelope<BillingPaymentArchivedPayload, 'billing.payment.archived'>
  | DomainEventEnvelope<BillingAdjustmentCreatedPayload, 'billing.adjustment.created'>
  | DomainEventEnvelope<BillingAdjustmentUpdatedPayload, 'billing.adjustment.updated'>
  | DomainEventEnvelope<BillingAdjustmentArchivedPayload, 'billing.adjustment.archived'>
  | DomainEventEnvelope<BillingRemittanceCreatedPayload, 'billing.remittance.created'>
  | DomainEventEnvelope<BillingRemittanceUpdatedPayload, 'billing.remittance.updated'>
  | DomainEventEnvelope<BillingRemittanceArchivedPayload, 'billing.remittance.archived'>
  | DomainEventEnvelope<BillingFeeScheduleCreatedPayload, 'billing.fee-schedule.created'>
  | DomainEventEnvelope<BillingFeeScheduleUpdatedPayload, 'billing.fee-schedule.updated'>
  | DomainEventEnvelope<BillingFeeScheduleArchivedPayload, 'billing.fee-schedule.archived'>
  | DomainEventEnvelope<BillingCopayLedgerCreatedPayload, 'billing.copay-ledger.created'>
  | DomainEventEnvelope<BillingCopayLedgerUpdatedPayload, 'billing.copay-ledger.updated'>
  | DomainEventEnvelope<BillingCopayLedgerArchivedPayload, 'billing.copay-ledger.archived'>;

export const BILLING_EVENT_TOPIC = 'medsphere.billing.events.v1';

export function isBillingDomainEvent(event: { eventType: string }): event is BillingDomainEvent {
  return event.eventType.startsWith('billing.');
}

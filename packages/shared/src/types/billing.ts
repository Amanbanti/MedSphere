/**
 * Billing domain types — MedSphere shared package.
 * @module @medsphere/shared/types/billing
 */

import type { Auditable, ISODateString, SoftDelete, TenantScoped, UUID } from './index';


export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  SUBMITTED = 'SUBMITTED',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PAID = 'PAID',
  VOID = 'VOID',
  WRITTEN_OFF = 'WRITTEN_OFF',
  DISPUTED = 'DISPUTED',
}

export enum ClaimStatus {
  DRAFT = 'DRAFT',
  READY = 'READY',
  SUBMITTED = 'SUBMITTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  PENDED = 'PENDED',
  PAID = 'PAID',
  DENIED = 'DENIED',
  APPEALED = 'APPEALED',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CHECK = 'CHECK',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  ACH = 'ACH',
  WIRE = 'WIRE',
  INSURANCE = 'INSURANCE',
  HSA = 'HSA',
  FSA = 'FSA',
}

export enum ChargeType {
  PROCEDURE = 'PROCEDURE',
  SUPPLY = 'SUPPLY',
  PHARMACY = 'PHARMACY',
  LAB = 'LAB',
  IMAGING = 'IMAGING',
  ROOM = 'ROOM',
  PROFESSIONAL = 'PROFESSIONAL',
  FACILITY = 'FACILITY',
  OTHER = 'OTHER',
}

export enum AdjustmentReason {
  CONTRACTUAL = 'CONTRACTUAL',
  CHARITY = 'CHARITY',
  BAD_DEBT = 'BAD_DEBT',
  CORRECTION = 'CORRECTION',
  INSURANCE = 'INSURANCE',
  PROMOTION = 'PROMOTION',
  OTHER = 'OTHER',
}

export enum RemittanceStatus {
  RECEIVED = 'RECEIVED',
  POSTED = 'POSTED',
  PARTIALLY_POSTED = 'PARTIALLY_POSTED',
  REJECTED = 'REJECTED',
  REVERSED = 'REVERSED',
}

export enum CopayCollectionStatus {
  NOT_COLLECTED = 'NOT_COLLECTED',
  COLLECTED = 'COLLECTED',
  WAIVED = 'WAIVED',
  DEFERRED = 'DEFERRED',
}

export enum BillingCycle {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
}

export enum FeeScheduleType {
  CPT = 'CPT',
  HCPCS = 'HCPCS',
  DRG = 'DRG',
  APC = 'APC',
  CUSTOM = 'CUSTOM',
  NEGOTIATED = 'NEGOTIATED',
}

export enum PriorAuthBillingStatus {
  NOT_REQUIRED = 'NOT_REQUIRED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  EXPIRED = 'EXPIRED',
}

export interface BillingInvoiceRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: InvoiceStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface BillingInvoiceSummary {
  id: UUID;
  status: InvoiceStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface BillingInvoiceCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface BillingInvoiceUpdateInput {
  status?: InvoiceStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface BillingInvoiceLineItemRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: ClaimStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface BillingInvoiceLineItemSummary {
  id: UUID;
  status: ClaimStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface BillingInvoiceLineItemCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface BillingInvoiceLineItemUpdateInput {
  status?: ClaimStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface BillingClaimRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: PaymentMethod;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface BillingClaimSummary {
  id: UUID;
  status: PaymentMethod;
  displayName: string;
  updatedAt: ISODateString;
}

export interface BillingClaimCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface BillingClaimUpdateInput {
  status?: PaymentMethod;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface BillingPaymentRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: ChargeType;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface BillingPaymentSummary {
  id: UUID;
  status: ChargeType;
  displayName: string;
  updatedAt: ISODateString;
}

export interface BillingPaymentCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface BillingPaymentUpdateInput {
  status?: ChargeType;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface BillingAdjustmentRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: AdjustmentReason;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface BillingAdjustmentSummary {
  id: UUID;
  status: AdjustmentReason;
  displayName: string;
  updatedAt: ISODateString;
}

export interface BillingAdjustmentCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface BillingAdjustmentUpdateInput {
  status?: AdjustmentReason;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface BillingRemittanceRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: RemittanceStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface BillingRemittanceSummary {
  id: UUID;
  status: RemittanceStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface BillingRemittanceCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface BillingRemittanceUpdateInput {
  status?: RemittanceStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface BillingFeeScheduleRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: CopayCollectionStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface BillingFeeScheduleSummary {
  id: UUID;
  status: CopayCollectionStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface BillingFeeScheduleCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface BillingFeeScheduleUpdateInput {
  status?: CopayCollectionStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface BillingCopayLedgerRecord {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: BillingCycle;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
}

export interface BillingCopayLedgerSummary {
  id: UUID;
  status: BillingCycle;
  displayName: string;
  updatedAt: ISODateString;
}

export interface BillingCopayLedgerCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface BillingCopayLedgerUpdateInput {
  status?: BillingCycle;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface BillingAggregateRoot {
  id: UUID;
  version: number;
  tenant: TenantScoped;
  audit: Auditable;
  softDelete: SoftDelete;
  tags: string[];
  extensions: Record<string, unknown>;
}

export interface BillingSearchFilter {
  query?: string;
  statuses?: InvoiceStatus[];
  patientId?: UUID;
  facilityId?: UUID;
  dateFrom?: ISODateString;
  dateTo?: ISODateString;
  includeDeleted?: boolean;
}

export type BillingInvoiceBulkOperation =
  | { op: 'create'; items: BillingInvoiceCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: BillingInvoiceUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type BillingInvoiceLineItemBulkOperation =
  | { op: 'create'; items: BillingInvoiceLineItemCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: BillingInvoiceLineItemUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type BillingClaimBulkOperation =
  | { op: 'create'; items: BillingClaimCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: BillingClaimUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type BillingPaymentBulkOperation =
  | { op: 'create'; items: BillingPaymentCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: BillingPaymentUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type BillingAdjustmentBulkOperation =
  | { op: 'create'; items: BillingAdjustmentCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: BillingAdjustmentUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type BillingDomainEventType =
  | 'billing.invoice.created'
  | 'billing.invoice-line-item.created'
  | 'billing.claim.created'
  | 'billing.payment.created'
  | 'billing.adjustment.created'
  | 'billing.remittance.created'
  | 'billing.fee-schedule.created'
  | 'billing.copay-ledger.created'
  | 'billing.invoice.updated'
  | 'billing.invoice-line-item.updated'
  | 'billing.claim.updated'
  | 'billing.payment.updated'
  | 'billing.adjustment.updated'
  | 'billing.remittance.updated'
  | 'billing.fee-schedule.updated'
  | 'billing.copay-ledger.updated'
  | 'billing.invoice.archived'
  | 'billing.invoice-line-item.archived'
  | 'billing.claim.archived'
  | 'billing.payment.archived'
  | 'billing.adjustment.archived'
  | 'billing.remittance.archived'
  | 'billing.fee-schedule.archived'
  | 'billing.copay-ledger.archived';

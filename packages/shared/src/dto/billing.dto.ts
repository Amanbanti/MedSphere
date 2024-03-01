/**
 * Billing DTOs for API and SDK consumers.
 */
import type { ISODateString, PaginatedResult, UUID } from '../types';
import type { InvoiceStatus, ClaimStatus, PaymentMethod, ChargeType, AdjustmentReason, RemittanceStatus, CopayCollectionStatus, BillingCycle, FeeScheduleType, PriorAuthBillingStatus } from '../types/billing';

export interface BillingInvoiceDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface BillingInvoiceListItemDto {
  id: UUID;
  status: InvoiceStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type BillingInvoiceListDto = PaginatedResult<BillingInvoiceListItemDto>;

export interface BillingInvoiceLineItemDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface BillingInvoiceLineItemListItemDto {
  id: UUID;
  status: ClaimStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type BillingInvoiceLineItemListDto = PaginatedResult<BillingInvoiceLineItemListItemDto>;

export interface BillingClaimDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface BillingClaimListItemDto {
  id: UUID;
  status: PaymentMethod;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type BillingClaimListDto = PaginatedResult<BillingClaimListItemDto>;

export interface BillingPaymentDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface BillingPaymentListItemDto {
  id: UUID;
  status: ChargeType;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type BillingPaymentListDto = PaginatedResult<BillingPaymentListItemDto>;

export interface BillingAdjustmentDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface BillingAdjustmentListItemDto {
  id: UUID;
  status: AdjustmentReason;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type BillingAdjustmentListDto = PaginatedResult<BillingAdjustmentListItemDto>;

export interface BillingRemittanceDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface BillingRemittanceListItemDto {
  id: UUID;
  status: RemittanceStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type BillingRemittanceListDto = PaginatedResult<BillingRemittanceListItemDto>;

export interface BillingFeeScheduleDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface BillingFeeScheduleListItemDto {
  id: UUID;
  status: CopayCollectionStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type BillingFeeScheduleListDto = PaginatedResult<BillingFeeScheduleListItemDto>;

export interface BillingCopayLedgerDto {
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface BillingCopayLedgerListItemDto {
  id: UUID;
  status: BillingCycle;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type BillingCopayLedgerListDto = PaginatedResult<BillingCopayLedgerListItemDto>;

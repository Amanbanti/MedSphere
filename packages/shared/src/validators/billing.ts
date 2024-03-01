/**
 * Billing Zod validators.
 */
import { z } from 'zod';
import { isoDateSchema, uuidSchema } from '../validators';
import {
  InvoiceStatus,
  ClaimStatus,
  PaymentMethod,
  ChargeType,
  AdjustmentReason,
  RemittanceStatus,
  CopayCollectionStatus,
  BillingCycle,
  FeeScheduleType,
  PriorAuthBillingStatus,
} from '../types/billing';

export const invoiceCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const invoiceUpdateSchema = z.object({
  status: z.nativeEnum(InvoiceStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type BillingInvoiceCreateInput = z.infer<typeof invoiceCreateSchema>;
export type BillingInvoiceUpdateInput = z.infer<typeof invoiceUpdateSchema>;

export const invoiceLineItemCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const invoiceLineItemUpdateSchema = z.object({
  status: z.nativeEnum(ClaimStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type BillingInvoiceLineItemCreateInput = z.infer<typeof invoiceLineItemCreateSchema>;
export type BillingInvoiceLineItemUpdateInput = z.infer<typeof invoiceLineItemUpdateSchema>;

export const claimCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const claimUpdateSchema = z.object({
  status: z.nativeEnum(PaymentMethod).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type BillingClaimCreateInput = z.infer<typeof claimCreateSchema>;
export type BillingClaimUpdateInput = z.infer<typeof claimUpdateSchema>;

export const paymentCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const paymentUpdateSchema = z.object({
  status: z.nativeEnum(ChargeType).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type BillingPaymentCreateInput = z.infer<typeof paymentCreateSchema>;
export type BillingPaymentUpdateInput = z.infer<typeof paymentUpdateSchema>;

export const adjustmentCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const adjustmentUpdateSchema = z.object({
  status: z.nativeEnum(AdjustmentReason).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type BillingAdjustmentCreateInput = z.infer<typeof adjustmentCreateSchema>;
export type BillingAdjustmentUpdateInput = z.infer<typeof adjustmentUpdateSchema>;

export const remittanceCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const remittanceUpdateSchema = z.object({
  status: z.nativeEnum(RemittanceStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type BillingRemittanceCreateInput = z.infer<typeof remittanceCreateSchema>;
export type BillingRemittanceUpdateInput = z.infer<typeof remittanceUpdateSchema>;

export const feeScheduleCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const feeScheduleUpdateSchema = z.object({
  status: z.nativeEnum(CopayCollectionStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type BillingFeeScheduleCreateInput = z.infer<typeof feeScheduleCreateSchema>;
export type BillingFeeScheduleUpdateInput = z.infer<typeof feeScheduleUpdateSchema>;

export const copayLedgerCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const copayLedgerUpdateSchema = z.object({
  status: z.nativeEnum(BillingCycle).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type BillingCopayLedgerCreateInput = z.infer<typeof copayLedgerCreateSchema>;
export type BillingCopayLedgerUpdateInput = z.infer<typeof copayLedgerUpdateSchema>;

export const billingSearchFilterSchema = z.object({
  query: z.string().trim().max(200).optional(),
  statuses: z.array(z.nativeEnum(InvoiceStatus)).max(20).optional(),
  patientId: uuidSchema.optional(),
  facilityId: uuidSchema.optional(),
  dateFrom: isoDateSchema.optional(),
  dateTo: isoDateSchema.optional(),
  includeDeleted: z.boolean().optional(),
});

import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateInvoiceRequestDto {
  patientId: string;
  encounterId?: string;
  totalAmountCents: number;
  paidAmountCents: number;
  metadata?: Record<string, unknown>;
}

export class ApplyInvoicePaymentRequestDto {
  patientId: string;
  encounterId?: string;
  totalAmountCents: number;
  paidAmountCents: number;
  metadata?: Record<string, unknown>;
}

export class AdjustInvoiceChargeRequestDto {
  patientId: string;
  encounterId?: string;
  totalAmountCents: number;
  paidAmountCents: number;
  metadata?: Record<string, unknown>;
}

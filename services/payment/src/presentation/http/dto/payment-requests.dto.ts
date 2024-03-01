import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class ProcessPaymentRequestDto {
  invoiceId: string;
  patientId: string;
  amountCents: number;
  currency: string;
  metadata?: Record<string, unknown>;
}

export class RefundPaymentRequestDto {
  invoiceId: string;
  patientId: string;
  amountCents: number;
  currency: string;
  metadata?: Record<string, unknown>;
}

export class ReconcilePaymentsRequestDto {
  invoiceId: string;
  patientId: string;
  amountCents: number;
  currency: string;
  metadata?: Record<string, unknown>;
}

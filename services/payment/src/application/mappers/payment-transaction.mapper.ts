import type { PaymentTransaction } from '../../domain/entities/payment-transaction.entity';

export interface PaymentTransactionDto {
  id: string;
  organizationId: string;
  invoiceId: string;
  patientId: string;
  amountCents: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  processorReference: string | null;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class PaymentTransactionMapper {
  static toDto(entity: PaymentTransaction): PaymentTransactionDto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
      invoiceId: entity.invoiceId,
      patientId: entity.patientId,
      amountCents: entity.amountCents,
      currency: entity.currency,
      method: entity.method,
      status: entity.status,
      processorReference: entity.processorReference,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}

import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { PaymentTransaction } from '../entities/payment-transaction.entity';

export interface PaymentTransactionFactoryInput {
  organizationId: UUID;
  invoiceId: UUID;
  patientId: UUID;
  amountCents: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  id?: UUID;
  now?: string;
}

export class PaymentTransactionFactory {
  static create(input: PaymentTransactionFactoryInput): PaymentTransaction {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return PaymentTransaction.register({
      id,
      organizationId: input.organizationId,
      now,
      invoiceId: input.invoiceId,
      patientId: input.patientId,
      amountCents: input.amountCents,
      currency: input.currency,
      method: input.method,
      status: input.status,
    } as Parameters<typeof PaymentTransaction.register>[0]);
  }

  static reconstitute(props: Parameters<typeof PaymentTransaction.reconstitute>[0]): PaymentTransaction {
    return PaymentTransaction.reconstitute(props);
  }

  static clone(source: PaymentTransaction, overrides: Partial<PaymentTransactionFactoryInput> = {}): PaymentTransaction {
    const snapshot = source.toSnapshot();
    return PaymentTransactionFactory.create({
      organizationId: snapshot.organizationId as UUID,
      invoiceId: (overrides.invoiceId ?? snapshot.invoiceId) as UUID,
      patientId: (overrides.patientId ?? snapshot.patientId) as UUID,
      amountCents: (overrides.amountCents ?? snapshot.amountCents) as number,
      currency: (overrides.currency ?? snapshot.currency) as string,
      method: (overrides.method ?? snapshot.method) as PaymentMethod,
      status: (overrides.status ?? snapshot.status) as PaymentStatus,
      id: overrides.id,
      now: overrides.now,
    });
  }
}

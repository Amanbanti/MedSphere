import type { UUID } from '@medsphere/shared';
import { PaymentTransactionFactory, type PaymentTransactionFactoryInput } from '../factories/payment-transaction.factory';
import { PaymentTransaction } from '../entities/payment-transaction.entity';

export class PaymentTransactionBuilder {
  private readonly input: Partial<PaymentTransactionFactoryInput> = {};

  static create(): PaymentTransactionBuilder {
    return new PaymentTransactionBuilder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

  withInvoiceId(invoiceId: UUID): this {
    this.input.invoiceId = invoiceId;
    return this;
  }

  withPatientId(patientId: UUID): this {
    this.input.patientId = patientId;
    return this;
  }

  withAmountCents(amountCents: number): this {
    this.input.amountCents = amountCents;
    return this;
  }

  withCurrency(currency: string): this {
    this.input.currency = currency;
    return this;
  }

  withMethod(method: PaymentMethod): this {
    this.input.method = method;
    return this;
  }

  withStatus(status: PaymentStatus): this {
    this.input.status = status;
    return this;
  }

  withProcessorReference(processorReference: string | null): this {
    this.input.processorReference = processorReference;
    return this;
  }

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): PaymentTransaction {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return PaymentTransactionFactory.create(this.input as PaymentTransactionFactoryInput);
  }
}

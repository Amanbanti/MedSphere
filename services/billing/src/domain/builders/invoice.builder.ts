import type { UUID } from '@medsphere/shared';
import { InvoiceFactory, type InvoiceFactoryInput } from '../factories/invoice.factory';
import { Invoice } from '../entities/invoice.entity';

export class InvoiceBuilder {
  private readonly input: Partial<InvoiceFactoryInput> = {};

  static create(): InvoiceBuilder {
    return new InvoiceBuilder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

  withPatientId(patientId: UUID): this {
    this.input.patientId = patientId;
    return this;
  }

  withEncounterId(encounterId: UUID | null): this {
    this.input.encounterId = encounterId;
    return this;
  }

  withTotalAmountCents(totalAmountCents: number): this {
    this.input.totalAmountCents = totalAmountCents;
    return this;
  }

  withPaidAmountCents(paidAmountCents: number): this {
    this.input.paidAmountCents = paidAmountCents;
    return this;
  }

  withCurrency(currency: string): this {
    this.input.currency = currency;
    return this;
  }

  withStatus(status: InvoiceStatus): this {
    this.input.status = status;
    return this;
  }

  withDueDate(dueDate: string): this {
    this.input.dueDate = dueDate;
    return this;
  }

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): Invoice {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return InvoiceFactory.create(this.input as InvoiceFactoryInput);
  }
}

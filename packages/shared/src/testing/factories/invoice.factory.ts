/**
 * MedSphere test factory for Invoice — synthetic development data builder.
 */
import type { UUID } from '../../types';

export interface InvoiceFactoryData {
  patientId: string;
  encounterId: string;
  status: string;
  totalAmount: number;
  balanceDue: string;
  dueDate: string;
  payerId: string;
  id: UUID;
  organizationId: UUID;
  createdAt: string;
  updatedAt: string;
}

export class InvoiceFactory {
  private data: Partial<InvoiceFactoryData> = {
    id: '00000000-0000-4000-8000-0007000001' as UUID,
    organizationId: '00000000-0000-4000-8000-000000000001' as UUID,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    patientId: 'invoice-patientId-001' as UUID,
    encounterId: 'invoice-encounterId-001' as UUID,
    status: 'active',
    totalAmount: 249,
    balanceDue: 'balanceDue sample',
    dueDate: '2025-01-15T10:00:00.000Z',
    payerId: 'invoice-payerId-001' as UUID,
  };

  withPatientId(value: string): this {
    this.data.patientId = value;
    return this;
  }

  withEncounterId(value: string): this {
    this.data.encounterId = value;
    return this;
  }

  withStatus(value: string): this {
    this.data.status = value;
    return this;
  }

  withTotalAmount(value: number): this {
    this.data.totalAmount = value;
    return this;
  }

  withBalanceDue(value: string): this {
    this.data.balanceDue = value;
    return this;
  }

  withDueDate(value: string): this {
    this.data.dueDate = value;
    return this;
  }

  withPayerId(value: string): this {
    this.data.payerId = value;
    return this;
  }

  build(): InvoiceFactoryData {
    return this.data as InvoiceFactoryData;
  }

  buildMany(count: number): InvoiceFactoryData[] {
    return Array.from({ length: count }, (_, i) =>
      new InvoiceFactory()
        .withPatientId(`${this.data.patientId}-${i}`)
                .withEncounterId(`${this.data.encounterId}-${i}`)
        .build(),
    );
  }

  clone(): InvoiceFactory {
    const copy = new InvoiceFactory();
    copy.data = { ...this.data };
    return copy;
  }

  toJSON(): string {
    return JSON.stringify(this.build(), null, 2);
  }
}

export const invoiceFactoryPresets = {
  preset0(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-0');
  }

  preset1(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-1');
  }

  preset2(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-2');
  }

  preset3(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-3');
  }

  preset4(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-4');
  }

  preset5(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-5');
  }

  preset6(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-6');
  }

  preset7(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-7');
  }

  preset8(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-8');
  }

  preset9(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-9');
  }

  preset10(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-10');
  }

  preset11(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-11');
  }

  preset12(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-12');
  }

  preset13(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-13');
  }

  preset14(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-14');
  }

  preset15(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-15');
  }

  preset16(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-16');
  }

  preset17(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-17');
  }

  preset18(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-18');
  }

  preset19(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-19');
  }

  preset20(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-20');
  }

  preset21(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-21');
  }

  preset22(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-22');
  }

  preset23(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-23');
  }

  preset24(): InvoiceFactory {
    return new InvoiceFactory().withPatientId('preset-24');
  }
};

export function createRandomInvoice(seed: number): InvoiceFactoryData {
  const factory = new InvoiceFactory();
  factory.withPatientId(`seed-${seed}`);
  return factory.build();
}

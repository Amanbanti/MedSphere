import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { Invoice } from '../entities/invoice.entity';

export interface InvoiceFactoryInput {
  organizationId: UUID;
  patientId: UUID;
  encounterId?: UUID | null;
  totalAmountCents: number;
  paidAmountCents: number;
  currency: string;
  status: InvoiceStatus;
  id?: UUID;
  now?: string;
}

export class InvoiceFactory {
  static create(input: InvoiceFactoryInput): Invoice {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return Invoice.register({
      id,
      organizationId: input.organizationId,
      now,
      patientId: input.patientId,
      encounterId: input.encounterId ?? null,
      totalAmountCents: input.totalAmountCents,
      paidAmountCents: input.paidAmountCents,
      currency: input.currency,
      status: input.status,
    } as Parameters<typeof Invoice.register>[0]);
  }

  static reconstitute(props: Parameters<typeof Invoice.reconstitute>[0]): Invoice {
    return Invoice.reconstitute(props);
  }

  static clone(source: Invoice, overrides: Partial<InvoiceFactoryInput> = {}): Invoice {
    const snapshot = source.toSnapshot();
    return InvoiceFactory.create({
      organizationId: snapshot.organizationId as UUID,
      patientId: (overrides.patientId ?? snapshot.patientId) as UUID,
      encounterId: (overrides.encounterId ?? snapshot.encounterId) as UUID | null,
      totalAmountCents: (overrides.totalAmountCents ?? snapshot.totalAmountCents) as number,
      paidAmountCents: (overrides.paidAmountCents ?? snapshot.paidAmountCents) as number,
      currency: (overrides.currency ?? snapshot.currency) as string,
      status: (overrides.status ?? snapshot.status) as InvoiceStatus,
      id: overrides.id,
      now: overrides.now,
    });
  }
}

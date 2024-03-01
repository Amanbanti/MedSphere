import type { ISODateString, UUID } from '@medsphere/shared';

export interface InvoiceLineItemProps {
  id: UUID;
  organizationId: UUID;
  invoiceId: UUID;
  description: string;
  amountCents: number;
  cptCode: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export class InvoiceLineItem {
  private readonly props: InvoiceLineItemProps;

  private constructor(props: InvoiceLineItemProps) {
    this.props = { ...props };
  }

  static create(props: InvoiceLineItemProps): InvoiceLineItem {
    return new InvoiceLineItem(props);
  }

  static record(input: Omit<InvoiceLineItemProps, 'createdAt' | 'updatedAt'> & { now: ISODateString }): InvoiceLineItem {
    return new InvoiceLineItem({
      ...input,
      createdAt: input.now,
      updatedAt: input.now,
    });
  }

  get invoiceId(): UUID {
    return this.props.invoiceId;
  }

  get description(): string {
    return this.props.description;
  }

  get amountCents(): number {
    return this.props.amountCents;
  }

  get cptCode(): string | null {
    return this.props.cptCode;
  }

  get id(): UUID {
    return this.props.id;
  }

  get organizationId(): UUID {
    return this.props.organizationId;
  }

  toProps(): InvoiceLineItemProps {
    return { ...this.props };
  }
}

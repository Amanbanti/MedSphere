import type { ISODateString, UUID } from '@medsphere/shared';
import { InvoiceStatus } from '../enums/billing.enums';
import { ConflictError, InvalidStateError } from '../errors/billing.errors';

export interface InvoiceProps {
  id: UUID;
  organizationId: UUID;
  patientId: UUID;
  encounterId: UUID | null;
  totalAmountCents: number;
  paidAmountCents: number;
  currency: string;
  status: InvoiceStatus;
  dueDate: ISODateString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class Invoice {
  private readonly props: InvoiceProps;

  private constructor(props: InvoiceProps) {
    this.props = { ...props };
  }

  static create(props: InvoiceProps): Invoice {
    return new Invoice(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
    patientId: UUID;
    encounterId: UUID | null;
    totalAmountCents: number;
    paidAmountCents: number;
    currency: string;
    status: InvoiceStatus;
    dueDate: ISODateString;
  }): Invoice {
    return new Invoice({
      id: input.id,
      organizationId: input.organizationId,
      patientId: input.patientId,
      encounterId: input.encounterId ?? null,
      totalAmountCents: input.totalAmountCents,
      paidAmountCents: input.paidAmountCents,
      currency: input.currency,
      status: input.status,
      dueDate: input.dueDate,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get patientId(): UUID {
    return this.props.patientId;
  }

  get encounterId(): UUID | null {
    return this.props.encounterId;
  }

  get totalAmountCents(): number {
    return this.props.totalAmountCents;
  }

  get paidAmountCents(): number {
    return this.props.paidAmountCents;
  }

  get currency(): string {
    return this.props.currency;
  }

  get status(): InvoiceStatus {
    return this.props.status;
  }

  get dueDate(): ISODateString {
    return this.props.dueDate;
  }

  get id(): UUID {
    return this.props.id;
  }

  get organizationId(): UUID {
    return this.props.organizationId;
  }

  get createdAt(): ISODateString {
    return this.props.createdAt;
  }

  get updatedAt(): ISODateString {
    return this.props.updatedAt;
  }

  get deletedAt(): ISODateString | null {
    return this.props.deletedAt;
  }

  get version(): number {
    return this.props.version;
  }

  isDeleted(): boolean {
    return this.props.deletedAt !== null;
  }

  assertActive(): void {
    if (this.isDeleted()) {
      throw new InvalidStateError('Invoice has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('Invoice is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): InvoiceProps {
    return { ...this.props };
  }

  applyPayment(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["patientId","encounterId","totalAmountCents","paidAmountCents","currency","status","dueDate"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  adjustCharge(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["patientId","encounterId","totalAmountCents","paidAmountCents","currency","status","dueDate"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }
}

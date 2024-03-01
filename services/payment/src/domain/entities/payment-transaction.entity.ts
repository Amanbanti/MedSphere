import type { ISODateString, UUID } from '@medsphere/shared';
import { PaymentMethod, PaymentStatus } from '../enums/payment.enums';
import { ConflictError, InvalidStateError } from '../errors/payment.errors';

export interface PaymentTransactionProps {
  id: UUID;
  organizationId: UUID;
  invoiceId: UUID;
  patientId: UUID;
  amountCents: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  processorReference: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class PaymentTransaction {
  private readonly props: PaymentTransactionProps;

  private constructor(props: PaymentTransactionProps) {
    this.props = { ...props };
  }

  static create(props: PaymentTransactionProps): PaymentTransaction {
    return new PaymentTransaction(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
    invoiceId: UUID;
    patientId: UUID;
    amountCents: number;
    currency: string;
    method: PaymentMethod;
    status: PaymentStatus;
    processorReference: string | null;
  }): PaymentTransaction {
    return new PaymentTransaction({
      id: input.id,
      organizationId: input.organizationId,
      invoiceId: input.invoiceId,
      patientId: input.patientId,
      amountCents: input.amountCents,
      currency: input.currency,
      method: input.method,
      status: input.status,
      processorReference: input.processorReference ?? null,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get invoiceId(): UUID {
    return this.props.invoiceId;
  }

  get patientId(): UUID {
    return this.props.patientId;
  }

  get amountCents(): number {
    return this.props.amountCents;
  }

  get currency(): string {
    return this.props.currency;
  }

  get method(): PaymentMethod {
    return this.props.method;
  }

  get status(): PaymentStatus {
    return this.props.status;
  }

  get processorReference(): string | null {
    return this.props.processorReference;
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
      throw new InvalidStateError('PaymentTransaction has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('PaymentTransaction is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): PaymentTransactionProps {
    return { ...this.props };
  }

  refund(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["invoiceId","patientId","amountCents","currency","method","status","processorReference"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  reconcile(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["invoiceId","patientId","amountCents","currency","method","status","processorReference"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }
}

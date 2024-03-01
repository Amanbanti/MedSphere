import type { ISODateString, UUID } from '@medsphere/shared';
import { PrescriptionStatus } from '../enums/prescription.enums';
import { ConflictError, InvalidStateError } from '../errors/prescription.errors';

export interface PrescriptionProps {
  id: UUID;
  organizationId: UUID;
  patientId: UUID;
  prescriberId: UUID;
  medicationName: string;
  dosage: string;
  frequency: string;
  durationDays: number;
  status: PrescriptionStatus;
  refillsRemaining: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class Prescription {
  private readonly props: PrescriptionProps;

  private constructor(props: PrescriptionProps) {
    this.props = { ...props };
  }

  static create(props: PrescriptionProps): Prescription {
    return new Prescription(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
    patientId: UUID;
    prescriberId: UUID;
    medicationName: string;
    dosage: string;
    frequency: string;
    durationDays: number;
    status: PrescriptionStatus;
    refillsRemaining: number;
  }): Prescription {
    return new Prescription({
      id: input.id,
      organizationId: input.organizationId,
      patientId: input.patientId,
      prescriberId: input.prescriberId,
      medicationName: input.medicationName,
      dosage: input.dosage,
      frequency: input.frequency,
      durationDays: input.durationDays,
      status: input.status,
      refillsRemaining: input.refillsRemaining,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get patientId(): UUID {
    return this.props.patientId;
  }

  get prescriberId(): UUID {
    return this.props.prescriberId;
  }

  get medicationName(): string {
    return this.props.medicationName;
  }

  get dosage(): string {
    return this.props.dosage;
  }

  get frequency(): string {
    return this.props.frequency;
  }

  get durationDays(): number {
    return this.props.durationDays;
  }

  get status(): PrescriptionStatus {
    return this.props.status;
  }

  get refillsRemaining(): number {
    return this.props.refillsRemaining;
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
      throw new InvalidStateError('Prescription has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('Prescription is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): PrescriptionProps {
    return { ...this.props };
  }

  renew(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["patientId","prescriberId","medicationName","dosage","frequency","durationDays","status","refillsRemaining"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  cancel(now: ISODateString, reason?: string): void {
    this.assertActive();
    this.softDelete(now);
  }

  checkInteractions(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["patientId","prescriberId","medicationName","dosage","frequency","durationDays","status","refillsRemaining"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }
}

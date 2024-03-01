import type { ISODateString, UUID, Gender } from '@medsphere/shared';
import { PatientStatus } from '../enums/patient.enums';
import { ConflictError, InvalidStateError } from '../errors/patient.errors';

export interface PatientProps {
  id: UUID;
  organizationId: UUID;
  mrn: string;
  firstName: string;
  lastName: string;
  dateOfBirth: ISODateString;
  gender: Gender;
  email: string | null;
  phone: string | null;
  bloodType: string | null;
  status: PatientStatus;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class Patient {
  private readonly props: PatientProps;

  private constructor(props: PatientProps) {
    this.props = { ...props };
  }

  static create(props: PatientProps): Patient {
    return new Patient(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
    mrn: string;
    firstName: string;
    lastName: string;
    dateOfBirth: ISODateString;
    gender: Gender;
    email: string | null;
    phone: string | null;
    bloodType: string | null;
    status: PatientStatus;
  }): Patient {
    return new Patient({
      id: input.id,
      organizationId: input.organizationId,
      mrn: input.mrn,
      firstName: input.firstName,
      lastName: input.lastName,
      dateOfBirth: input.dateOfBirth,
      gender: input.gender,
      email: input.email ?? null,
      phone: input.phone ?? null,
      bloodType: input.bloodType ?? null,
      status: input.status,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get mrn(): string {
    return this.props.mrn;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get dateOfBirth(): ISODateString {
    return this.props.dateOfBirth;
  }

  get gender(): Gender {
    return this.props.gender;
  }

  get email(): string | null {
    return this.props.email;
  }

  get phone(): string | null {
    return this.props.phone;
  }

  get bloodType(): string | null {
    return this.props.bloodType;
  }

  get status(): PatientStatus {
    return this.props.status;
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
      throw new InvalidStateError('Patient has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('Patient is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): PatientProps {
    return { ...this.props };
  }

  updateDemographics(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["mrn","firstName","lastName","dateOfBirth","gender","email","phone","bloodType","status"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  recordAllergy(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["mrn","firstName","lastName","dateOfBirth","gender","email","phone","bloodType","status"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  addVitals(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["mrn","firstName","lastName","dateOfBirth","gender","email","phone","bloodType","status"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  deactivate(now: ISODateString, reason?: string): void {
    this.assertActive();
    this.softDelete(now);
  }

  mergeRecords(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["mrn","firstName","lastName","dateOfBirth","gender","email","phone","bloodType","status"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }
}

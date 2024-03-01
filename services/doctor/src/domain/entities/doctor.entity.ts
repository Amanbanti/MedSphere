import type { ISODateString, UUID } from '@medsphere/shared';
import { DoctorStatus } from '../enums/doctor.enums';
import { ConflictError, InvalidStateError } from '../errors/doctor.errors';

export interface DoctorProps {
  id: UUID;
  organizationId: UUID;
  npi: string;
  firstName: string;
  lastName: string;
  specialty: string;
  licenseNumber: string;
  departmentId: UUID | null;
  email: string;
  phone: string | null;
  status: DoctorStatus;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class Doctor {
  private readonly props: DoctorProps;

  private constructor(props: DoctorProps) {
    this.props = { ...props };
  }

  static create(props: DoctorProps): Doctor {
    return new Doctor(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
    npi: string;
    firstName: string;
    lastName: string;
    specialty: string;
    licenseNumber: string;
    departmentId: UUID | null;
    email: string;
    phone: string | null;
    status: DoctorStatus;
  }): Doctor {
    return new Doctor({
      id: input.id,
      organizationId: input.organizationId,
      npi: input.npi,
      firstName: input.firstName,
      lastName: input.lastName,
      specialty: input.specialty,
      licenseNumber: input.licenseNumber,
      departmentId: input.departmentId ?? null,
      email: input.email,
      phone: input.phone ?? null,
      status: input.status,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get npi(): string {
    return this.props.npi;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get specialty(): string {
    return this.props.specialty;
  }

  get licenseNumber(): string {
    return this.props.licenseNumber;
  }

  get departmentId(): UUID | null {
    return this.props.departmentId;
  }

  get email(): string {
    return this.props.email;
  }

  get phone(): string | null {
    return this.props.phone;
  }

  get status(): DoctorStatus {
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
      throw new InvalidStateError('Doctor has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('Doctor is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): DoctorProps {
    return { ...this.props };
  }

  updateCredentials(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["npi","firstName","lastName","specialty","licenseNumber","departmentId","email","phone","status"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  assignDepartment(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["npi","firstName","lastName","specialty","licenseNumber","departmentId","email","phone","status"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  setAvailability(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["npi","firstName","lastName","specialty","licenseNumber","departmentId","email","phone","status"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  suspend(now: ISODateString, reason?: string): void {
    this.assertActive();
    this.softDelete(now);
  }
}

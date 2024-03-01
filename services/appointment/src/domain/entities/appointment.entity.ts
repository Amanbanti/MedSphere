import type { ISODateString, UUID, AppointmentStatus } from '@medsphere/shared';
import { ConflictError, InvalidStateError } from '../errors/appointment.errors';

export interface AppointmentProps {
  id: UUID;
  organizationId: UUID;
  patientId: UUID;
  doctorId: UUID;
  facilityId: UUID;
  scheduledAt: ISODateString;
  durationMinutes: number;
  reason: string;
  status: AppointmentStatus;
  checkInAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class Appointment {
  private readonly props: AppointmentProps;

  private constructor(props: AppointmentProps) {
    this.props = { ...props };
  }

  static create(props: AppointmentProps): Appointment {
    return new Appointment(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
    patientId: UUID;
    doctorId: UUID;
    facilityId: UUID;
    scheduledAt: ISODateString;
    durationMinutes: number;
    reason: string;
    status: AppointmentStatus;
    checkInAt: ISODateString | null;
  }): Appointment {
    return new Appointment({
      id: input.id,
      organizationId: input.organizationId,
      patientId: input.patientId,
      doctorId: input.doctorId,
      facilityId: input.facilityId,
      scheduledAt: input.scheduledAt,
      durationMinutes: input.durationMinutes,
      reason: input.reason,
      status: input.status,
      checkInAt: input.checkInAt ?? null,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get patientId(): UUID {
    return this.props.patientId;
  }

  get doctorId(): UUID {
    return this.props.doctorId;
  }

  get facilityId(): UUID {
    return this.props.facilityId;
  }

  get scheduledAt(): ISODateString {
    return this.props.scheduledAt;
  }

  get durationMinutes(): number {
    return this.props.durationMinutes;
  }

  get reason(): string {
    return this.props.reason;
  }

  get status(): AppointmentStatus {
    return this.props.status;
  }

  get checkInAt(): ISODateString | null {
    return this.props.checkInAt;
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
      throw new InvalidStateError('Appointment has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('Appointment is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): AppointmentProps {
    return { ...this.props };
  }

  reschedule(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["patientId","doctorId","facilityId","scheduledAt","durationMinutes","reason","status","checkInAt"]) {
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

  checkIn(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["patientId","doctorId","facilityId","scheduledAt","durationMinutes","reason","status","checkInAt"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }
}

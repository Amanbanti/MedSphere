import type { ISODateString, UUID } from '@medsphere/shared';
import { VideoSessionStatus } from '../enums/video-consultation.enums';
import { ConflictError, InvalidStateError } from '../errors/video-consultation.errors';

export interface VideoSessionProps {
  id: UUID;
  organizationId: UUID;
  patientId: UUID;
  providerId: UUID;
  appointmentId: UUID | null;
  roomId: string;
  status: VideoSessionStatus;
  startedAt: ISODateString | null;
  endedAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class VideoSession {
  private readonly props: VideoSessionProps;

  private constructor(props: VideoSessionProps) {
    this.props = { ...props };
  }

  static create(props: VideoSessionProps): VideoSession {
    return new VideoSession(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
    patientId: UUID;
    providerId: UUID;
    appointmentId: UUID | null;
    roomId: string;
    status: VideoSessionStatus;
    startedAt: ISODateString | null;
    endedAt: ISODateString | null;
  }): VideoSession {
    return new VideoSession({
      id: input.id,
      organizationId: input.organizationId,
      patientId: input.patientId,
      providerId: input.providerId,
      appointmentId: input.appointmentId ?? null,
      roomId: input.roomId,
      status: input.status,
      startedAt: input.startedAt ?? null,
      endedAt: input.endedAt ?? null,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get patientId(): UUID {
    return this.props.patientId;
  }

  get providerId(): UUID {
    return this.props.providerId;
  }

  get appointmentId(): UUID | null {
    return this.props.appointmentId;
  }

  get roomId(): string {
    return this.props.roomId;
  }

  get status(): VideoSessionStatus {
    return this.props.status;
  }

  get startedAt(): ISODateString | null {
    return this.props.startedAt;
  }

  get endedAt(): ISODateString | null {
    return this.props.endedAt;
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
      throw new InvalidStateError('VideoSession has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('VideoSession is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): VideoSessionProps {
    return { ...this.props };
  }

  join(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["patientId","providerId","appointmentId","roomId","status","startedAt","endedAt"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  end(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["patientId","providerId","appointmentId","roomId","status","startedAt","endedAt"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  recordMetadata(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["patientId","providerId","appointmentId","roomId","status","startedAt","endedAt"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }
}

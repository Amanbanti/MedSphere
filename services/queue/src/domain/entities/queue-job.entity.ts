import type { ISODateString, UUID } from '@medsphere/shared';
import { QueueJobStatus } from '../enums/queue.enums';
import { ConflictError, InvalidStateError } from '../errors/queue.errors';

export interface QueueJobProps {
  id: UUID;
  organizationId: UUID;
  queueName: string;
  jobType: string;
  payload: Record<string, unknown>;
  status: QueueJobStatus;
  attempts: number;
  scheduledFor: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class QueueJob {
  private readonly props: QueueJobProps;

  private constructor(props: QueueJobProps) {
    this.props = { ...props };
  }

  static create(props: QueueJobProps): QueueJob {
    return new QueueJob(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
    queueName: string;
    jobType: string;
    payload: Record<string, unknown>;
    status: QueueJobStatus;
    attempts: number;
    scheduledFor: ISODateString | null;
  }): QueueJob {
    return new QueueJob({
      id: input.id,
      organizationId: input.organizationId,
      queueName: input.queueName,
      jobType: input.jobType,
      payload: input.payload ?? {},
      status: input.status,
      attempts: input.attempts,
      scheduledFor: input.scheduledFor ?? null,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get queueName(): string {
    return this.props.queueName;
  }

  get jobType(): string {
    return this.props.jobType;
  }

  get payload(): Record<string, unknown> {
    return this.props.payload;
  }

  get status(): QueueJobStatus {
    return this.props.status;
  }

  get attempts(): number {
    return this.props.attempts;
  }

  get scheduledFor(): ISODateString | null {
    return this.props.scheduledFor;
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
      throw new InvalidStateError('QueueJob has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('QueueJob is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): QueueJobProps {
    return { ...this.props };
  }

  dequeue(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["queueName","jobType","payload","status","attempts","scheduledFor"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  acknowledge(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["queueName","jobType","payload","status","attempts","scheduledFor"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }
}

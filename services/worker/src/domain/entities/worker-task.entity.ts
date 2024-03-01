import type { ISODateString, UUID } from '@medsphere/shared';
import { WorkerTaskStatus } from '../enums/worker.enums';
import { ConflictError, InvalidStateError } from '../errors/worker.errors';

export interface WorkerTaskProps {
  id: UUID;
  organizationId: UUID;
  handlerName: string;
  jobId: UUID;
  payload: Record<string, unknown>;
  status: WorkerTaskStatus;
  startedAt: ISODateString | null;
  completedAt: ISODateString | null;
  errorMessage: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class WorkerTask {
  private readonly props: WorkerTaskProps;

  private constructor(props: WorkerTaskProps) {
    this.props = { ...props };
  }

  static create(props: WorkerTaskProps): WorkerTask {
    return new WorkerTask(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
    handlerName: string;
    jobId: UUID;
    payload: Record<string, unknown>;
    status: WorkerTaskStatus;
    startedAt: ISODateString | null;
    completedAt: ISODateString | null;
    errorMessage: string | null;
  }): WorkerTask {
    return new WorkerTask({
      id: input.id,
      organizationId: input.organizationId,
      handlerName: input.handlerName,
      jobId: input.jobId,
      payload: input.payload ?? {},
      status: input.status,
      startedAt: input.startedAt ?? null,
      completedAt: input.completedAt ?? null,
      errorMessage: input.errorMessage ?? null,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get handlerName(): string {
    return this.props.handlerName;
  }

  get jobId(): UUID {
    return this.props.jobId;
  }

  get payload(): Record<string, unknown> {
    return this.props.payload;
  }

  get status(): WorkerTaskStatus {
    return this.props.status;
  }

  get startedAt(): ISODateString | null {
    return this.props.startedAt;
  }

  get completedAt(): ISODateString | null {
    return this.props.completedAt;
  }

  get errorMessage(): string | null {
    return this.props.errorMessage;
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
      throw new InvalidStateError('WorkerTask has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('WorkerTask is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): WorkerTaskProps {
    return { ...this.props };
  }

  registerHandler(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["handlerName","jobId","payload","status","startedAt","completedAt","errorMessage"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  processJob(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["handlerName","jobId","payload","status","startedAt","completedAt","errorMessage"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  retryFailed(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["handlerName","jobId","payload","status","startedAt","completedAt","errorMessage"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }
}

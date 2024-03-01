import type { ISODateString, UUID } from '@medsphere/shared';
import { NotificationChannel, NotificationStatus } from '../enums/notification.enums';
import { ConflictError, InvalidStateError } from '../errors/notification.errors';

export interface NotificationProps {
  id: UUID;
  organizationId: UUID;
  recipientId: UUID;
  channel: NotificationChannel;
  subject: string;
  body: string;
  status: NotificationStatus;
  sentAt: ISODateString | null;
  readAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class Notification {
  private readonly props: NotificationProps;

  private constructor(props: NotificationProps) {
    this.props = { ...props };
  }

  static create(props: NotificationProps): Notification {
    return new Notification(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
    recipientId: UUID;
    channel: NotificationChannel;
    subject: string;
    body: string;
    status: NotificationStatus;
    sentAt: ISODateString | null;
    readAt: ISODateString | null;
  }): Notification {
    return new Notification({
      id: input.id,
      organizationId: input.organizationId,
      recipientId: input.recipientId,
      channel: input.channel,
      subject: input.subject,
      body: input.body,
      status: input.status,
      sentAt: input.sentAt ?? null,
      readAt: input.readAt ?? null,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get recipientId(): UUID {
    return this.props.recipientId;
  }

  get channel(): NotificationChannel {
    return this.props.channel;
  }

  get subject(): string {
    return this.props.subject;
  }

  get body(): string {
    return this.props.body;
  }

  get status(): NotificationStatus {
    return this.props.status;
  }

  get sentAt(): ISODateString | null {
    return this.props.sentAt;
  }

  get readAt(): ISODateString | null {
    return this.props.readAt;
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
      throw new InvalidStateError('Notification has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('Notification is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): NotificationProps {
    return { ...this.props };
  }

  markRead(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["recipientId","channel","subject","body","status","sentAt","readAt"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  configurePreferences(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["recipientId","channel","subject","body","status","sentAt","readAt"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }
}

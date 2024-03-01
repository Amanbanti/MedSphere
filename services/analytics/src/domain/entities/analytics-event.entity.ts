import type { ISODateString, UUID } from '@medsphere/shared';
import { ConflictError, InvalidStateError } from '../errors/analytics.errors';

export interface AnalyticsEventProps {
  id: UUID;
  organizationId: UUID;
  eventType: string;
  source: string;
  payload: Record<string, unknown>;
  occurredAt: ISODateString;
  actorId: UUID | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class AnalyticsEvent {
  private readonly props: AnalyticsEventProps;

  private constructor(props: AnalyticsEventProps) {
    this.props = { ...props };
  }

  static create(props: AnalyticsEventProps): AnalyticsEvent {
    return new AnalyticsEvent(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
    eventType: string;
    source: string;
    payload: Record<string, unknown>;
    occurredAt: ISODateString;
    actorId: UUID | null;
  }): AnalyticsEvent {
    return new AnalyticsEvent({
      id: input.id,
      organizationId: input.organizationId,
      eventType: input.eventType,
      source: input.source,
      payload: input.payload ?? {},
      occurredAt: input.occurredAt,
      actorId: input.actorId ?? null,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get eventType(): string {
    return this.props.eventType;
  }

  get source(): string {
    return this.props.source;
  }

  get payload(): Record<string, unknown> {
    return this.props.payload;
  }

  get occurredAt(): ISODateString {
    return this.props.occurredAt;
  }

  get actorId(): UUID | null {
    return this.props.actorId;
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
      throw new InvalidStateError('AnalyticsEvent has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('AnalyticsEvent is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): AnalyticsEventProps {
    return { ...this.props };
  }

  generateReport(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["eventType","source","payload","occurredAt","actorId"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  exportData(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["eventType","source","payload","occurredAt","actorId"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }
}

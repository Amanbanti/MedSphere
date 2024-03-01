import type { ISODateString, UUID, AuditOutcome } from '@medsphere/shared';
import { ConflictError, InvalidStateError } from '../errors/audit.errors';

export interface AuditEntryProps {
  id: UUID;
  organizationId: UUID;
  actorId: UUID | null;
  action: string;
  resourceType: string;
  resourceId: string;
  outcome: AuditOutcome;
  metadata: Record<string, unknown>;
  occurredAt: ISODateString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class AuditEntry {
  private readonly props: AuditEntryProps;

  private constructor(props: AuditEntryProps) {
    this.props = { ...props };
  }

  static create(props: AuditEntryProps): AuditEntry {
    return new AuditEntry(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
    actorId: UUID | null;
    action: string;
    resourceType: string;
    resourceId: string;
    outcome: AuditOutcome;
    metadata: Record<string, unknown>;
    occurredAt: ISODateString;
  }): AuditEntry {
    return new AuditEntry({
      id: input.id,
      organizationId: input.organizationId,
      actorId: input.actorId ?? null,
      action: input.action,
      resourceType: input.resourceType,
      resourceId: input.resourceId,
      outcome: input.outcome,
      metadata: input.metadata ?? {},
      occurredAt: input.occurredAt,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get actorId(): UUID | null {
    return this.props.actorId;
  }

  get action(): string {
    return this.props.action;
  }

  get resourceType(): string {
    return this.props.resourceType;
  }

  get resourceId(): string {
    return this.props.resourceId;
  }

  get outcome(): AuditOutcome {
    return this.props.outcome;
  }

  get metadata(): Record<string, unknown> {
    return this.props.metadata;
  }

  get occurredAt(): ISODateString {
    return this.props.occurredAt;
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
      throw new InvalidStateError('AuditEntry has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('AuditEntry is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): AuditEntryProps {
    return { ...this.props };
  }

  export(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["actorId","action","resourceType","resourceId","outcome","metadata","occurredAt"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }
}

import type { ISODateString, UUID } from '@medsphere/shared';
import { LabPriority, LabOrderStatus } from '../enums/laboratory.enums';
import { ConflictError, InvalidStateError } from '../errors/laboratory.errors';

export interface LabOrderProps {
  id: UUID;
  organizationId: UUID;
  patientId: UUID;
  orderingProviderId: UUID;
  testCode: string;
  testName: string;
  priority: LabPriority;
  status: LabOrderStatus;
  collectedAt: ISODateString | null;
  resultValue: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class LabOrder {
  private readonly props: LabOrderProps;

  private constructor(props: LabOrderProps) {
    this.props = { ...props };
  }

  static create(props: LabOrderProps): LabOrder {
    return new LabOrder(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
    patientId: UUID;
    orderingProviderId: UUID;
    testCode: string;
    testName: string;
    priority: LabPriority;
    status: LabOrderStatus;
    collectedAt: ISODateString | null;
    resultValue: string | null;
  }): LabOrder {
    return new LabOrder({
      id: input.id,
      organizationId: input.organizationId,
      patientId: input.patientId,
      orderingProviderId: input.orderingProviderId,
      testCode: input.testCode,
      testName: input.testName,
      priority: input.priority,
      status: input.status,
      collectedAt: input.collectedAt ?? null,
      resultValue: input.resultValue ?? null,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get patientId(): UUID {
    return this.props.patientId;
  }

  get orderingProviderId(): UUID {
    return this.props.orderingProviderId;
  }

  get testCode(): string {
    return this.props.testCode;
  }

  get testName(): string {
    return this.props.testName;
  }

  get priority(): LabPriority {
    return this.props.priority;
  }

  get status(): LabOrderStatus {
    return this.props.status;
  }

  get collectedAt(): ISODateString | null {
    return this.props.collectedAt;
  }

  get resultValue(): string | null {
    return this.props.resultValue;
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
      throw new InvalidStateError('LabOrder has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('LabOrder is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): LabOrderProps {
    return { ...this.props };
  }

  collectSample(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["patientId","orderingProviderId","testCode","testName","priority","status","collectedAt","resultValue"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  reportResult(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["patientId","orderingProviderId","testCode","testName","priority","status","collectedAt","resultValue"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }
}

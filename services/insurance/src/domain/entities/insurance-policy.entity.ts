import type { ISODateString, UUID } from '@medsphere/shared';
import { PolicyStatus } from '../enums/insurance.enums';
import { ConflictError, InvalidStateError } from '../errors/insurance.errors';

export interface InsurancePolicyProps {
  id: UUID;
  organizationId: UUID;
  patientId: UUID;
  payerId: string;
  policyNumber: string;
  groupNumber: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  status: PolicyStatus;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class InsurancePolicy {
  private readonly props: InsurancePolicyProps;

  private constructor(props: InsurancePolicyProps) {
    this.props = { ...props };
  }

  static create(props: InsurancePolicyProps): InsurancePolicy {
    return new InsurancePolicy(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
    patientId: UUID;
    payerId: string;
    policyNumber: string;
    groupNumber: string | null;
    effectiveFrom: ISODateString;
    effectiveTo: ISODateString | null;
    status: PolicyStatus;
  }): InsurancePolicy {
    return new InsurancePolicy({
      id: input.id,
      organizationId: input.organizationId,
      patientId: input.patientId,
      payerId: input.payerId,
      policyNumber: input.policyNumber,
      groupNumber: input.groupNumber ?? null,
      effectiveFrom: input.effectiveFrom,
      effectiveTo: input.effectiveTo ?? null,
      status: input.status,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get patientId(): UUID {
    return this.props.patientId;
  }

  get payerId(): string {
    return this.props.payerId;
  }

  get policyNumber(): string {
    return this.props.policyNumber;
  }

  get groupNumber(): string | null {
    return this.props.groupNumber;
  }

  get effectiveFrom(): ISODateString {
    return this.props.effectiveFrom;
  }

  get effectiveTo(): ISODateString | null {
    return this.props.effectiveTo;
  }

  get status(): PolicyStatus {
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
      throw new InvalidStateError('InsurancePolicy has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('InsurancePolicy is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): InsurancePolicyProps {
    return { ...this.props };
  }

  verifyCoverage(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["patientId","payerId","policyNumber","groupNumber","effectiveFrom","effectiveTo","status"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  submitClaim(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["patientId","payerId","policyNumber","groupNumber","effectiveFrom","effectiveTo","status"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  updatePolicy(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["patientId","payerId","policyNumber","groupNumber","effectiveFrom","effectiveTo","status"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }
}

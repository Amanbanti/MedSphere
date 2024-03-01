import type { ISODateString, UUID } from '@medsphere/shared';
import { RadiologyStatus } from '../enums/radiology.enums';
import { ConflictError, InvalidStateError } from '../errors/radiology.errors';

export interface RadiologyStudyProps {
  id: UUID;
  organizationId: UUID;
  patientId: UUID;
  modality: string;
  bodyPart: string;
  scheduledAt: ISODateString;
  status: RadiologyStatus;
  findings: string | null;
  reportedBy: UUID | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class RadiologyStudy {
  private readonly props: RadiologyStudyProps;

  private constructor(props: RadiologyStudyProps) {
    this.props = { ...props };
  }

  static create(props: RadiologyStudyProps): RadiologyStudy {
    return new RadiologyStudy(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
    patientId: UUID;
    modality: string;
    bodyPart: string;
    scheduledAt: ISODateString;
    status: RadiologyStatus;
    findings: string | null;
    reportedBy: UUID | null;
  }): RadiologyStudy {
    return new RadiologyStudy({
      id: input.id,
      organizationId: input.organizationId,
      patientId: input.patientId,
      modality: input.modality,
      bodyPart: input.bodyPart,
      scheduledAt: input.scheduledAt,
      status: input.status,
      findings: input.findings ?? null,
      reportedBy: input.reportedBy ?? null,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get patientId(): UUID {
    return this.props.patientId;
  }

  get modality(): string {
    return this.props.modality;
  }

  get bodyPart(): string {
    return this.props.bodyPart;
  }

  get scheduledAt(): ISODateString {
    return this.props.scheduledAt;
  }

  get status(): RadiologyStatus {
    return this.props.status;
  }

  get findings(): string | null {
    return this.props.findings;
  }

  get reportedBy(): UUID | null {
    return this.props.reportedBy;
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
      throw new InvalidStateError('RadiologyStudy has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('RadiologyStudy is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): RadiologyStudyProps {
    return { ...this.props };
  }

  acquireImages(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["patientId","modality","bodyPart","scheduledAt","status","findings","reportedBy"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  reportFindings(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["patientId","modality","bodyPart","scheduledAt","status","findings","reportedBy"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }
}

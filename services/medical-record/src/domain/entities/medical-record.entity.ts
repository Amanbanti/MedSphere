import type { ISODateString, UUID } from '@medsphere/shared';
import { MedicalRecordType, RecordStatus } from '../enums/medical-record.enums';
import { ConflictError, InvalidStateError } from '../errors/medical-record.errors';

export interface MedicalRecordProps {
  id: UUID;
  organizationId: UUID;
  patientId: UUID;
  encounterId: UUID | null;
  recordType: MedicalRecordType;
  title: string;
  summary: string;
  status: RecordStatus;
  signedAt: ISODateString | null;
  signedBy: UUID | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class MedicalRecord {
  private readonly props: MedicalRecordProps;

  private constructor(props: MedicalRecordProps) {
    this.props = { ...props };
  }

  static create(props: MedicalRecordProps): MedicalRecord {
    return new MedicalRecord(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
    patientId: UUID;
    encounterId: UUID | null;
    recordType: MedicalRecordType;
    title: string;
    summary: string;
    status: RecordStatus;
    signedAt: ISODateString | null;
    signedBy: UUID | null;
  }): MedicalRecord {
    return new MedicalRecord({
      id: input.id,
      organizationId: input.organizationId,
      patientId: input.patientId,
      encounterId: input.encounterId ?? null,
      recordType: input.recordType,
      title: input.title,
      summary: input.summary,
      status: input.status ?? {},
      signedAt: input.signedAt ?? null,
      signedBy: input.signedBy ?? null,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get patientId(): UUID {
    return this.props.patientId;
  }

  get encounterId(): UUID | null {
    return this.props.encounterId;
  }

  get recordType(): MedicalRecordType {
    return this.props.recordType;
  }

  get title(): string {
    return this.props.title;
  }

  get summary(): string {
    return this.props.summary;
  }

  get status(): RecordStatus {
    return this.props.status;
  }

  get signedAt(): ISODateString | null {
    return this.props.signedAt;
  }

  get signedBy(): UUID | null {
    return this.props.signedBy;
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
      throw new InvalidStateError('MedicalRecord has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('MedicalRecord is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): MedicalRecordProps {
    return { ...this.props };
  }

  addNote(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["patientId","encounterId","recordType","title","summary","status","signedAt","signedBy"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  attachDocument(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["patientId","encounterId","recordType","title","summary","status","signedAt","signedBy"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  sign(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["patientId","encounterId","recordType","title","summary","status","signedAt","signedBy"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }
}

import type { ISODateString, UUID } from '@medsphere/shared';
import { ImagingStatus } from '../enums/imaging.enums';
import { ConflictError, InvalidStateError } from '../errors/imaging.errors';

export interface ImagingStudyProps {
  id: UUID;
  organizationId: UUID;
  studyInstanceUid: string;
  patientId: UUID;
  modality: string;
  seriesCount: number;
  storagePath: string;
  status: ImagingStatus;
  archivedAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class ImagingStudy {
  private readonly props: ImagingStudyProps;

  private constructor(props: ImagingStudyProps) {
    this.props = { ...props };
  }

  static create(props: ImagingStudyProps): ImagingStudy {
    return new ImagingStudy(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
    studyInstanceUid: string;
    patientId: UUID;
    modality: string;
    seriesCount: number;
    storagePath: string;
    status: ImagingStatus;
    archivedAt: ISODateString | null;
  }): ImagingStudy {
    return new ImagingStudy({
      id: input.id,
      organizationId: input.organizationId,
      studyInstanceUid: input.studyInstanceUid,
      patientId: input.patientId,
      modality: input.modality,
      seriesCount: input.seriesCount,
      storagePath: input.storagePath,
      status: input.status,
      archivedAt: input.archivedAt ?? null,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get studyInstanceUid(): string {
    return this.props.studyInstanceUid;
  }

  get patientId(): UUID {
    return this.props.patientId;
  }

  get modality(): string {
    return this.props.modality;
  }

  get seriesCount(): number {
    return this.props.seriesCount;
  }

  get storagePath(): string {
    return this.props.storagePath;
  }

  get status(): ImagingStatus {
    return this.props.status;
  }

  get archivedAt(): ISODateString | null {
    return this.props.archivedAt;
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
      throw new InvalidStateError('ImagingStudy has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('ImagingStudy is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): ImagingStudyProps {
    return { ...this.props };
  }

  annotate(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["studyInstanceUid","patientId","modality","seriesCount","storagePath","status","archivedAt"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  archive(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["studyInstanceUid","patientId","modality","seriesCount","storagePath","status","archivedAt"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }
}

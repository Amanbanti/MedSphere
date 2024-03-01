import type { UUID } from '@medsphere/shared';
import { ImagingStudyFactory, type ImagingStudyFactoryInput } from '../factories/imaging-study.factory';
import { ImagingStudy } from '../entities/imaging-study.entity';

export class ImagingStudyBuilder {
  private readonly input: Partial<ImagingStudyFactoryInput> = {};

  static create(): ImagingStudyBuilder {
    return new ImagingStudyBuilder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

  withStudyInstanceUid(studyInstanceUid: string): this {
    this.input.studyInstanceUid = studyInstanceUid;
    return this;
  }

  withPatientId(patientId: UUID): this {
    this.input.patientId = patientId;
    return this;
  }

  withModality(modality: string): this {
    this.input.modality = modality;
    return this;
  }

  withSeriesCount(seriesCount: number): this {
    this.input.seriesCount = seriesCount;
    return this;
  }

  withStoragePath(storagePath: string): this {
    this.input.storagePath = storagePath;
    return this;
  }

  withStatus(status: ImagingStatus): this {
    this.input.status = status;
    return this;
  }

  withArchivedAt(archivedAt: string | null): this {
    this.input.archivedAt = archivedAt;
    return this;
  }

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): ImagingStudy {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return ImagingStudyFactory.create(this.input as ImagingStudyFactoryInput);
  }
}

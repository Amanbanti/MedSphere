import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { ImagingStudy } from '../entities/imaging-study.entity';

export interface ImagingStudyFactoryInput {
  organizationId: UUID;
  studyInstanceUid: string;
  patientId: UUID;
  modality: string;
  seriesCount: number;
  storagePath: string;
  status: ImagingStatus;
  id?: UUID;
  now?: string;
}

export class ImagingStudyFactory {
  static create(input: ImagingStudyFactoryInput): ImagingStudy {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return ImagingStudy.register({
      id,
      organizationId: input.organizationId,
      now,
      studyInstanceUid: input.studyInstanceUid,
      patientId: input.patientId,
      modality: input.modality,
      seriesCount: input.seriesCount,
      storagePath: input.storagePath,
      status: input.status,
    } as Parameters<typeof ImagingStudy.register>[0]);
  }

  static reconstitute(props: Parameters<typeof ImagingStudy.reconstitute>[0]): ImagingStudy {
    return ImagingStudy.reconstitute(props);
  }

  static clone(source: ImagingStudy, overrides: Partial<ImagingStudyFactoryInput> = {}): ImagingStudy {
    const snapshot = source.toSnapshot();
    return ImagingStudyFactory.create({
      organizationId: snapshot.organizationId as UUID,
      studyInstanceUid: (overrides.studyInstanceUid ?? snapshot.studyInstanceUid) as string,
      patientId: (overrides.patientId ?? snapshot.patientId) as UUID,
      modality: (overrides.modality ?? snapshot.modality) as string,
      seriesCount: (overrides.seriesCount ?? snapshot.seriesCount) as number,
      storagePath: (overrides.storagePath ?? snapshot.storagePath) as string,
      status: (overrides.status ?? snapshot.status) as ImagingStatus,
      id: overrides.id,
      now: overrides.now,
    });
  }
}

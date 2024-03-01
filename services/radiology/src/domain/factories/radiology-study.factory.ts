import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { RadiologyStudy } from '../entities/radiology-study.entity';

export interface RadiologyStudyFactoryInput {
  organizationId: UUID;
  patientId: UUID;
  modality: string;
  bodyPart: string;
  scheduledAt: string;
  status: RadiologyStatus;
  findings?: string | null;
  id?: UUID;
  now?: string;
}

export class RadiologyStudyFactory {
  static create(input: RadiologyStudyFactoryInput): RadiologyStudy {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return RadiologyStudy.register({
      id,
      organizationId: input.organizationId,
      now,
      patientId: input.patientId,
      modality: input.modality,
      bodyPart: input.bodyPart,
      scheduledAt: input.scheduledAt,
      status: input.status,
      findings: input.findings ?? null,
    } as Parameters<typeof RadiologyStudy.register>[0]);
  }

  static reconstitute(props: Parameters<typeof RadiologyStudy.reconstitute>[0]): RadiologyStudy {
    return RadiologyStudy.reconstitute(props);
  }

  static clone(source: RadiologyStudy, overrides: Partial<RadiologyStudyFactoryInput> = {}): RadiologyStudy {
    const snapshot = source.toSnapshot();
    return RadiologyStudyFactory.create({
      organizationId: snapshot.organizationId as UUID,
      patientId: (overrides.patientId ?? snapshot.patientId) as UUID,
      modality: (overrides.modality ?? snapshot.modality) as string,
      bodyPart: (overrides.bodyPart ?? snapshot.bodyPart) as string,
      scheduledAt: (overrides.scheduledAt ?? snapshot.scheduledAt) as string,
      status: (overrides.status ?? snapshot.status) as RadiologyStatus,
      findings: (overrides.findings ?? snapshot.findings) as string | null,
      id: overrides.id,
      now: overrides.now,
    });
  }
}

import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { MedicalRecord } from '../entities/medical-record.entity';

export interface MedicalRecordFactoryInput {
  organizationId: UUID;
  patientId: UUID;
  encounterId?: UUID | null;
  recordType: MedicalRecordType;
  title: string;
  summary: string;
  status: RecordStatus;
  id?: UUID;
  now?: string;
}

export class MedicalRecordFactory {
  static create(input: MedicalRecordFactoryInput): MedicalRecord {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return MedicalRecord.register({
      id,
      organizationId: input.organizationId,
      now,
      patientId: input.patientId,
      encounterId: input.encounterId ?? null,
      recordType: input.recordType,
      title: input.title,
      summary: input.summary,
      status: input.status,
    } as Parameters<typeof MedicalRecord.register>[0]);
  }

  static reconstitute(props: Parameters<typeof MedicalRecord.reconstitute>[0]): MedicalRecord {
    return MedicalRecord.reconstitute(props);
  }

  static clone(source: MedicalRecord, overrides: Partial<MedicalRecordFactoryInput> = {}): MedicalRecord {
    const snapshot = source.toSnapshot();
    return MedicalRecordFactory.create({
      organizationId: snapshot.organizationId as UUID,
      patientId: (overrides.patientId ?? snapshot.patientId) as UUID,
      encounterId: (overrides.encounterId ?? snapshot.encounterId) as UUID | null,
      recordType: (overrides.recordType ?? snapshot.recordType) as MedicalRecordType,
      title: (overrides.title ?? snapshot.title) as string,
      summary: (overrides.summary ?? snapshot.summary) as string,
      status: (overrides.status ?? snapshot.status) as RecordStatus,
      id: overrides.id,
      now: overrides.now,
    });
  }
}

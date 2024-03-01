import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { Prescription } from '../entities/prescription.entity';

export interface PrescriptionFactoryInput {
  organizationId: UUID;
  patientId: UUID;
  prescriberId: UUID;
  medicationName: string;
  dosage: string;
  frequency: string;
  durationDays: number;
  id?: UUID;
  now?: string;
}

export class PrescriptionFactory {
  static create(input: PrescriptionFactoryInput): Prescription {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return Prescription.register({
      id,
      organizationId: input.organizationId,
      now,
      patientId: input.patientId,
      prescriberId: input.prescriberId,
      medicationName: input.medicationName,
      dosage: input.dosage,
      frequency: input.frequency,
      durationDays: input.durationDays,
    } as Parameters<typeof Prescription.register>[0]);
  }

  static reconstitute(props: Parameters<typeof Prescription.reconstitute>[0]): Prescription {
    return Prescription.reconstitute(props);
  }

  static clone(source: Prescription, overrides: Partial<PrescriptionFactoryInput> = {}): Prescription {
    const snapshot = source.toSnapshot();
    return PrescriptionFactory.create({
      organizationId: snapshot.organizationId as UUID,
      patientId: (overrides.patientId ?? snapshot.patientId) as UUID,
      prescriberId: (overrides.prescriberId ?? snapshot.prescriberId) as UUID,
      medicationName: (overrides.medicationName ?? snapshot.medicationName) as string,
      dosage: (overrides.dosage ?? snapshot.dosage) as string,
      frequency: (overrides.frequency ?? snapshot.frequency) as string,
      durationDays: (overrides.durationDays ?? snapshot.durationDays) as number,
      id: overrides.id,
      now: overrides.now,
    });
  }
}

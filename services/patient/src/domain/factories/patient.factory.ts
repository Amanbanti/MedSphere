import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { Patient } from '../entities/patient.entity';

export interface PatientFactoryInput {
  organizationId: UUID;
  mrn: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  email?: string | null;
  id?: UUID;
  now?: string;
}

export class PatientFactory {
  static create(input: PatientFactoryInput): Patient {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return Patient.register({
      id,
      organizationId: input.organizationId,
      now,
      mrn: input.mrn,
      firstName: input.firstName,
      lastName: input.lastName,
      dateOfBirth: input.dateOfBirth,
      gender: input.gender,
      email: input.email ?? null,
    } as Parameters<typeof Patient.register>[0]);
  }

  static reconstitute(props: Parameters<typeof Patient.reconstitute>[0]): Patient {
    return Patient.reconstitute(props);
  }

  static clone(source: Patient, overrides: Partial<PatientFactoryInput> = {}): Patient {
    const snapshot = source.toSnapshot();
    return PatientFactory.create({
      organizationId: snapshot.organizationId as UUID,
      mrn: (overrides.mrn ?? snapshot.mrn) as string,
      firstName: (overrides.firstName ?? snapshot.firstName) as string,
      lastName: (overrides.lastName ?? snapshot.lastName) as string,
      dateOfBirth: (overrides.dateOfBirth ?? snapshot.dateOfBirth) as string,
      gender: (overrides.gender ?? snapshot.gender) as Gender,
      email: (overrides.email ?? snapshot.email) as string | null,
      id: overrides.id,
      now: overrides.now,
    });
  }
}

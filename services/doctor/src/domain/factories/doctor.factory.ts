import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { Doctor } from '../entities/doctor.entity';

export interface DoctorFactoryInput {
  organizationId: UUID;
  npi: string;
  firstName: string;
  lastName: string;
  specialty: string;
  licenseNumber: string;
  departmentId?: UUID | null;
  id?: UUID;
  now?: string;
}

export class DoctorFactory {
  static create(input: DoctorFactoryInput): Doctor {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return Doctor.register({
      id,
      organizationId: input.organizationId,
      now,
      npi: input.npi,
      firstName: input.firstName,
      lastName: input.lastName,
      specialty: input.specialty,
      licenseNumber: input.licenseNumber,
      departmentId: input.departmentId ?? null,
    } as Parameters<typeof Doctor.register>[0]);
  }

  static reconstitute(props: Parameters<typeof Doctor.reconstitute>[0]): Doctor {
    return Doctor.reconstitute(props);
  }

  static clone(source: Doctor, overrides: Partial<DoctorFactoryInput> = {}): Doctor {
    const snapshot = source.toSnapshot();
    return DoctorFactory.create({
      organizationId: snapshot.organizationId as UUID,
      npi: (overrides.npi ?? snapshot.npi) as string,
      firstName: (overrides.firstName ?? snapshot.firstName) as string,
      lastName: (overrides.lastName ?? snapshot.lastName) as string,
      specialty: (overrides.specialty ?? snapshot.specialty) as string,
      licenseNumber: (overrides.licenseNumber ?? snapshot.licenseNumber) as string,
      departmentId: (overrides.departmentId ?? snapshot.departmentId) as UUID | null,
      id: overrides.id,
      now: overrides.now,
    });
  }
}

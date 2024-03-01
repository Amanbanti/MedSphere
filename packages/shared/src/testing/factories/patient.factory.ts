/**
 * MedSphere test factory for Patient — synthetic development data builder.
 */
import type { UUID } from '../../types';

export interface PatientFactoryData {
  mrn: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  bloodType: string;
  status: string;
  id: UUID;
  organizationId: UUID;
  createdAt: string;
  updatedAt: string;
}

export class PatientFactory {
  private data: Partial<PatientFactoryData> = {
    id: '00000000-0000-4000-8000-0007000001' as UUID,
    organizationId: '00000000-0000-4000-8000-000000000001' as UUID,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    mrn: 'mrn sample',
    firstName: 'firstName sample',
    lastName: 'lastName sample',
    dateOfBirth: 'dateOfBirth sample',
    gender: 'female',
    email: 'email sample',
    phone: 'phone sample',
    bloodType: 'bloodType sample',
    status: 'active',
  };

  withMrn(value: string): this {
    this.data.mrn = value;
    return this;
  }

  withFirstName(value: string): this {
    this.data.firstName = value;
    return this;
  }

  withLastName(value: string): this {
    this.data.lastName = value;
    return this;
  }

  withDateOfBirth(value: string): this {
    this.data.dateOfBirth = value;
    return this;
  }

  withGender(value: string): this {
    this.data.gender = value;
    return this;
  }

  withEmail(value: string): this {
    this.data.email = value;
    return this;
  }

  withPhone(value: string): this {
    this.data.phone = value;
    return this;
  }

  withBloodType(value: string): this {
    this.data.bloodType = value;
    return this;
  }

  withStatus(value: string): this {
    this.data.status = value;
    return this;
  }

  build(): PatientFactoryData {
    return this.data as PatientFactoryData;
  }

  buildMany(count: number): PatientFactoryData[] {
    return Array.from({ length: count }, (_, i) =>
      new PatientFactory()
        .withMrn(`${this.data.mrn}-${i}`)
                .withFirstName(`${this.data.firstName}-${i}`)
        .build(),
    );
  }

  clone(): PatientFactory {
    const copy = new PatientFactory();
    copy.data = { ...this.data };
    return copy;
  }

  toJSON(): string {
    return JSON.stringify(this.build(), null, 2);
  }
}

export const patientFactoryPresets = {
  preset0(): PatientFactory {
    return new PatientFactory().withMrn('preset-0');
  }

  preset1(): PatientFactory {
    return new PatientFactory().withMrn('preset-1');
  }

  preset2(): PatientFactory {
    return new PatientFactory().withMrn('preset-2');
  }

  preset3(): PatientFactory {
    return new PatientFactory().withMrn('preset-3');
  }

  preset4(): PatientFactory {
    return new PatientFactory().withMrn('preset-4');
  }

  preset5(): PatientFactory {
    return new PatientFactory().withMrn('preset-5');
  }

  preset6(): PatientFactory {
    return new PatientFactory().withMrn('preset-6');
  }

  preset7(): PatientFactory {
    return new PatientFactory().withMrn('preset-7');
  }

  preset8(): PatientFactory {
    return new PatientFactory().withMrn('preset-8');
  }

  preset9(): PatientFactory {
    return new PatientFactory().withMrn('preset-9');
  }

  preset10(): PatientFactory {
    return new PatientFactory().withMrn('preset-10');
  }

  preset11(): PatientFactory {
    return new PatientFactory().withMrn('preset-11');
  }

  preset12(): PatientFactory {
    return new PatientFactory().withMrn('preset-12');
  }

  preset13(): PatientFactory {
    return new PatientFactory().withMrn('preset-13');
  }

  preset14(): PatientFactory {
    return new PatientFactory().withMrn('preset-14');
  }

  preset15(): PatientFactory {
    return new PatientFactory().withMrn('preset-15');
  }

  preset16(): PatientFactory {
    return new PatientFactory().withMrn('preset-16');
  }

  preset17(): PatientFactory {
    return new PatientFactory().withMrn('preset-17');
  }

  preset18(): PatientFactory {
    return new PatientFactory().withMrn('preset-18');
  }

  preset19(): PatientFactory {
    return new PatientFactory().withMrn('preset-19');
  }

  preset20(): PatientFactory {
    return new PatientFactory().withMrn('preset-20');
  }

  preset21(): PatientFactory {
    return new PatientFactory().withMrn('preset-21');
  }

  preset22(): PatientFactory {
    return new PatientFactory().withMrn('preset-22');
  }

  preset23(): PatientFactory {
    return new PatientFactory().withMrn('preset-23');
  }

  preset24(): PatientFactory {
    return new PatientFactory().withMrn('preset-24');
  }
};

export function createRandomPatient(seed: number): PatientFactoryData {
  const factory = new PatientFactory();
  factory.withMrn(`seed-${seed}`);
  return factory.build();
}

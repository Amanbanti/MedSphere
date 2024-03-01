import type { UUID } from '@medsphere/shared';
import { PatientFactory, type PatientFactoryInput } from '../factories/patient.factory';
import { Patient } from '../entities/patient.entity';

export class PatientBuilder {
  private readonly input: Partial<PatientFactoryInput> = {};

  static create(): PatientBuilder {
    return new PatientBuilder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

  withMrn(mrn: string): this {
    this.input.mrn = mrn;
    return this;
  }

  withFirstName(firstName: string): this {
    this.input.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): this {
    this.input.lastName = lastName;
    return this;
  }

  withDateOfBirth(dateOfBirth: string): this {
    this.input.dateOfBirth = dateOfBirth;
    return this;
  }

  withGender(gender: Gender): this {
    this.input.gender = gender;
    return this;
  }

  withEmail(email: string | null): this {
    this.input.email = email;
    return this;
  }

  withPhone(phone: string | null): this {
    this.input.phone = phone;
    return this;
  }

  withBloodType(bloodType: string | null): this {
    this.input.bloodType = bloodType;
    return this;
  }

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): Patient {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return PatientFactory.create(this.input as PatientFactoryInput);
  }
}

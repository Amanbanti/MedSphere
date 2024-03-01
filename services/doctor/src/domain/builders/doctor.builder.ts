import type { UUID } from '@medsphere/shared';
import { DoctorFactory, type DoctorFactoryInput } from '../factories/doctor.factory';
import { Doctor } from '../entities/doctor.entity';

export class DoctorBuilder {
  private readonly input: Partial<DoctorFactoryInput> = {};

  static create(): DoctorBuilder {
    return new DoctorBuilder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

  withNpi(npi: string): this {
    this.input.npi = npi;
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

  withSpecialty(specialty: string): this {
    this.input.specialty = specialty;
    return this;
  }

  withLicenseNumber(licenseNumber: string): this {
    this.input.licenseNumber = licenseNumber;
    return this;
  }

  withDepartmentId(departmentId: UUID | null): this {
    this.input.departmentId = departmentId;
    return this;
  }

  withEmail(email: string): this {
    this.input.email = email;
    return this;
  }

  withPhone(phone: string | null): this {
    this.input.phone = phone;
    return this;
  }

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): Doctor {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return DoctorFactory.create(this.input as DoctorFactoryInput);
  }
}

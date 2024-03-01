import type { UUID } from '@medsphere/shared';
import { PrescriptionFactory, type PrescriptionFactoryInput } from '../factories/prescription.factory';
import { Prescription } from '../entities/prescription.entity';

export class PrescriptionBuilder {
  private readonly input: Partial<PrescriptionFactoryInput> = {};

  static create(): PrescriptionBuilder {
    return new PrescriptionBuilder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

  withPatientId(patientId: UUID): this {
    this.input.patientId = patientId;
    return this;
  }

  withPrescriberId(prescriberId: UUID): this {
    this.input.prescriberId = prescriberId;
    return this;
  }

  withMedicationName(medicationName: string): this {
    this.input.medicationName = medicationName;
    return this;
  }

  withDosage(dosage: string): this {
    this.input.dosage = dosage;
    return this;
  }

  withFrequency(frequency: string): this {
    this.input.frequency = frequency;
    return this;
  }

  withDurationDays(durationDays: number): this {
    this.input.durationDays = durationDays;
    return this;
  }

  withStatus(status: PrescriptionStatus): this {
    this.input.status = status;
    return this;
  }

  withRefillsRemaining(refillsRemaining: number): this {
    this.input.refillsRemaining = refillsRemaining;
    return this;
  }

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): Prescription {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return PrescriptionFactory.create(this.input as PrescriptionFactoryInput);
  }
}

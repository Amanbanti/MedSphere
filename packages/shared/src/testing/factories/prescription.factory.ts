/**
 * MedSphere test factory for Prescription — synthetic development data builder.
 */
import type { UUID } from '../../types';

export interface PrescriptionFactoryData {
  patientId: string;
  medicationName: string;
  strength: string;
  route: string;
  frequency: string;
  quantity: number;
  refills: number;
  status: string;
  id: UUID;
  organizationId: UUID;
  createdAt: string;
  updatedAt: string;
}

export class PrescriptionFactory {
  private data: Partial<PrescriptionFactoryData> = {
    id: '00000000-0000-4000-8000-0012000001' as UUID,
    organizationId: '00000000-0000-4000-8000-000000000001' as UUID,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    patientId: 'prescription-patientId-001' as UUID,
    medicationName: 'medicationName sample',
    strength: 'strength sample',
    route: 'route sample',
    frequency: 'frequency sample',
    quantity: 972,
    refills: 885,
    status: 'active',
  };

  withPatientId(value: string): this {
    this.data.patientId = value;
    return this;
  }

  withMedicationName(value: string): this {
    this.data.medicationName = value;
    return this;
  }

  withStrength(value: string): this {
    this.data.strength = value;
    return this;
  }

  withRoute(value: string): this {
    this.data.route = value;
    return this;
  }

  withFrequency(value: string): this {
    this.data.frequency = value;
    return this;
  }

  withQuantity(value: number): this {
    this.data.quantity = value;
    return this;
  }

  withRefills(value: number): this {
    this.data.refills = value;
    return this;
  }

  withStatus(value: string): this {
    this.data.status = value;
    return this;
  }

  build(): PrescriptionFactoryData {
    return this.data as PrescriptionFactoryData;
  }

  buildMany(count: number): PrescriptionFactoryData[] {
    return Array.from({ length: count }, (_, i) =>
      new PrescriptionFactory()
        .withPatientId(`${this.data.patientId}-${i}`)
                .withMedicationName(`${this.data.medicationName}-${i}`)
        .build(),
    );
  }

  clone(): PrescriptionFactory {
    const copy = new PrescriptionFactory();
    copy.data = { ...this.data };
    return copy;
  }

  toJSON(): string {
    return JSON.stringify(this.build(), null, 2);
  }
}

export const prescriptionFactoryPresets = {
  preset0(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-0');
  }

  preset1(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-1');
  }

  preset2(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-2');
  }

  preset3(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-3');
  }

  preset4(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-4');
  }

  preset5(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-5');
  }

  preset6(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-6');
  }

  preset7(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-7');
  }

  preset8(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-8');
  }

  preset9(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-9');
  }

  preset10(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-10');
  }

  preset11(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-11');
  }

  preset12(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-12');
  }

  preset13(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-13');
  }

  preset14(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-14');
  }

  preset15(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-15');
  }

  preset16(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-16');
  }

  preset17(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-17');
  }

  preset18(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-18');
  }

  preset19(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-19');
  }

  preset20(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-20');
  }

  preset21(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-21');
  }

  preset22(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-22');
  }

  preset23(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-23');
  }

  preset24(): PrescriptionFactory {
    return new PrescriptionFactory().withPatientId('preset-24');
  }
};

export function createRandomPrescription(seed: number): PrescriptionFactoryData {
  const factory = new PrescriptionFactory();
  factory.withPatientId(`seed-${seed}`);
  return factory.build();
}

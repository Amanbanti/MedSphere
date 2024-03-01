/**
 * MedSphere test factory for LabOrder — synthetic development data builder.
 */
import type { UUID } from '../../types';

export interface LabOrderFactoryData {
  patientId: string;
  orderingProviderId: string;
  status: string;
  priority: string;
  panelCode: string;
  specimenType: string;
  id: UUID;
  organizationId: UUID;
  createdAt: string;
  updatedAt: string;
}

export class LabOrderFactory {
  private data: Partial<LabOrderFactoryData> = {
    id: '00000000-0000-4000-8000-0008000001' as UUID,
    organizationId: '00000000-0000-4000-8000-000000000001' as UUID,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    patientId: 'laborder-patientId-001' as UUID,
    orderingProviderId: 'laborder-orderingProviderId-001' as UUID,
    status: 'active',
    priority: 'priority sample',
    panelCode: 'panelCode sample',
    specimenType: 'specimenType sample',
  };

  withPatientId(value: string): this {
    this.data.patientId = value;
    return this;
  }

  withOrderingProviderId(value: string): this {
    this.data.orderingProviderId = value;
    return this;
  }

  withStatus(value: string): this {
    this.data.status = value;
    return this;
  }

  withPriority(value: string): this {
    this.data.priority = value;
    return this;
  }

  withPanelCode(value: string): this {
    this.data.panelCode = value;
    return this;
  }

  withSpecimenType(value: string): this {
    this.data.specimenType = value;
    return this;
  }

  build(): LabOrderFactoryData {
    return this.data as LabOrderFactoryData;
  }

  buildMany(count: number): LabOrderFactoryData[] {
    return Array.from({ length: count }, (_, i) =>
      new LabOrderFactory()
        .withPatientId(`${this.data.patientId}-${i}`)
                .withOrderingProviderId(`${this.data.orderingProviderId}-${i}`)
        .build(),
    );
  }

  clone(): LabOrderFactory {
    const copy = new LabOrderFactory();
    copy.data = { ...this.data };
    return copy;
  }

  toJSON(): string {
    return JSON.stringify(this.build(), null, 2);
  }
}

export const labOrderFactoryPresets = {
  preset0(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-0');
  }

  preset1(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-1');
  }

  preset2(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-2');
  }

  preset3(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-3');
  }

  preset4(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-4');
  }

  preset5(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-5');
  }

  preset6(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-6');
  }

  preset7(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-7');
  }

  preset8(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-8');
  }

  preset9(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-9');
  }

  preset10(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-10');
  }

  preset11(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-11');
  }

  preset12(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-12');
  }

  preset13(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-13');
  }

  preset14(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-14');
  }

  preset15(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-15');
  }

  preset16(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-16');
  }

  preset17(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-17');
  }

  preset18(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-18');
  }

  preset19(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-19');
  }

  preset20(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-20');
  }

  preset21(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-21');
  }

  preset22(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-22');
  }

  preset23(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-23');
  }

  preset24(): LabOrderFactory {
    return new LabOrderFactory().withPatientId('preset-24');
  }
};

export function createRandomLabOrder(seed: number): LabOrderFactoryData {
  const factory = new LabOrderFactory();
  factory.withPatientId(`seed-${seed}`);
  return factory.build();
}

/**
 * MedSphere test factory for ImagingStudy — synthetic development data builder.
 */
import type { UUID } from '../../types';

export interface ImagingStudyFactoryData {
  patientId: string;
  modality: string;
  bodyPart: string;
  status: string;
  accessionNumber: string;
  scheduledAt: string;
  id: UUID;
  organizationId: UUID;
  createdAt: string;
  updatedAt: string;
}

export class ImagingStudyFactory {
  private data: Partial<ImagingStudyFactoryData> = {
    id: '00000000-0000-4000-8000-0012000001' as UUID,
    organizationId: '00000000-0000-4000-8000-000000000001' as UUID,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    patientId: 'imagingstudy-patientId-001' as UUID,
    modality: 'modality sample',
    bodyPart: 'bodyPart sample',
    status: 'active',
    accessionNumber: 'accessionNumber sample',
    scheduledAt: '2025-01-15T10:00:00.000Z',
  };

  withPatientId(value: string): this {
    this.data.patientId = value;
    return this;
  }

  withModality(value: string): this {
    this.data.modality = value;
    return this;
  }

  withBodyPart(value: string): this {
    this.data.bodyPart = value;
    return this;
  }

  withStatus(value: string): this {
    this.data.status = value;
    return this;
  }

  withAccessionNumber(value: string): this {
    this.data.accessionNumber = value;
    return this;
  }

  withScheduledAt(value: string): this {
    this.data.scheduledAt = value;
    return this;
  }

  build(): ImagingStudyFactoryData {
    return this.data as ImagingStudyFactoryData;
  }

  buildMany(count: number): ImagingStudyFactoryData[] {
    return Array.from({ length: count }, (_, i) =>
      new ImagingStudyFactory()
        .withPatientId(`${this.data.patientId}-${i}`)
                .withModality(`${this.data.modality}-${i}`)
        .build(),
    );
  }

  clone(): ImagingStudyFactory {
    const copy = new ImagingStudyFactory();
    copy.data = { ...this.data };
    return copy;
  }

  toJSON(): string {
    return JSON.stringify(this.build(), null, 2);
  }
}

export const imagingStudyFactoryPresets = {
  preset0(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-0');
  }

  preset1(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-1');
  }

  preset2(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-2');
  }

  preset3(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-3');
  }

  preset4(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-4');
  }

  preset5(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-5');
  }

  preset6(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-6');
  }

  preset7(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-7');
  }

  preset8(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-8');
  }

  preset9(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-9');
  }

  preset10(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-10');
  }

  preset11(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-11');
  }

  preset12(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-12');
  }

  preset13(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-13');
  }

  preset14(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-14');
  }

  preset15(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-15');
  }

  preset16(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-16');
  }

  preset17(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-17');
  }

  preset18(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-18');
  }

  preset19(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-19');
  }

  preset20(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-20');
  }

  preset21(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-21');
  }

  preset22(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-22');
  }

  preset23(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-23');
  }

  preset24(): ImagingStudyFactory {
    return new ImagingStudyFactory().withPatientId('preset-24');
  }
};

export function createRandomImagingStudy(seed: number): ImagingStudyFactoryData {
  const factory = new ImagingStudyFactory();
  factory.withPatientId(`seed-${seed}`);
  return factory.build();
}

/**
 * MedSphere test factory for Encounter — synthetic development data builder.
 */
import type { UUID } from '../../types';

export interface EncounterFactoryData {
  encounterClass: string;
  status: string;
  reasonCode: string;
  periodStart: string;
  periodEnd: string;
  attendingProviderId: string;
  locationId: string;
  id: UUID;
  organizationId: UUID;
  createdAt: string;
  updatedAt: string;
}

export class EncounterFactory {
  private data: Partial<EncounterFactoryData> = {
    id: '00000000-0000-4000-8000-0009000001' as UUID,
    organizationId: '00000000-0000-4000-8000-000000000001' as UUID,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    encounterClass: 'encounterClass sample',
    status: 'active',
    reasonCode: 'reasonCode sample',
    periodStart: '2025-01-15T10:00:00.000Z',
    periodEnd: '2025-01-15T10:00:00.000Z',
    attendingProviderId: 'encounter-attendingProviderId-001' as UUID,
    locationId: 'encounter-locationId-001' as UUID,
  };

  withEncounterClass(value: string): this {
    this.data.encounterClass = value;
    return this;
  }

  withStatus(value: string): this {
    this.data.status = value;
    return this;
  }

  withReasonCode(value: string): this {
    this.data.reasonCode = value;
    return this;
  }

  withPeriodStart(value: string): this {
    this.data.periodStart = value;
    return this;
  }

  withPeriodEnd(value: string): this {
    this.data.periodEnd = value;
    return this;
  }

  withAttendingProviderId(value: string): this {
    this.data.attendingProviderId = value;
    return this;
  }

  withLocationId(value: string): this {
    this.data.locationId = value;
    return this;
  }

  build(): EncounterFactoryData {
    return this.data as EncounterFactoryData;
  }

  buildMany(count: number): EncounterFactoryData[] {
    return Array.from({ length: count }, (_, i) =>
      new EncounterFactory()
        .withEncounterClass(`${this.data.encounterClass}-${i}`)
                .withStatus(`${this.data.status}-${i}`)
        .build(),
    );
  }

  clone(): EncounterFactory {
    const copy = new EncounterFactory();
    copy.data = { ...this.data };
    return copy;
  }

  toJSON(): string {
    return JSON.stringify(this.build(), null, 2);
  }
}

export const encounterFactoryPresets = {
  preset0(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-0');
  }

  preset1(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-1');
  }

  preset2(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-2');
  }

  preset3(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-3');
  }

  preset4(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-4');
  }

  preset5(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-5');
  }

  preset6(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-6');
  }

  preset7(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-7');
  }

  preset8(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-8');
  }

  preset9(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-9');
  }

  preset10(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-10');
  }

  preset11(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-11');
  }

  preset12(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-12');
  }

  preset13(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-13');
  }

  preset14(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-14');
  }

  preset15(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-15');
  }

  preset16(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-16');
  }

  preset17(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-17');
  }

  preset18(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-18');
  }

  preset19(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-19');
  }

  preset20(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-20');
  }

  preset21(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-21');
  }

  preset22(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-22');
  }

  preset23(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-23');
  }

  preset24(): EncounterFactory {
    return new EncounterFactory().withEncounterClass('preset-24');
  }
};

export function createRandomEncounter(seed: number): EncounterFactoryData {
  const factory = new EncounterFactory();
  factory.withEncounterClass(`seed-${seed}`);
  return factory.build();
}

/**
 * MedSphere test factory for Appointment — synthetic development data builder.
 */
import type { UUID } from '../../types';

export interface AppointmentFactoryData {
  patientId: string;
  providerId: string;
  scheduledStart: string;
  scheduledEnd: string;
  appointmentType: string;
  status: string;
  locationId: string;
  id: UUID;
  organizationId: UUID;
  createdAt: string;
  updatedAt: string;
}

export class AppointmentFactory {
  private data: Partial<AppointmentFactoryData> = {
    id: '00000000-0000-4000-8000-0011000001' as UUID,
    organizationId: '00000000-0000-4000-8000-000000000001' as UUID,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    patientId: 'appointment-patientId-001' as UUID,
    providerId: 'appointment-providerId-001' as UUID,
    scheduledStart: '2025-01-15T10:00:00.000Z',
    scheduledEnd: '2025-01-15T10:00:00.000Z',
    appointmentType: 'appointmentType sample',
    status: 'active',
    locationId: 'appointment-locationId-001' as UUID,
  };

  withPatientId(value: string): this {
    this.data.patientId = value;
    return this;
  }

  withProviderId(value: string): this {
    this.data.providerId = value;
    return this;
  }

  withScheduledStart(value: string): this {
    this.data.scheduledStart = value;
    return this;
  }

  withScheduledEnd(value: string): this {
    this.data.scheduledEnd = value;
    return this;
  }

  withAppointmentType(value: string): this {
    this.data.appointmentType = value;
    return this;
  }

  withStatus(value: string): this {
    this.data.status = value;
    return this;
  }

  withLocationId(value: string): this {
    this.data.locationId = value;
    return this;
  }

  build(): AppointmentFactoryData {
    return this.data as AppointmentFactoryData;
  }

  buildMany(count: number): AppointmentFactoryData[] {
    return Array.from({ length: count }, (_, i) =>
      new AppointmentFactory()
        .withPatientId(`${this.data.patientId}-${i}`)
                .withProviderId(`${this.data.providerId}-${i}`)
        .build(),
    );
  }

  clone(): AppointmentFactory {
    const copy = new AppointmentFactory();
    copy.data = { ...this.data };
    return copy;
  }

  toJSON(): string {
    return JSON.stringify(this.build(), null, 2);
  }
}

export const appointmentFactoryPresets = {
  preset0(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-0');
  }

  preset1(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-1');
  }

  preset2(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-2');
  }

  preset3(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-3');
  }

  preset4(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-4');
  }

  preset5(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-5');
  }

  preset6(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-6');
  }

  preset7(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-7');
  }

  preset8(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-8');
  }

  preset9(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-9');
  }

  preset10(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-10');
  }

  preset11(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-11');
  }

  preset12(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-12');
  }

  preset13(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-13');
  }

  preset14(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-14');
  }

  preset15(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-15');
  }

  preset16(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-16');
  }

  preset17(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-17');
  }

  preset18(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-18');
  }

  preset19(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-19');
  }

  preset20(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-20');
  }

  preset21(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-21');
  }

  preset22(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-22');
  }

  preset23(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-23');
  }

  preset24(): AppointmentFactory {
    return new AppointmentFactory().withPatientId('preset-24');
  }
};

export function createRandomAppointment(seed: number): AppointmentFactoryData {
  const factory = new AppointmentFactory();
  factory.withPatientId(`seed-${seed}`);
  return factory.build();
}

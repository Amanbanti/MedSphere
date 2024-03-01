import type { UUID } from '@medsphere/shared';
import { AppointmentFactory, type AppointmentFactoryInput } from '../factories/appointment.factory';
import { Appointment } from '../entities/appointment.entity';

export class AppointmentBuilder {
  private readonly input: Partial<AppointmentFactoryInput> = {};

  static create(): AppointmentBuilder {
    return new AppointmentBuilder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

  withPatientId(patientId: UUID): this {
    this.input.patientId = patientId;
    return this;
  }

  withDoctorId(doctorId: UUID): this {
    this.input.doctorId = doctorId;
    return this;
  }

  withFacilityId(facilityId: UUID): this {
    this.input.facilityId = facilityId;
    return this;
  }

  withScheduledAt(scheduledAt: string): this {
    this.input.scheduledAt = scheduledAt;
    return this;
  }

  withDurationMinutes(durationMinutes: number): this {
    this.input.durationMinutes = durationMinutes;
    return this;
  }

  withReason(reason: string): this {
    this.input.reason = reason;
    return this;
  }

  withStatus(status: AppointmentStatus): this {
    this.input.status = status;
    return this;
  }

  withCheckInAt(checkInAt: string | null): this {
    this.input.checkInAt = checkInAt;
    return this;
  }

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): Appointment {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return AppointmentFactory.create(this.input as AppointmentFactoryInput);
  }
}

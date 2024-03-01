import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { Appointment } from '../entities/appointment.entity';

export interface AppointmentFactoryInput {
  organizationId: UUID;
  patientId: UUID;
  doctorId: UUID;
  facilityId: UUID;
  scheduledAt: string;
  durationMinutes: number;
  reason: string;
  id?: UUID;
  now?: string;
}

export class AppointmentFactory {
  static create(input: AppointmentFactoryInput): Appointment {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return Appointment.register({
      id,
      organizationId: input.organizationId,
      now,
      patientId: input.patientId,
      doctorId: input.doctorId,
      facilityId: input.facilityId,
      scheduledAt: input.scheduledAt,
      durationMinutes: input.durationMinutes,
      reason: input.reason,
    } as Parameters<typeof Appointment.register>[0]);
  }

  static reconstitute(props: Parameters<typeof Appointment.reconstitute>[0]): Appointment {
    return Appointment.reconstitute(props);
  }

  static clone(source: Appointment, overrides: Partial<AppointmentFactoryInput> = {}): Appointment {
    const snapshot = source.toSnapshot();
    return AppointmentFactory.create({
      organizationId: snapshot.organizationId as UUID,
      patientId: (overrides.patientId ?? snapshot.patientId) as UUID,
      doctorId: (overrides.doctorId ?? snapshot.doctorId) as UUID,
      facilityId: (overrides.facilityId ?? snapshot.facilityId) as UUID,
      scheduledAt: (overrides.scheduledAt ?? snapshot.scheduledAt) as string,
      durationMinutes: (overrides.durationMinutes ?? snapshot.durationMinutes) as number,
      reason: (overrides.reason ?? snapshot.reason) as string,
      id: overrides.id,
      now: overrides.now,
    });
  }
}

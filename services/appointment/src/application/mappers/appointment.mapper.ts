import type { Appointment } from '../../domain/entities/appointment.entity';

export interface AppointmentDto {
  id: string;
  organizationId: string;
  patientId: string;
  doctorId: string;
  facilityId: string;
  scheduledAt: string;
  durationMinutes: number;
  reason: string;
  status: AppointmentStatus;
  checkInAt: string | null;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class AppointmentMapper {
  static toDto(entity: Appointment): AppointmentDto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
      patientId: entity.patientId,
      doctorId: entity.doctorId,
      facilityId: entity.facilityId,
      scheduledAt: entity.scheduledAt,
      durationMinutes: entity.durationMinutes,
      reason: entity.reason,
      status: entity.status,
      checkInAt: entity.checkInAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}

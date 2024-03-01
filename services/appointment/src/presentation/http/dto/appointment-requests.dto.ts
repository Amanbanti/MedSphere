import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class BookAppointmentRequestDto {
  patientId: string;
  doctorId: string;
  facilityId: string;
  scheduledAt: string;
  metadata?: Record<string, unknown>;
}

export class RescheduleAppointmentRequestDto {
  patientId: string;
  doctorId: string;
  facilityId: string;
  scheduledAt: string;
  metadata?: Record<string, unknown>;
}

export class CancelAppointmentRequestDto {
  patientId: string;
  doctorId: string;
  facilityId: string;
  scheduledAt: string;
  metadata?: Record<string, unknown>;
}

export class CheckInAppointmentRequestDto {
  patientId: string;
  doctorId: string;
  facilityId: string;
  scheduledAt: string;
  metadata?: Record<string, unknown>;
}

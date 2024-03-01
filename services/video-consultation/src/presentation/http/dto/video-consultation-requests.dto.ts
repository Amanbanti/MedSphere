import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class StartVideoSessionRequestDto {
  patientId: string;
  providerId: string;
  appointmentId?: string;
  roomId: string;
  metadata?: Record<string, unknown>;
}

export class JoinVideoSessionRequestDto {
  patientId: string;
  providerId: string;
  appointmentId?: string;
  roomId: string;
  metadata?: Record<string, unknown>;
}

export class EndVideoSessionRequestDto {
  patientId: string;
  providerId: string;
  appointmentId?: string;
  roomId: string;
  metadata?: Record<string, unknown>;
}

export class RecordVideoSessionMetadataRequestDto {
  patientId: string;
  providerId: string;
  appointmentId?: string;
  roomId: string;
  metadata?: Record<string, unknown>;
}

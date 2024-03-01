import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreatePrescriptionRequestDto {
  patientId: string;
  prescriberId: string;
  medicationName: string;
  dosage: string;
  metadata?: Record<string, unknown>;
}

export class RenewPrescriptionRequestDto {
  patientId: string;
  prescriberId: string;
  medicationName: string;
  dosage: string;
  metadata?: Record<string, unknown>;
}

export class CancelPrescriptionRequestDto {
  patientId: string;
  prescriberId: string;
  medicationName: string;
  dosage: string;
  metadata?: Record<string, unknown>;
}

export class CheckPrescriptionInteractionsRequestDto {
  patientId: string;
  prescriberId: string;
  medicationName: string;
  dosage: string;
  metadata?: Record<string, unknown>;
}

import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateMedicalRecordRequestDto {
  patientId: string;
  encounterId?: string;
  recordType: string;
  title: string;
  metadata?: Record<string, unknown>;
}

export class AddClinicalNoteRequestDto {
  patientId: string;
  encounterId?: string;
  recordType: string;
  title: string;
  metadata?: Record<string, unknown>;
}

export class AttachMedicalDocumentRequestDto {
  patientId: string;
  encounterId?: string;
  recordType: string;
  title: string;
  metadata?: Record<string, unknown>;
}

export class SignMedicalRecordRequestDto {
  patientId: string;
  encounterId?: string;
  recordType: string;
  title: string;
  metadata?: Record<string, unknown>;
}

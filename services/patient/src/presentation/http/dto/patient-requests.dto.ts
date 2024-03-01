import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class RegisterPatientRequestDto {
  mrn: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  metadata?: Record<string, unknown>;
}

export class UpdatePatientDemographicsRequestDto {
  mrn: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  metadata?: Record<string, unknown>;
}

export class RecordPatientAllergyRequestDto {
  mrn: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  metadata?: Record<string, unknown>;
}

export class AddPatientVitalsRequestDto {
  mrn: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  metadata?: Record<string, unknown>;
}

export class DeactivatePatientRequestDto {
  mrn: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  metadata?: Record<string, unknown>;
}

export class MergePatientRecordsRequestDto {
  mrn: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  metadata?: Record<string, unknown>;
}

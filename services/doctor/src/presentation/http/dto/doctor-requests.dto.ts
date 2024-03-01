import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class RegisterDoctorRequestDto {
  npi: string;
  firstName: string;
  lastName: string;
  specialty: string;
  metadata?: Record<string, unknown>;
}

export class UpdateDoctorCredentialsRequestDto {
  npi: string;
  firstName: string;
  lastName: string;
  specialty: string;
  metadata?: Record<string, unknown>;
}

export class AssignDoctorDepartmentRequestDto {
  npi: string;
  firstName: string;
  lastName: string;
  specialty: string;
  metadata?: Record<string, unknown>;
}

export class SetDoctorAvailabilityRequestDto {
  npi: string;
  firstName: string;
  lastName: string;
  specialty: string;
  metadata?: Record<string, unknown>;
}

export class SuspendDoctorRequestDto {
  npi: string;
  firstName: string;
  lastName: string;
  specialty: string;
  metadata?: Record<string, unknown>;
}

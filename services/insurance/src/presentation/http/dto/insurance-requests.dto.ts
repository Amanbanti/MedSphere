import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class VerifyInsuranceCoverageRequestDto {
  patientId: string;
  payerId: string;
  policyNumber: string;
  groupNumber?: string;
  metadata?: Record<string, unknown>;
}

export class SubmitInsuranceClaimRequestDto {
  patientId: string;
  payerId: string;
  policyNumber: string;
  groupNumber?: string;
  metadata?: Record<string, unknown>;
}

export class UpdateInsurancePolicyRequestDto {
  patientId: string;
  payerId: string;
  policyNumber: string;
  groupNumber?: string;
  metadata?: Record<string, unknown>;
}

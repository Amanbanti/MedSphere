import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class OrderLabTestRequestDto {
  patientId: string;
  orderingProviderId: string;
  testCode: string;
  testName: string;
  metadata?: Record<string, unknown>;
}

export class CollectLabSampleRequestDto {
  patientId: string;
  orderingProviderId: string;
  testCode: string;
  testName: string;
  metadata?: Record<string, unknown>;
}

export class ReportLabResultRequestDto {
  patientId: string;
  orderingProviderId: string;
  testCode: string;
  testName: string;
  metadata?: Record<string, unknown>;
}

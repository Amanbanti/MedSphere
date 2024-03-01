import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class AddPharmacyInventoryRequestDto {
  ndcCode: string;
  drugName: string;
  strength: string;
  form: string;
  metadata?: Record<string, unknown>;
}

export class DispenseMedicationRequestDto {
  ndcCode: string;
  drugName: string;
  strength: string;
  form: string;
  metadata?: Record<string, unknown>;
}

export class UpdatePharmacyPricingRequestDto {
  ndcCode: string;
  drugName: string;
  strength: string;
  form: string;
  metadata?: Record<string, unknown>;
}

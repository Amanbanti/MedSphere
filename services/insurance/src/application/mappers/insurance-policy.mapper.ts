import type { InsurancePolicy } from '../../domain/entities/insurance-policy.entity';

export interface InsurancePolicyDto {
  id: string;
  organizationId: string;
  patientId: string;
  payerId: string;
  policyNumber: string;
  groupNumber: string | null;
  effectiveFrom: string;
  effectiveTo: string | null;
  status: PolicyStatus;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class InsurancePolicyMapper {
  static toDto(entity: InsurancePolicy): InsurancePolicyDto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
      patientId: entity.patientId,
      payerId: entity.payerId,
      policyNumber: entity.policyNumber,
      groupNumber: entity.groupNumber,
      effectiveFrom: entity.effectiveFrom,
      effectiveTo: entity.effectiveTo,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}

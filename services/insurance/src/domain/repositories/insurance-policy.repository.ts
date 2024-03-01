import type { UUID } from '@medsphere/shared';
import type { InsurancePolicy } from '../entities/insurance-policy.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const INSURANCE_POLICY_REPOSITORY = Symbol('INSURANCE_POLICY_REPOSITORY');

export interface InsurancePolicyRepository {
  save(entity: InsurancePolicy): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<InsurancePolicy | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<InsurancePolicy>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}


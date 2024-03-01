import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { GetInsuranceEligibilityCommand } from '../commands/get-insurance-eligibility.command';
import { INSURANCE_POLICY_REPOSITORY, type InsurancePolicyRepository } from '../../domain/repositories/insurance-policy.repository';
import { InsurancePolicy } from '../../domain/entities/insurance-policy.entity';
import {
  InsuranceNotFoundError,
  ValidationError,
} from '../../domain/errors/insurance.errors';
import { InsurancePolicyMapper } from '../mappers/insurance-policy.mapper';

@Injectable()
export class GetInsuranceEligibilityUseCase {
  constructor(
    @Inject(INSURANCE_POLICY_REPOSITORY) private readonly repository: InsurancePolicyRepository,
  ) {}

  async execute(command: GetInsuranceEligibilityCommand) {
    const query = command.query ?? {};
    const result = await this.repository.list(command.organizationId, query);
    return {
      items: result.items.map((item) => InsurancePolicyMapper.toDto(item)),
      meta: result.meta,
    };
  }
}

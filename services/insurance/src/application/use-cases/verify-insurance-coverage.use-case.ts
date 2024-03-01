import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { VerifyInsuranceCoverageCommand } from '../commands/verify-insurance-coverage.command';
import { INSURANCE_POLICY_REPOSITORY, type InsurancePolicyRepository } from '../../domain/repositories/insurance-policy.repository';
import { InsurancePolicy } from '../../domain/entities/insurance-policy.entity';
import {
  InsuranceNotFoundError,
  ValidationError,
} from '../../domain/errors/insurance.errors';
import { InsurancePolicyMapper } from '../mappers/insurance-policy.mapper';

@Injectable()
export class VerifyInsuranceCoverageUseCase {
  constructor(
    @Inject(INSURANCE_POLICY_REPOSITORY) private readonly repository: InsurancePolicyRepository,
  ) {}

  async execute(command: VerifyInsuranceCoverageCommand) {
    if (!command.id && !command.payload) {
      throw new ValidationError('id or payload is required');
    }
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (!targetId) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, targetId);
    if (!entity) {
      throw new InsuranceNotFoundError(targetId);
    }
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    return InsurancePolicyMapper.toDto(entity);
  }
}

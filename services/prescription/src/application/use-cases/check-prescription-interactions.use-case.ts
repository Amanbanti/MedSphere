import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { CheckPrescriptionInteractionsCommand } from '../commands/check-prescription-interactions.command';
import { PRESCRIPTION_REPOSITORY, type PrescriptionRepository } from '../../domain/repositories/prescription.repository';
import { Prescription } from '../../domain/entities/prescription.entity';
import {
  PrescriptionNotFoundError,
  ValidationError,
} from '../../domain/errors/prescription.errors';
import { PrescriptionMapper } from '../mappers/prescription.mapper';

@Injectable()
export class CheckPrescriptionInteractionsUseCase {
  constructor(
    @Inject(PRESCRIPTION_REPOSITORY) private readonly repository: PrescriptionRepository,
  ) {}

  async execute(command: CheckPrescriptionInteractionsCommand) {
    if (!command.id && !command.payload) {
      throw new ValidationError('id or payload is required');
    }
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (!targetId) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, targetId);
    if (!entity) {
      throw new PrescriptionNotFoundError(targetId);
    }
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    return PrescriptionMapper.toDto(entity);
  }
}

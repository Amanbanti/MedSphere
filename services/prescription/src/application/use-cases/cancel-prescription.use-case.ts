import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { CancelPrescriptionCommand } from '../commands/cancel-prescription.command';
import { PRESCRIPTION_REPOSITORY, type PrescriptionRepository } from '../../domain/repositories/prescription.repository';
import { Prescription } from '../../domain/entities/prescription.entity';
import {
  PrescriptionNotFoundError,
  ValidationError,
} from '../../domain/errors/prescription.errors';
import { PrescriptionMapper } from '../mappers/prescription.mapper';

@Injectable()
export class CancelPrescriptionUseCase {
  constructor(
    @Inject(PRESCRIPTION_REPOSITORY) private readonly repository: PrescriptionRepository,
  ) {}

  async execute(command: CancelPrescriptionCommand) {
    if (!command.id) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, command.id);
    if (!entity) {
      throw new PrescriptionNotFoundError(command.id);
    }
    const now = command.now ?? nowIso();
    entity.softDelete(now);
    await this.repository.save(entity);
    return { success: true, id: entity.id };
  }
}

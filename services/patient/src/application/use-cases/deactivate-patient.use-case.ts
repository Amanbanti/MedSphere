import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { DeactivatePatientCommand } from '../commands/deactivate-patient.command';
import { PATIENT_REPOSITORY, type PatientRepository } from '../../domain/repositories/patient.repository';
import { Patient } from '../../domain/entities/patient.entity';
import {
  PatientNotFoundError,
  ValidationError,
} from '../../domain/errors/patient.errors';
import { PatientMapper } from '../mappers/patient.mapper';

@Injectable()
export class DeactivatePatientUseCase {
  constructor(
    @Inject(PATIENT_REPOSITORY) private readonly repository: PatientRepository,
  ) {}

  async execute(command: DeactivatePatientCommand) {
    if (!command.id) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, command.id);
    if (!entity) {
      throw new PatientNotFoundError(command.id);
    }
    const now = command.now ?? nowIso();
    entity.softDelete(now);
    await this.repository.save(entity);
    return { success: true, id: entity.id };
  }
}

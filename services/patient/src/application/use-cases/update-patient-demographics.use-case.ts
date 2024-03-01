import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { UpdatePatientDemographicsCommand } from '../commands/update-patient-demographics.command';
import { PATIENT_REPOSITORY, type PatientRepository } from '../../domain/repositories/patient.repository';
import { Patient } from '../../domain/entities/patient.entity';
import {
  PatientNotFoundError,
  ValidationError,
} from '../../domain/errors/patient.errors';
import { PatientMapper } from '../mappers/patient.mapper';

@Injectable()
export class UpdatePatientDemographicsUseCase {
  constructor(
    @Inject(PATIENT_REPOSITORY) private readonly repository: PatientRepository,
  ) {}

  async execute(command: UpdatePatientDemographicsCommand) {
    if (!command.id && !command.payload) {
      throw new ValidationError('id or payload is required');
    }
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (!targetId) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, targetId);
    if (!entity) {
      throw new PatientNotFoundError(targetId);
    }
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    return PatientMapper.toDto(entity);
  }
}

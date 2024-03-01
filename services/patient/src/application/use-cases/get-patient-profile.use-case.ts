import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { GetPatientProfileCommand } from '../commands/get-patient-profile.command';
import { PATIENT_REPOSITORY, type PatientRepository } from '../../domain/repositories/patient.repository';
import { Patient } from '../../domain/entities/patient.entity';
import {
  PatientNotFoundError,
  ValidationError,
} from '../../domain/errors/patient.errors';
import { PatientMapper } from '../mappers/patient.mapper';

@Injectable()
export class GetPatientProfileUseCase {
  constructor(
    @Inject(PATIENT_REPOSITORY) private readonly repository: PatientRepository,
  ) {}

  async execute(command: GetPatientProfileCommand) {
    if (!command.id) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, command.id);
    if (!entity) {
      throw new PatientNotFoundError(command.id);
    }
    return PatientMapper.toDto(entity);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { ListPatientsCommand } from '../commands/list-patients.command';
import { PATIENT_REPOSITORY, type PatientRepository } from '../../domain/repositories/patient.repository';
import { Patient } from '../../domain/entities/patient.entity';
import {
  PatientNotFoundError,
  ValidationError,
} from '../../domain/errors/patient.errors';
import { PatientMapper } from '../mappers/patient.mapper';

@Injectable()
export class ListPatientsUseCase {
  constructor(
    @Inject(PATIENT_REPOSITORY) private readonly repository: PatientRepository,
  ) {}

  async execute(command: ListPatientsCommand) {
    const query = command.query ?? {};
    const result = await this.repository.list(command.organizationId, query);
    return {
      items: result.items.map((item) => PatientMapper.toDto(item)),
      meta: result.meta,
    };
  }
}

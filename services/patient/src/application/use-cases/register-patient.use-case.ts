import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { RegisterPatientCommand } from '../commands/register-patient.command';
import { PATIENT_REPOSITORY, type PatientRepository } from '../../domain/repositories/patient.repository';
import { Patient } from '../../domain/entities/patient.entity';
import {
  PatientNotFoundError,
  ValidationError,
} from '../../domain/errors/patient.errors';
import { PatientMapper } from '../mappers/patient.mapper';

@Injectable()
export class RegisterPatientUseCase {
  constructor(
    @Inject(PATIENT_REPOSITORY) private readonly repository: PatientRepository,
  ) {}

  async execute(command: RegisterPatientCommand) {
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = Patient.register({
      id,
      organizationId: command.organizationId,
      now,
      ...(command.payload as Record<string, never>),
    } as Parameters<typeof Patient.register>[0]);
    await this.repository.save(entity);
    return PatientMapper.toDto(entity);
  }
}

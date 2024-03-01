import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { RegisterDoctorCommand } from '../commands/register-doctor.command';
import { DOCTOR_REPOSITORY, type DoctorRepository } from '../../domain/repositories/doctor.repository';
import { Doctor } from '../../domain/entities/doctor.entity';
import {
  DoctorNotFoundError,
  ValidationError,
} from '../../domain/errors/doctor.errors';
import { DoctorMapper } from '../mappers/doctor.mapper';

@Injectable()
export class RegisterDoctorUseCase {
  constructor(
    @Inject(DOCTOR_REPOSITORY) private readonly repository: DoctorRepository,
  ) {}

  async execute(command: RegisterDoctorCommand) {
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = Doctor.register({
      id,
      organizationId: command.organizationId,
      now,
      ...(command.payload as Record<string, never>),
    } as Parameters<typeof Doctor.register>[0]);
    await this.repository.save(entity);
    return DoctorMapper.toDto(entity);
  }
}

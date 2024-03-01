import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { SetDoctorAvailabilityCommand } from '../commands/set-doctor-availability.command';
import { DOCTOR_REPOSITORY, type DoctorRepository } from '../../domain/repositories/doctor.repository';
import { Doctor } from '../../domain/entities/doctor.entity';
import {
  DoctorNotFoundError,
  ValidationError,
} from '../../domain/errors/doctor.errors';
import { DoctorMapper } from '../mappers/doctor.mapper';

@Injectable()
export class SetDoctorAvailabilityUseCase {
  constructor(
    @Inject(DOCTOR_REPOSITORY) private readonly repository: DoctorRepository,
  ) {}

  async execute(command: SetDoctorAvailabilityCommand) {
    if (!command.id && !command.payload) {
      throw new ValidationError('id or payload is required');
    }
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (!targetId) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, targetId);
    if (!entity) {
      throw new DoctorNotFoundError(targetId);
    }
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    return DoctorMapper.toDto(entity);
  }
}

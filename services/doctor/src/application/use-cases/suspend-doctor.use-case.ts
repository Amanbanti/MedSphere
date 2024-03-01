import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { SuspendDoctorCommand } from '../commands/suspend-doctor.command';
import { DOCTOR_REPOSITORY, type DoctorRepository } from '../../domain/repositories/doctor.repository';
import { Doctor } from '../../domain/entities/doctor.entity';
import {
  DoctorNotFoundError,
  ValidationError,
} from '../../domain/errors/doctor.errors';
import { DoctorMapper } from '../mappers/doctor.mapper';

@Injectable()
export class SuspendDoctorUseCase {
  constructor(
    @Inject(DOCTOR_REPOSITORY) private readonly repository: DoctorRepository,
  ) {}

  async execute(command: SuspendDoctorCommand) {
    if (!command.id) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, command.id);
    if (!entity) {
      throw new DoctorNotFoundError(command.id);
    }
    const now = command.now ?? nowIso();
    entity.softDelete(now);
    await this.repository.save(entity);
    return { success: true, id: entity.id };
  }
}

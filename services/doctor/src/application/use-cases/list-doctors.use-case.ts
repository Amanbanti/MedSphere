import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { ListDoctorsCommand } from '../commands/list-doctors.command';
import { DOCTOR_REPOSITORY, type DoctorRepository } from '../../domain/repositories/doctor.repository';
import { Doctor } from '../../domain/entities/doctor.entity';
import {
  DoctorNotFoundError,
  ValidationError,
} from '../../domain/errors/doctor.errors';
import { DoctorMapper } from '../mappers/doctor.mapper';

@Injectable()
export class ListDoctorsUseCase {
  constructor(
    @Inject(DOCTOR_REPOSITORY) private readonly repository: DoctorRepository,
  ) {}

  async execute(command: ListDoctorsCommand) {
    const query = command.query ?? {};
    const result = await this.repository.list(command.organizationId, query);
    return {
      items: result.items.map((item) => DoctorMapper.toDto(item)),
      meta: result.meta,
    };
  }
}

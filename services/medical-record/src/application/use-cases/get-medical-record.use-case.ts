import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { GetMedicalRecordCommand } from '../commands/get-medical-record.command';
import { MEDICAL_RECORD_REPOSITORY, type MedicalRecordRepository } from '../../domain/repositories/medical-record.repository';
import { MedicalRecord } from '../../domain/entities/medical-record.entity';
import {
  MedicalRecordNotFoundError,
  ValidationError,
} from '../../domain/errors/medical-record.errors';
import { MedicalRecordMapper } from '../mappers/medical-record.mapper';

@Injectable()
export class GetMedicalRecordUseCase {
  constructor(
    @Inject(MEDICAL_RECORD_REPOSITORY) private readonly repository: MedicalRecordRepository,
  ) {}

  async execute(command: GetMedicalRecordCommand) {
    if (!command.id) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, command.id);
    if (!entity) {
      throw new MedicalRecordNotFoundError(command.id);
    }
    return MedicalRecordMapper.toDto(entity);
  }
}

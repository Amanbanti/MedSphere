import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { AddClinicalNoteCommand } from '../commands/add-clinical-note.command';
import { MEDICAL_RECORD_REPOSITORY, type MedicalRecordRepository } from '../../domain/repositories/medical-record.repository';
import { MedicalRecord } from '../../domain/entities/medical-record.entity';
import {
  MedicalRecordNotFoundError,
  ValidationError,
} from '../../domain/errors/medical-record.errors';
import { MedicalRecordMapper } from '../mappers/medical-record.mapper';

@Injectable()
export class AddClinicalNoteUseCase {
  constructor(
    @Inject(MEDICAL_RECORD_REPOSITORY) private readonly repository: MedicalRecordRepository,
  ) {}

  async execute(command: AddClinicalNoteCommand) {
    if (!command.id && !command.payload) {
      throw new ValidationError('id or payload is required');
    }
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (!targetId) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, targetId);
    if (!entity) {
      throw new MedicalRecordNotFoundError(targetId);
    }
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    return MedicalRecordMapper.toDto(entity);
  }
}

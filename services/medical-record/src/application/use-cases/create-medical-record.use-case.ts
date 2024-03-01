import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { CreateMedicalRecordCommand } from '../commands/create-medical-record.command';
import { MEDICAL_RECORD_REPOSITORY, type MedicalRecordRepository } from '../../domain/repositories/medical-record.repository';
import { MedicalRecord } from '../../domain/entities/medical-record.entity';
import {
  MedicalRecordNotFoundError,
  ValidationError,
} from '../../domain/errors/medical-record.errors';
import { MedicalRecordMapper } from '../mappers/medical-record.mapper';

@Injectable()
export class CreateMedicalRecordUseCase {
  constructor(
    @Inject(MEDICAL_RECORD_REPOSITORY) private readonly repository: MedicalRecordRepository,
  ) {}

  async execute(command: CreateMedicalRecordCommand) {
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = MedicalRecord.register({
      id,
      organizationId: command.organizationId,
      now,
      ...(command.payload as Record<string, never>),
    } as Parameters<typeof MedicalRecord.register>[0]);
    await this.repository.save(entity);
    return MedicalRecordMapper.toDto(entity);
  }
}

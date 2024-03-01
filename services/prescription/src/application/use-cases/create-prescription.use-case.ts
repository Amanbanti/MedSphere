import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { CreatePrescriptionCommand } from '../commands/create-prescription.command';
import { PRESCRIPTION_REPOSITORY, type PrescriptionRepository } from '../../domain/repositories/prescription.repository';
import { Prescription } from '../../domain/entities/prescription.entity';
import {
  PrescriptionNotFoundError,
  ValidationError,
} from '../../domain/errors/prescription.errors';
import { PrescriptionMapper } from '../mappers/prescription.mapper';

@Injectable()
export class CreatePrescriptionUseCase {
  constructor(
    @Inject(PRESCRIPTION_REPOSITORY) private readonly repository: PrescriptionRepository,
  ) {}

  async execute(command: CreatePrescriptionCommand) {
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = Prescription.register({
      id,
      organizationId: command.organizationId,
      now,
      ...(command.payload as Record<string, never>),
    } as Parameters<typeof Prescription.register>[0]);
    await this.repository.save(entity);
    return PrescriptionMapper.toDto(entity);
  }
}

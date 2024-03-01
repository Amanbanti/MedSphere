import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { ListPrescriptionsCommand } from '../commands/list-prescriptions.command';
import { PRESCRIPTION_REPOSITORY, type PrescriptionRepository } from '../../domain/repositories/prescription.repository';
import { Prescription } from '../../domain/entities/prescription.entity';
import {
  PrescriptionNotFoundError,
  ValidationError,
} from '../../domain/errors/prescription.errors';
import { PrescriptionMapper } from '../mappers/prescription.mapper';

@Injectable()
export class ListPrescriptionsUseCase {
  constructor(
    @Inject(PRESCRIPTION_REPOSITORY) private readonly repository: PrescriptionRepository,
  ) {}

  async execute(command: ListPrescriptionsCommand) {
    const query = command.query ?? {};
    const result = await this.repository.list(command.organizationId, query);
    return {
      items: result.items.map((item) => PrescriptionMapper.toDto(item)),
      meta: result.meta,
    };
  }
}

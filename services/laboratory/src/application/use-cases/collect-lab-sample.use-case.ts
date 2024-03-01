import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { CollectLabSampleCommand } from '../commands/collect-lab-sample.command';
import { LAB_ORDER_REPOSITORY, type LabOrderRepository } from '../../domain/repositories/lab-order.repository';
import { LabOrder } from '../../domain/entities/lab-order.entity';
import {
  LaboratoryNotFoundError,
  ValidationError,
} from '../../domain/errors/laboratory.errors';
import { LabOrderMapper } from '../mappers/lab-order.mapper';

@Injectable()
export class CollectLabSampleUseCase {
  constructor(
    @Inject(LAB_ORDER_REPOSITORY) private readonly repository: LabOrderRepository,
  ) {}

  async execute(command: CollectLabSampleCommand) {
    if (!command.id && !command.payload) {
      throw new ValidationError('id or payload is required');
    }
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (!targetId) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, targetId);
    if (!entity) {
      throw new LaboratoryNotFoundError(targetId);
    }
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    return LabOrderMapper.toDto(entity);
  }
}

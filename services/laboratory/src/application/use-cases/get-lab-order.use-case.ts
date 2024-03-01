import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { GetLabOrderCommand } from '../commands/get-lab-order.command';
import { LAB_ORDER_REPOSITORY, type LabOrderRepository } from '../../domain/repositories/lab-order.repository';
import { LabOrder } from '../../domain/entities/lab-order.entity';
import {
  LaboratoryNotFoundError,
  ValidationError,
} from '../../domain/errors/laboratory.errors';
import { LabOrderMapper } from '../mappers/lab-order.mapper';

@Injectable()
export class GetLabOrderUseCase {
  constructor(
    @Inject(LAB_ORDER_REPOSITORY) private readonly repository: LabOrderRepository,
  ) {}

  async execute(command: GetLabOrderCommand) {
    if (!command.id) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, command.id);
    if (!entity) {
      throw new LaboratoryNotFoundError(command.id);
    }
    return LabOrderMapper.toDto(entity);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { ListLabOrdersCommand } from '../commands/list-lab-orders.command';
import { LAB_ORDER_REPOSITORY, type LabOrderRepository } from '../../domain/repositories/lab-order.repository';
import { LabOrder } from '../../domain/entities/lab-order.entity';
import {
  LaboratoryNotFoundError,
  ValidationError,
} from '../../domain/errors/laboratory.errors';
import { LabOrderMapper } from '../mappers/lab-order.mapper';

@Injectable()
export class ListLabOrdersUseCase {
  constructor(
    @Inject(LAB_ORDER_REPOSITORY) private readonly repository: LabOrderRepository,
  ) {}

  async execute(command: ListLabOrdersCommand) {
    const query = command.query ?? {};
    const result = await this.repository.list(command.organizationId, query);
    return {
      items: result.items.map((item) => LabOrderMapper.toDto(item)),
      meta: result.meta,
    };
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { OrderLabTestCommand } from '../commands/order-lab-test.command';
import { LAB_ORDER_REPOSITORY, type LabOrderRepository } from '../../domain/repositories/lab-order.repository';
import { LabOrder } from '../../domain/entities/lab-order.entity';
import {
  LaboratoryNotFoundError,
  ValidationError,
} from '../../domain/errors/laboratory.errors';
import { LabOrderMapper } from '../mappers/lab-order.mapper';

@Injectable()
export class OrderLabTestUseCase {
  constructor(
    @Inject(LAB_ORDER_REPOSITORY) private readonly repository: LabOrderRepository,
  ) {}

  async execute(command: OrderLabTestCommand) {
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = LabOrder.register({
      id,
      organizationId: command.organizationId,
      now,
      ...(command.payload as Record<string, never>),
    } as Parameters<typeof LabOrder.register>[0]);
    await this.repository.save(entity);
    return LabOrderMapper.toDto(entity);
  }
}

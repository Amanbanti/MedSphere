import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { AddPharmacyInventoryCommand } from '../commands/add-pharmacy-inventory.command';
import { PHARMACY_ITEM_REPOSITORY, type PharmacyItemRepository } from '../../domain/repositories/pharmacy-item.repository';
import { PharmacyItem } from '../../domain/entities/pharmacy-item.entity';
import {
  PharmacyNotFoundError,
  ValidationError,
} from '../../domain/errors/pharmacy.errors';
import { PharmacyItemMapper } from '../mappers/pharmacy-item.mapper';

@Injectable()
export class AddPharmacyInventoryUseCase {
  constructor(
    @Inject(PHARMACY_ITEM_REPOSITORY) private readonly repository: PharmacyItemRepository,
  ) {}

  async execute(command: AddPharmacyInventoryCommand) {
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = PharmacyItem.register({
      id,
      organizationId: command.organizationId,
      now,
      ...(command.payload as Record<string, never>),
    } as Parameters<typeof PharmacyItem.register>[0]);
    await this.repository.save(entity);
    return PharmacyItemMapper.toDto(entity);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { UpdatePharmacyPricingCommand } from '../commands/update-pharmacy-pricing.command';
import { PHARMACY_ITEM_REPOSITORY, type PharmacyItemRepository } from '../../domain/repositories/pharmacy-item.repository';
import { PharmacyItem } from '../../domain/entities/pharmacy-item.entity';
import {
  PharmacyNotFoundError,
  ValidationError,
} from '../../domain/errors/pharmacy.errors';
import { PharmacyItemMapper } from '../mappers/pharmacy-item.mapper';

@Injectable()
export class UpdatePharmacyPricingUseCase {
  constructor(
    @Inject(PHARMACY_ITEM_REPOSITORY) private readonly repository: PharmacyItemRepository,
  ) {}

  async execute(command: UpdatePharmacyPricingCommand) {
    if (!command.id && !command.payload) {
      throw new ValidationError('id or payload is required');
    }
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (!targetId) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, targetId);
    if (!entity) {
      throw new PharmacyNotFoundError(targetId);
    }
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    return PharmacyItemMapper.toDto(entity);
  }
}

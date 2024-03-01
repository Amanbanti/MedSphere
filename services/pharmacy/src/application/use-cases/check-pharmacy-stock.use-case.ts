import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { CheckPharmacyStockCommand } from '../commands/check-pharmacy-stock.command';
import { PHARMACY_ITEM_REPOSITORY, type PharmacyItemRepository } from '../../domain/repositories/pharmacy-item.repository';
import { PharmacyItem } from '../../domain/entities/pharmacy-item.entity';
import {
  PharmacyNotFoundError,
  ValidationError,
} from '../../domain/errors/pharmacy.errors';
import { PharmacyItemMapper } from '../mappers/pharmacy-item.mapper';

@Injectable()
export class CheckPharmacyStockUseCase {
  constructor(
    @Inject(PHARMACY_ITEM_REPOSITORY) private readonly repository: PharmacyItemRepository,
  ) {}

  async execute(command: CheckPharmacyStockCommand) {
    const query = command.query ?? {};
    const result = await this.repository.list(command.organizationId, query);
    return {
      items: result.items.map((item) => PharmacyItemMapper.toDto(item)),
      meta: result.meta,
    };
  }
}

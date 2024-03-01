import type { UUID } from '@medsphere/shared';
import type { PharmacyItem } from '../entities/pharmacy-item.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const PHARMACY_ITEM_REPOSITORY = Symbol('PHARMACY_ITEM_REPOSITORY');

export interface PharmacyItemRepository {
  save(entity: PharmacyItem): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<PharmacyItem | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<PharmacyItem>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}


import type { UUID } from '@medsphere/shared';
import type { LabOrder } from '../entities/lab-order.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const LAB_ORDER_REPOSITORY = Symbol('LAB_ORDER_REPOSITORY');

export interface LabOrderRepository {
  save(entity: LabOrder): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<LabOrder | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<LabOrder>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}


import type { UUID } from '@medsphere/shared';
import type { AnalyticsEvent } from '../entities/analytics-event.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const ANALYTICS_EVENT_REPOSITORY = Symbol('ANALYTICS_EVENT_REPOSITORY');

export interface AnalyticsEventRepository {
  save(entity: AnalyticsEvent): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<AnalyticsEvent | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<AnalyticsEvent>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}


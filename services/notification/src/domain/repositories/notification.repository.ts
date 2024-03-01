import type { UUID } from '@medsphere/shared';
import type { Notification } from '../entities/notification.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const NOTIFICATION_REPOSITORY = Symbol('NOTIFICATION_REPOSITORY');

export interface NotificationRepository {
  save(entity: Notification): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<Notification | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<Notification>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}


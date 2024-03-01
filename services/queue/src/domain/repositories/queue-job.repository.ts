import type { UUID } from '@medsphere/shared';
import type { QueueJob } from '../entities/queue-job.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const QUEUE_JOB_REPOSITORY = Symbol('QUEUE_JOB_REPOSITORY');

export interface QueueJobRepository {
  save(entity: QueueJob): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<QueueJob | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<QueueJob>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}


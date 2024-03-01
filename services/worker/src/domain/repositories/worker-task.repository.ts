import type { UUID } from '@medsphere/shared';
import type { WorkerTask } from '../entities/worker-task.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const WORKER_TASK_REPOSITORY = Symbol('WORKER_TASK_REPOSITORY');

export interface WorkerTaskRepository {
  save(entity: WorkerTask): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<WorkerTask | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<WorkerTask>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}


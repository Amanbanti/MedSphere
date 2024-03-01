import type { WorkerTask } from '../../domain/entities/worker-task.entity';

export interface WorkerTaskDto {
  id: string;
  organizationId: string;
  handlerName: string;
  jobId: string;
  payload: Record<string, unknown>;
  status: WorkerTaskStatus;
  startedAt: string | null;
  completedAt: string | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class WorkerTaskMapper {
  static toDto(entity: WorkerTask): WorkerTaskDto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
      handlerName: entity.handlerName,
      jobId: entity.jobId,
      payload: entity.payload,
      status: entity.status,
      startedAt: entity.startedAt,
      completedAt: entity.completedAt,
      errorMessage: entity.errorMessage,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}

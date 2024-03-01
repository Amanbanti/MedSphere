import type { QueueJob } from '../../domain/entities/queue-job.entity';

export interface QueueJobDto {
  id: string;
  organizationId: string;
  queueName: string;
  jobType: string;
  payload: Record<string, unknown>;
  status: QueueJobStatus;
  attempts: number;
  scheduledFor: string | null;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class QueueJobMapper {
  static toDto(entity: QueueJob): QueueJobDto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
      queueName: entity.queueName,
      jobType: entity.jobType,
      payload: entity.payload,
      status: entity.status,
      attempts: entity.attempts,
      scheduledFor: entity.scheduledFor,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}

import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { QueueJob } from '../entities/queue-job.entity';

export interface QueueJobFactoryInput {
  organizationId: UUID;
  queueName: string;
  jobType: string;
  payload: Record<string, unknown>;
  status: QueueJobStatus;
  attempts: number;
  scheduledFor?: string | null;
  id?: UUID;
  now?: string;
}

export class QueueJobFactory {
  static create(input: QueueJobFactoryInput): QueueJob {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return QueueJob.register({
      id,
      organizationId: input.organizationId,
      now,
      queueName: input.queueName,
      jobType: input.jobType,
      payload: input.payload,
      status: input.status,
      attempts: input.attempts,
      scheduledFor: input.scheduledFor ?? null,
    } as Parameters<typeof QueueJob.register>[0]);
  }

  static reconstitute(props: Parameters<typeof QueueJob.reconstitute>[0]): QueueJob {
    return QueueJob.reconstitute(props);
  }

  static clone(source: QueueJob, overrides: Partial<QueueJobFactoryInput> = {}): QueueJob {
    const snapshot = source.toSnapshot();
    return QueueJobFactory.create({
      organizationId: snapshot.organizationId as UUID,
      queueName: (overrides.queueName ?? snapshot.queueName) as string,
      jobType: (overrides.jobType ?? snapshot.jobType) as string,
      payload: (overrides.payload ?? snapshot.payload) as Record<string, unknown>,
      status: (overrides.status ?? snapshot.status) as QueueJobStatus,
      attempts: (overrides.attempts ?? snapshot.attempts) as number,
      scheduledFor: (overrides.scheduledFor ?? snapshot.scheduledFor) as string | null,
      id: overrides.id,
      now: overrides.now,
    });
  }
}

import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { WorkerTask } from '../entities/worker-task.entity';

export interface WorkerTaskFactoryInput {
  organizationId: UUID;
  handlerName: string;
  jobId: UUID;
  payload: Record<string, unknown>;
  status: WorkerTaskStatus;
  startedAt?: string | null;
  completedAt?: string | null;
  id?: UUID;
  now?: string;
}

export class WorkerTaskFactory {
  static create(input: WorkerTaskFactoryInput): WorkerTask {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return WorkerTask.register({
      id,
      organizationId: input.organizationId,
      now,
      handlerName: input.handlerName,
      jobId: input.jobId,
      payload: input.payload,
      status: input.status,
      startedAt: input.startedAt ?? null,
      completedAt: input.completedAt ?? null,
    } as Parameters<typeof WorkerTask.register>[0]);
  }

  static reconstitute(props: Parameters<typeof WorkerTask.reconstitute>[0]): WorkerTask {
    return WorkerTask.reconstitute(props);
  }

  static clone(source: WorkerTask, overrides: Partial<WorkerTaskFactoryInput> = {}): WorkerTask {
    const snapshot = source.toSnapshot();
    return WorkerTaskFactory.create({
      organizationId: snapshot.organizationId as UUID,
      handlerName: (overrides.handlerName ?? snapshot.handlerName) as string,
      jobId: (overrides.jobId ?? snapshot.jobId) as UUID,
      payload: (overrides.payload ?? snapshot.payload) as Record<string, unknown>,
      status: (overrides.status ?? snapshot.status) as WorkerTaskStatus,
      startedAt: (overrides.startedAt ?? snapshot.startedAt) as string | null,
      completedAt: (overrides.completedAt ?? snapshot.completedAt) as string | null,
      id: overrides.id,
      now: overrides.now,
    });
  }
}

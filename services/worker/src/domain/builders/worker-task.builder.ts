import type { UUID } from '@medsphere/shared';
import { WorkerTaskFactory, type WorkerTaskFactoryInput } from '../factories/worker-task.factory';
import { WorkerTask } from '../entities/worker-task.entity';

export class WorkerTaskBuilder {
  private readonly input: Partial<WorkerTaskFactoryInput> = {};

  static create(): WorkerTaskBuilder {
    return new WorkerTaskBuilder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

  withHandlerName(handlerName: string): this {
    this.input.handlerName = handlerName;
    return this;
  }

  withJobId(jobId: UUID): this {
    this.input.jobId = jobId;
    return this;
  }

  withPayload(payload: Record<string, unknown>): this {
    this.input.payload = payload;
    return this;
  }

  withStatus(status: WorkerTaskStatus): this {
    this.input.status = status;
    return this;
  }

  withStartedAt(startedAt: string | null): this {
    this.input.startedAt = startedAt;
    return this;
  }

  withCompletedAt(completedAt: string | null): this {
    this.input.completedAt = completedAt;
    return this;
  }

  withErrorMessage(errorMessage: string | null): this {
    this.input.errorMessage = errorMessage;
    return this;
  }

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): WorkerTask {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return WorkerTaskFactory.create(this.input as WorkerTaskFactoryInput);
  }
}

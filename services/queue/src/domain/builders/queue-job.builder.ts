import type { UUID } from '@medsphere/shared';
import { QueueJobFactory, type QueueJobFactoryInput } from '../factories/queue-job.factory';
import { QueueJob } from '../entities/queue-job.entity';

export class QueueJobBuilder {
  private readonly input: Partial<QueueJobFactoryInput> = {};

  static create(): QueueJobBuilder {
    return new QueueJobBuilder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

  withQueueName(queueName: string): this {
    this.input.queueName = queueName;
    return this;
  }

  withJobType(jobType: string): this {
    this.input.jobType = jobType;
    return this;
  }

  withPayload(payload: Record<string, unknown>): this {
    this.input.payload = payload;
    return this;
  }

  withStatus(status: QueueJobStatus): this {
    this.input.status = status;
    return this;
  }

  withAttempts(attempts: number): this {
    this.input.attempts = attempts;
    return this;
  }

  withScheduledFor(scheduledFor: string | null): this {
    this.input.scheduledFor = scheduledFor;
    return this;
  }

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): QueueJob {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return QueueJobFactory.create(this.input as QueueJobFactoryInput);
  }
}

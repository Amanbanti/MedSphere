/**
 * Queue processor for audit queue
 */
import { Injectable, Logger } from '@nestjs/common';
import { JOB_REGISTRY, type RegisteredJobName } from './index';

@Injectable()
export class AuditQueueProcessor {
  private readonly logger = new Logger(AuditQueueProcessor.name);

  async dispatch(jobName: RegisteredJobName, payload: unknown): Promise<void> {
    const HandlerClass = JOB_REGISTRY[jobName];
    if (!HandlerClass) {
      throw new Error(`Unknown job: ${jobName}`);
    }
    const handler = new HandlerClass();
    this.logger.log(`Dispatching ${jobName} on audit queue`);
    await handler.execute(payload as never, { workerId: 'audit-worker-1' });
  }

  supportedJobs(): RegisteredJobName[] {
    return ['AuditLogArchivalJob'];
  }
}

/**
 * Queue processor for pharmacy queue
 */
import { Injectable, Logger } from '@nestjs/common';
import { JOB_REGISTRY, type RegisteredJobName } from './index';

@Injectable()
export class PharmacyQueueProcessor {
  private readonly logger = new Logger(PharmacyQueueProcessor.name);

  async dispatch(jobName: RegisteredJobName, payload: unknown): Promise<void> {
    const HandlerClass = JOB_REGISTRY[jobName];
    if (!HandlerClass) {
      throw new Error(`Unknown job: ${jobName}`);
    }
    const handler = new HandlerClass();
    this.logger.log(`Dispatching ${jobName} on pharmacy queue`);
    await handler.execute(payload as never, { workerId: 'pharmacy-worker-1' });
  }

  supportedJobs(): RegisteredJobName[] {
    return ['PrescriptionRefillReminderJob', 'FormularyUpdateSyncJob'];
  }
}

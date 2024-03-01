/**
 * Queue processor for insurance queue
 */
import { Injectable, Logger } from '@nestjs/common';
import { JOB_REGISTRY, type RegisteredJobName } from './index';

@Injectable()
export class InsuranceQueueProcessor {
  private readonly logger = new Logger(InsuranceQueueProcessor.name);

  async dispatch(jobName: RegisteredJobName, payload: unknown): Promise<void> {
    const HandlerClass = JOB_REGISTRY[jobName];
    if (!HandlerClass) {
      throw new Error(`Unknown job: ${jobName}`);
    }
    const handler = new HandlerClass();
    this.logger.log(`Dispatching ${jobName} on insurance queue`);
    await handler.execute(payload as never, { workerId: 'insurance-worker-1' });
  }

  supportedJobs(): RegisteredJobName[] {
    return ['InsuranceEligibilityRefreshJob', 'PriorAuthExpirationJob'];
  }
}

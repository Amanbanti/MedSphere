/**
 * Queue processor for clinical queue
 */
import { Injectable, Logger } from '@nestjs/common';
import { JOB_REGISTRY, type RegisteredJobName } from './index';

@Injectable()
export class ClinicalQueueProcessor {
  private readonly logger = new Logger(ClinicalQueueProcessor.name);

  async dispatch(jobName: RegisteredJobName, payload: unknown): Promise<void> {
    const HandlerClass = JOB_REGISTRY[jobName];
    if (!HandlerClass) {
      throw new Error(`Unknown job: ${jobName}`);
    }
    const handler = new HandlerClass();
    this.logger.log(`Dispatching ${jobName} on clinical queue`);
    await handler.execute(payload as never, { workerId: 'clinical-worker-1' });
  }

  supportedJobs(): RegisteredJobName[] {
    return ['LabResultCriticalAlertJob', 'CarePlanReviewReminderJob', 'MedicationAdministrationSyncJob'];
  }
}

/**
 * Queue processor for analytics queue
 */
import { Injectable, Logger } from '@nestjs/common';
import { JOB_REGISTRY, type RegisteredJobName } from './index';

@Injectable()
export class AnalyticsQueueProcessor {
  private readonly logger = new Logger(AnalyticsQueueProcessor.name);

  async dispatch(jobName: RegisteredJobName, payload: unknown): Promise<void> {
    const HandlerClass = JOB_REGISTRY[jobName];
    if (!HandlerClass) {
      throw new Error(`Unknown job: ${jobName}`);
    }
    const handler = new HandlerClass();
    this.logger.log(`Dispatching ${jobName} on analytics queue`);
    await handler.execute(payload as never, { workerId: 'analytics-worker-1' });
  }

  supportedJobs(): RegisteredJobName[] {
    return ['AnalyticsRollupJob', 'BedCapacityForecastJob', 'ReportExportJob'];
  }
}

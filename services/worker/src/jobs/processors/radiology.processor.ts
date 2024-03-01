/**
 * Queue processor for radiology queue
 */
import { Injectable, Logger } from '@nestjs/common';
import { JOB_REGISTRY, type RegisteredJobName } from './index';

@Injectable()
export class RadiologyQueueProcessor {
  private readonly logger = new Logger(RadiologyQueueProcessor.name);

  async dispatch(jobName: RegisteredJobName, payload: unknown): Promise<void> {
    const HandlerClass = JOB_REGISTRY[jobName];
    if (!HandlerClass) {
      throw new Error(`Unknown job: ${jobName}`);
    }
    const handler = new HandlerClass();
    this.logger.log(`Dispatching ${jobName} on radiology queue`);
    await handler.execute(payload as never, { workerId: 'radiology-worker-1' });
  }

  supportedJobs(): RegisteredJobName[] {
    return ['ImagingStudyPrefetchJob'];
  }
}

/**
 * Queue processor for search queue
 */
import { Injectable, Logger } from '@nestjs/common';
import { JOB_REGISTRY, type RegisteredJobName } from './index';

@Injectable()
export class SearchQueueProcessor {
  private readonly logger = new Logger(SearchQueueProcessor.name);

  async dispatch(jobName: RegisteredJobName, payload: unknown): Promise<void> {
    const HandlerClass = JOB_REGISTRY[jobName];
    if (!HandlerClass) {
      throw new Error(`Unknown job: ${jobName}`);
    }
    const handler = new HandlerClass();
    this.logger.log(`Dispatching ${jobName} on search queue`);
    await handler.execute(payload as never, { workerId: 'search-worker-1' });
  }

  supportedJobs(): RegisteredJobName[] {
    return ['SearchIndexerJob'];
  }
}

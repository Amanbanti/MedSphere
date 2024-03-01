/**
 * Queue processor for documents queue
 */
import { Injectable, Logger } from '@nestjs/common';
import { JOB_REGISTRY, type RegisteredJobName } from './index';

@Injectable()
export class DocumentsQueueProcessor {
  private readonly logger = new Logger(DocumentsQueueProcessor.name);

  async dispatch(jobName: RegisteredJobName, payload: unknown): Promise<void> {
    const HandlerClass = JOB_REGISTRY[jobName];
    if (!HandlerClass) {
      throw new Error(`Unknown job: ${jobName}`);
    }
    const handler = new HandlerClass();
    this.logger.log(`Dispatching ${jobName} on documents queue`);
    await handler.execute(payload as never, { workerId: 'documents-worker-1' });
  }

  supportedJobs(): RegisteredJobName[] {
    return ['DocumentVirusScanJob'];
  }
}

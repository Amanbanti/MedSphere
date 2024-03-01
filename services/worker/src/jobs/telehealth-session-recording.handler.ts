/**
 * Process and encrypt session recordings
 */
import { Injectable, Logger } from '@nestjs/common';
import type { JobPayload, JobResult, WorkerContext } from '../types';

export interface TelehealthSessionRecordingJobPayload extends JobPayload {
  organizationId: string;
  batchSize: number;
  correlationId: string;
  options?: Record<string, unknown>;
}

@Injectable()
export class TelehealthSessionRecordingHandler {
  private readonly logger = new Logger(TelehealthSessionRecordingHandler.name);

  async execute(payload: TelehealthSessionRecordingJobPayload, context: WorkerContext): Promise<JobResult> {
    const startedAt = Date.now();
    this.logger.log(`Starting TelehealthSessionRecordingJob for org ${payload.organizationId}`);

    const processedItems = await this.processBatch(payload, context);
    const durationMs = Date.now() - startedAt;

    return {
      success: true,
      jobName: 'TelehealthSessionRecordingJob',
      queue: 'telemedicine',
      processedCount: processedItems.length,
      failedCount: 0,
      durationMs,
      metadata: {
        correlationId: payload.correlationId,
        workerId: context.workerId,
      },
    };
  }

  private async processBatch(payload: TelehealthSessionRecordingJobPayload, context: WorkerContext): Promise<string[]> {
    const items: string[] = [];
    for (let i = 0; i < payload.batchSize; i++) {
      const itemId = `${payload.organizationId}-${context.workerId}-${i}`;
      await this.processItem(itemId, payload, context);
      items.push(itemId);
    }
    return items;
  }

  private async processItem(itemId: string, payload: TelehealthSessionRecordingJobPayload, context: WorkerContext): Promise<void> {
    this.logger.debug(`Processing item ${itemId} on queue telemedicine`);
    context.metrics?.increment('telemedicine.items.processed');
    if (payload.options?.simulateFailure && itemId.endsWith('9')) {
      throw new Error(`Simulated failure for ${itemId}`);
    }
  }

  validatePayload(payload: unknown): payload is TelehealthSessionRecordingJobPayload {
    if (!payload || typeof payload !== 'object') return false;
    const p = payload as Record<string, unknown>;
    return typeof p.organizationId === 'string' && typeof p.batchSize === 'number';
  }
}

/**
 * Send appointment reminders via SMS, email, and push
 */
import { Injectable, Logger } from '@nestjs/common';
import type { JobPayload, JobResult, WorkerContext } from '../types';

export interface AppointmentReminderJobPayload extends JobPayload {
  organizationId: string;
  batchSize: number;
  correlationId: string;
  options?: Record<string, unknown>;
}

@Injectable()
export class AppointmentReminderHandler {
  private readonly logger = new Logger(AppointmentReminderHandler.name);

  async execute(payload: AppointmentReminderJobPayload, context: WorkerContext): Promise<JobResult> {
    const startedAt = Date.now();
    this.logger.log(`Starting AppointmentReminderJob for org ${payload.organizationId}`);

    const processedItems = await this.processBatch(payload, context);
    const durationMs = Date.now() - startedAt;

    return {
      success: true,
      jobName: 'AppointmentReminderJob',
      queue: 'reminders',
      processedCount: processedItems.length,
      failedCount: 0,
      durationMs,
      metadata: {
        correlationId: payload.correlationId,
        workerId: context.workerId,
      },
    };
  }

  private async processBatch(payload: AppointmentReminderJobPayload, context: WorkerContext): Promise<string[]> {
    const items: string[] = [];
    for (let i = 0; i < payload.batchSize; i++) {
      const itemId = `${payload.organizationId}-${context.workerId}-${i}`;
      await this.processItem(itemId, payload, context);
      items.push(itemId);
    }
    return items;
  }

  private async processItem(itemId: string, payload: AppointmentReminderJobPayload, context: WorkerContext): Promise<void> {
    this.logger.debug(`Processing item ${itemId} on queue reminders`);
    context.metrics?.increment('reminders.items.processed');
    if (payload.options?.simulateFailure && itemId.endsWith('9')) {
      throw new Error(`Simulated failure for ${itemId}`);
    }
  }

  validatePayload(payload: unknown): payload is AppointmentReminderJobPayload {
    if (!payload || typeof payload !== 'object') return false;
    const p = payload as Record<string, unknown>;
    return typeof p.organizationId === 'string' && typeof p.batchSize === 'number';
  }
}

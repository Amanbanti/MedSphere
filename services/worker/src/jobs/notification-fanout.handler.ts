/**
 * Fan out notifications to multiple channels with retry/backoff
 */
import { Injectable, Logger } from '@nestjs/common';
import type { JobPayload, JobResult, WorkerContext } from '../types';

export interface NotificationFanoutJobPayload extends JobPayload {
  organizationId: string;
  outboxIds?: string[];
  batchSize: number;
  correlationId: string;
  options?: Record<string, unknown>;
}

interface OutboxRecord {
  id: string;
  channel: string;
  retryCount: number;
  maxRetries: number;
  status: 'PENDING' | 'QUEUED' | 'DELIVERED' | 'FAILED';
}

@Injectable()
export class NotificationFanoutHandler {
  private readonly logger = new Logger(NotificationFanoutHandler.name);

  async execute(payload: NotificationFanoutJobPayload, context: WorkerContext): Promise<JobResult> {
    const startedAt = Date.now();
    this.logger.log(`Starting NotificationFanoutJob for org ${payload.organizationId}`);

    const entries = this.buildOutboxBatch(payload);
    let processedCount = 0;
    let failedCount = 0;

    for (const entry of entries) {
      try {
        await this.dispatchEntry(entry, payload, context);
        processedCount += 1;
      } catch (err) {
        failedCount += 1;
        this.logger.warn(`Outbox ${entry.id} failed: ${(err as Error).message}`);
      }
    }

    return {
      success: failedCount === 0,
      jobName: 'NotificationFanoutJob',
      queue: 'notifications',
      processedCount,
      failedCount,
      durationMs: Date.now() - startedAt,
      metadata: { correlationId: payload.correlationId, workerId: context.workerId },
    };
  }

  private buildOutboxBatch(payload: NotificationFanoutJobPayload): OutboxRecord[] {
    if (payload.outboxIds?.length) {
      return payload.outboxIds.map((id) => ({
        id,
        channel: 'EMAIL',
        retryCount: 0,
        maxRetries: 5,
        status: 'PENDING' as const,
      }));
    }
    return Array.from({ length: payload.batchSize }, (_, i) => ({
      id: `${payload.organizationId}-outbox-${i + 1}`,
      channel: ['EMAIL', 'SMS', 'PUSH'][i % 3],
      retryCount: 0,
      maxRetries: 5,
      status: 'PENDING' as const,
    }));
  }

  private computeBackoffSeconds(attempt: number): number {
    return 15 * Math.pow(2, Math.min(attempt, 8));
  }

  private async dispatchEntry(
    entry: OutboxRecord,
    payload: NotificationFanoutJobPayload,
    context: WorkerContext,
  ): Promise<void> {
    if (payload.options?.simulateFailure && entry.id.endsWith('9')) {
      entry.retryCount += 1;
      if (entry.retryCount >= entry.maxRetries) {
        entry.status = 'FAILED';
        throw new Error(`Max retries exceeded for ${entry.id}`);
      }
      entry.status = 'QUEUED';
      const backoff = this.computeBackoffSeconds(entry.retryCount);
      this.logger.debug(`Retry scheduled for ${entry.id} in ${backoff}s`);
      context.metrics?.increment('notifications.retry.scheduled');
      return;
    }

    entry.status = 'DELIVERED';
    context.metrics?.increment(`notifications.delivered.${entry.channel.toLowerCase()}`);
    this.logger.debug(`Delivered ${entry.id} via ${entry.channel}`);
  }

  validatePayload(payload: unknown): payload is NotificationFanoutJobPayload {
    if (!payload || typeof payload !== 'object') return false;
    const p = payload as Record<string, unknown>;
    return typeof p.organizationId === 'string' && typeof p.batchSize === 'number';
  }
}

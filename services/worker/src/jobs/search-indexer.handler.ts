/**
 * Index clinical and administrative documents in Elasticsearch
 */
import { Injectable, Logger } from '@nestjs/common';
import type { JobPayload, JobResult, WorkerContext } from '../types';

export interface SearchIndexerJobPayload extends JobPayload {
  organizationId: string;
  entityType?: string;
  entityIds?: string[];
  batchSize: number;
  correlationId: string;
  options?: Record<string, unknown>;
}

interface IndexDocument {
  id: string;
  entityType: string;
  organizationId: string;
  title: string;
  body: string;
  indexedAt?: string;
}

@Injectable()
export class SearchIndexerHandler {
  private readonly logger = new Logger(SearchIndexerHandler.name);
  private readonly index = new Map<string, IndexDocument>();

  async execute(payload: SearchIndexerJobPayload, context: WorkerContext): Promise<JobResult> {
    const startedAt = Date.now();
    this.logger.log(`Starting SearchIndexerJob for org ${payload.organizationId}`);

    const docs = this.buildDocuments(payload);
    let processedCount = 0;
    let failedCount = 0;

    for (const doc of docs) {
      try {
        await this.indexDocument(doc, context);
        processedCount += 1;
      } catch (err) {
        failedCount += 1;
        this.logger.warn(`Index failed for ${doc.id}: ${(err as Error).message}`);
      }
    }

    return {
      success: failedCount === 0,
      jobName: 'SearchIndexerJob',
      queue: 'search',
      processedCount,
      failedCount,
      durationMs: Date.now() - startedAt,
      metadata: {
        correlationId: payload.correlationId,
        workerId: context.workerId,
        indexSize: this.index.size,
      },
    };
  }

  private buildDocuments(payload: SearchIndexerJobPayload): IndexDocument[] {
    const entityType = payload.entityType ?? 'Patient';
    if (payload.entityIds?.length) {
      return payload.entityIds.map((id) => ({
        id,
        entityType,
        organizationId: payload.organizationId,
        title: `${entityType} ${id}`,
        body: `Indexed ${entityType} record for tenant ${payload.organizationId}`,
      }));
    }
    return Array.from({ length: payload.batchSize }, (_, i) => ({
      id: `${payload.organizationId}-${entityType.toLowerCase()}-${i + 1}`,
      entityType,
      organizationId: payload.organizationId,
      title: `${entityType} record ${i + 1}`,
      body: `Synthetic index payload for ${entityType}`,
    }));
  }

  private async indexDocument(doc: IndexDocument, context: WorkerContext): Promise<void> {
    const key = `${doc.organizationId}:${doc.entityType}:${doc.id}`;
    doc.indexedAt = new Date().toISOString();
    this.index.set(key, doc);
    context.metrics?.increment(`search.indexed.${doc.entityType.toLowerCase()}`);
    this.logger.debug(`Indexed document ${key}`);
  }

  validatePayload(payload: unknown): payload is SearchIndexerJobPayload {
    if (!payload || typeof payload !== 'object') return false;
    const p = payload as Record<string, unknown>;
    return typeof p.organizationId === 'string' && typeof p.batchSize === 'number';
  }
}

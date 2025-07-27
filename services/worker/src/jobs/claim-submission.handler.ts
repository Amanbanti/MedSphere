/**
 * Submit electronic claims to clearinghouse
 */
import { Injectable, Logger } from '@nestjs/common';
import { ClaimWorkflowService, ClaimStatus } from '@medsphere/shared';
import type { JobPayload, JobResult, WorkerContext } from '../types';

export interface ClaimSubmissionJobPayload extends JobPayload {
  organizationId: string;
  claimIds?: string[];
  batchSize: number;
  correlationId: string;
  options?: Record<string, unknown>;
}

interface ClaimRecord {
  id: string;
  status: ClaimStatus;
}

@Injectable()
export class ClaimSubmissionHandler {
  private readonly logger = new Logger(ClaimSubmissionHandler.name);
  private readonly pendingClaims = new Map<string, ClaimRecord[]>();

  async execute(payload: ClaimSubmissionJobPayload, context: WorkerContext): Promise<JobResult> {
    const startedAt = Date.now();
    this.logger.log(`Starting ClaimSubmissionJob for org ${payload.organizationId}`);

    const claims = this.loadDraftClaims(payload);
    let processedCount = 0;
    let failedCount = 0;

    for (const claim of claims) {
      try {
        const nextStatus = ClaimWorkflowService.submit(claim.status);
        claim.status = nextStatus;
        this.logger.debug(`Claim ${claim.id} submitted → ${nextStatus}`);
        context.metrics?.increment('billing.claims.submitted');
        processedCount += 1;
      } catch (err) {
        failedCount += 1;
        this.logger.warn(`Claim ${claim.id} submission failed: ${(err as Error).message}`);
        context.metrics?.increment('billing.claims.failed');
      }
    }

    return {
      success: failedCount === 0,
      jobName: 'ClaimSubmissionJob',
      queue: 'billing',
      processedCount,
      failedCount,
      durationMs: Date.now() - startedAt,
      metadata: {
        correlationId: payload.correlationId,
        workerId: context.workerId,
        organizationId: payload.organizationId,
      },
    };
  }

  private loadDraftClaims(payload: ClaimSubmissionJobPayload): ClaimRecord[] {
    if (payload.claimIds?.length) {
      return payload.claimIds.map((id) => ({ id, status: ClaimStatus.DRAFT }));
    }
    const cacheKey = payload.organizationId;
    if (!this.pendingClaims.has(cacheKey)) {
      const synthetic = Array.from({ length: payload.batchSize }, (_, i) => ({
        id: `${payload.organizationId}-claim-${i + 1}`,
        status: ClaimStatus.DRAFT,
      }));
      this.pendingClaims.set(cacheKey, synthetic);
    }
    return this.pendingClaims.get(cacheKey)!.filter((c) => c.status === ClaimStatus.DRAFT);
  }

  validatePayload(payload: unknown): payload is ClaimSubmissionJobPayload {
    if (!payload || typeof payload !== 'object') return false;
    const p = payload as Record<string, unknown>;
    return typeof p.organizationId === 'string' && typeof p.batchSize === 'number';
  }
}

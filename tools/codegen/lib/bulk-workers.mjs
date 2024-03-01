import { createRng, pick, escapeTs } from './bulk-seed.mjs';
import { writeFile } from './expansion-utils.mjs';

const JOB_DEFINITIONS = [
  { name: 'AppointmentReminderJob', queue: 'reminders', description: 'Send appointment reminders via SMS, email, and push' },
  { name: 'OutboxPublisherJob', queue: 'outbox', description: 'Publish domain events from transactional outbox' },
  { name: 'SearchIndexerJob', queue: 'search', description: 'Index clinical and administrative documents in Elasticsearch' },
  { name: 'AnalyticsRollupJob', queue: 'analytics', description: 'Aggregate operational metrics into warehouse tables' },
  { name: 'DocumentVirusScanJob', queue: 'documents', description: 'Scan uploaded clinical documents (metadata stub integration)' },
  { name: 'ClaimSubmissionJob', queue: 'billing', description: 'Submit electronic claims to clearinghouse' },
  { name: 'NotificationFanoutJob', queue: 'notifications', description: 'Fan out notifications to multiple channels' },
  { name: 'LabResultCriticalAlertJob', queue: 'clinical', description: 'Escalate critical lab values to care team' },
  { name: 'PrescriptionRefillReminderJob', queue: 'pharmacy', description: 'Remind patients of upcoming refill dates' },
  { name: 'InsuranceEligibilityRefreshJob', queue: 'insurance', description: 'Refresh payer eligibility snapshots' },
  { name: 'ImagingStudyPrefetchJob', queue: 'radiology', description: 'Prefetch DICOM studies for radiologist worklist' },
  { name: 'AuditLogArchivalJob', queue: 'audit', description: 'Archive audit logs to cold storage' },
  { name: 'PatientMergeReconciliationJob', queue: 'patient', description: 'Reconcile duplicate patient records post-merge' },
  { name: 'TelehealthSessionRecordingJob', queue: 'telemedicine', description: 'Process and encrypt session recordings' },
  { name: 'FormularyUpdateSyncJob', queue: 'pharmacy', description: 'Sync formulary updates from payer feeds' },
  { name: 'BedCapacityForecastJob', queue: 'analytics', description: 'Forecast inpatient bed capacity' },
  { name: 'CarePlanReviewReminderJob', queue: 'clinical', description: 'Notify care managers of overdue plan reviews' },
  { name: 'PriorAuthExpirationJob', queue: 'insurance', description: 'Alert on expiring prior authorizations' },
  { name: 'MedicationAdministrationSyncJob', queue: 'clinical', description: 'Sync MAR entries from bedside devices' },
  { name: 'ReportExportJob', queue: 'analytics', description: 'Generate scheduled report exports' },
];

function generateJobHandler(job) {
  const className = job.name.replace(/Job$/, 'Handler');
  return `/**
 * ${job.description}
 */
import { Injectable, Logger } from '@nestjs/common';
import type { JobPayload, JobResult, WorkerContext } from '../types';

export interface ${job.name}Payload extends JobPayload {
  organizationId: string;
  batchSize: number;
  correlationId: string;
  options?: Record<string, unknown>;
}

@Injectable()
export class ${className} {
  private readonly logger = new Logger(${className}.name);

  async execute(payload: ${job.name}Payload, context: WorkerContext): Promise<JobResult> {
    const startedAt = Date.now();
    this.logger.log(\`Starting ${job.name} for org \${payload.organizationId}\`);

    const processedItems = await this.processBatch(payload, context);
    const durationMs = Date.now() - startedAt;

    return {
      success: true,
      jobName: '${job.name}',
      queue: '${job.queue}',
      processedCount: processedItems.length,
      failedCount: 0,
      durationMs,
      metadata: {
        correlationId: payload.correlationId,
        workerId: context.workerId,
      },
    };
  }

  private async processBatch(payload: ${job.name}Payload, context: WorkerContext): Promise<string[]> {
    const items: string[] = [];
    for (let i = 0; i < payload.batchSize; i++) {
      const itemId = \`\${payload.organizationId}-\${context.workerId}-\${i}\`;
      await this.processItem(itemId, payload, context);
      items.push(itemId);
    }
    return items;
  }

  private async processItem(itemId: string, payload: ${job.name}Payload, context: WorkerContext): Promise<void> {
    this.logger.debug(\`Processing item \${itemId} on queue ${job.queue}\`);
    context.metrics?.increment('${job.queue}.items.processed');
    if (payload.options?.simulateFailure && itemId.endsWith('9')) {
      throw new Error(\`Simulated failure for \${itemId}\`);
    }
  }

  validatePayload(payload: unknown): payload is ${job.name}Payload {
    if (!payload || typeof payload !== 'object') return false;
    const p = payload as Record<string, unknown>;
    return typeof p.organizationId === 'string' && typeof p.batchSize === 'number';
  }
}
`;
}

function generateJobTest(job) {
  const className = job.name.replace(/Job$/, 'Handler');
  return `import { ${className} } from '../../src/jobs/${kebab(job.name.replace(/Job$/, ''))}.handler';

describe('${className}', () => {
  const handler = new ${className}();
  const context = { workerId: 'worker-test-1', metrics: { increment: jest.fn() } };

  it('executes ${job.name} successfully', async () => {
    const result = await handler.execute(
      { organizationId: 'org-1', batchSize: 3, correlationId: 'corr-1' },
      context as never,
    );
    expect(result.success).toBe(true);
    expect(result.processedCount).toBe(3);
    expect(result.queue).toBe('${job.queue}');
  });

  it('validates payload shape', () => {
    expect(handler.validatePayload({ organizationId: 'org-1', batchSize: 5, correlationId: 'c' })).toBe(true);
    expect(handler.validatePayload(null)).toBe(false);
    expect(handler.validatePayload({ batchSize: 5 })).toBe(false);
  });

  it.each([
    { batchSize: 1, expected: 1 },
    { batchSize: 5, expected: 5 },
    { batchSize: 10, expected: 10 },
  ])('processes batchSize $batchSize items', async ({ batchSize, expected }) => {
    const result = await handler.execute(
      { organizationId: 'org-2', batchSize, correlationId: 'corr-2' },
      context as never,
    );
    expect(result.processedCount).toBe(expected);
  });
});
`;
}

function kebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/[_\s]+/g, '-').toLowerCase();
}

function generateJobRegistry(jobs) {
  const imports = jobs.map((j) => {
    const className = j.name.replace(/Job$/, 'Handler');
    const file = kebab(j.name.replace(/Job$/, ''));
    return `import { ${className} } from './${file}.handler';`;
  }).join('\n');

  const registry = jobs.map((j) => {
    const className = j.name.replace(/Job$/, 'Handler');
    return `  '${j.name}': ${className},`;
  }).join('\n');

  return `${imports}

export const JOB_REGISTRY = {
${registry}
} as const;

export type RegisteredJobName = keyof typeof JOB_REGISTRY;

export const QUEUE_MAPPINGS: Record<string, RegisteredJobName[]> = {
${[...new Set(jobs.map((j) => j.queue))].map((q) => {
    const jobNames = jobs.filter((j) => j.queue === q).map((j) => `'${j.name}'`).join(', ');
    return `  '${q}': [${jobNames}],`;
  }).join('\n')}
};
`;
}

function generateWorkerTypes() {
  return `export interface JobPayload {
  [key: string]: unknown;
}

export interface JobResult {
  success: boolean;
  jobName: string;
  queue: string;
  processedCount: number;
  failedCount: number;
  durationMs: number;
  metadata: Record<string, unknown>;
}

export interface WorkerContext {
  workerId: string;
  metrics?: {
    increment: (name: string) => void;
    timing: (name: string, ms: number) => void;
  };
}
`;
}

function generateQueueProcessor(queue, jobs) {
  const queueJobs = jobs.filter((j) => j.queue === queue);
  return `/**
 * Queue processor for ${queue} queue
 */
import { Injectable, Logger } from '@nestjs/common';
import { JOB_REGISTRY, type RegisteredJobName } from './index';

@Injectable()
export class ${pascal(queue)}QueueProcessor {
  private readonly logger = new Logger(${pascal(queue)}QueueProcessor.name);

  async dispatch(jobName: RegisteredJobName, payload: unknown): Promise<void> {
    const HandlerClass = JOB_REGISTRY[jobName];
    if (!HandlerClass) {
      throw new Error(\`Unknown job: \${jobName}\`);
    }
    const handler = new HandlerClass();
    this.logger.log(\`Dispatching \${jobName} on ${queue} queue\`);
    await handler.execute(payload as never, { workerId: '${queue}-worker-1' });
  }

  supportedJobs(): RegisteredJobName[] {
    return [${queueJobs.map((j) => `'${j.name}'`).join(', ')}];
  }
}
`;
}

function pascal(str) {
  return str.split(/[-_]/).map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

export async function generateWorkerJobs(root, stats) {
  await writeFile(root, 'services/worker/src/jobs/types.ts', generateWorkerTypes(), stats);

  for (const job of JOB_DEFINITIONS) {
    const file = kebab(job.name.replace(/Job$/, ''));
    await writeFile(root, `services/worker/src/jobs/${file}.handler.ts`, generateJobHandler(job), stats);
    await writeFile(root, `services/worker/test/unit/jobs/${file}.handler.spec.ts`, generateJobTest(job), stats);
  }

  await writeFile(root, 'services/worker/src/jobs/index.ts', generateJobRegistry(JOB_DEFINITIONS), stats);

  const queues = [...new Set(JOB_DEFINITIONS.map((j) => j.queue))];
  for (const queue of queues) {
    await writeFile(root, `services/worker/src/jobs/processors/${queue}.processor.ts`, generateQueueProcessor(queue, JOB_DEFINITIONS), stats);
  }

  const processorIndex = queues.map((q) => `export * from './${q}.processor';`).join('\n');
  await writeFile(root, 'services/worker/src/jobs/processors/index.ts', processorIndex + '\n', stats);
}

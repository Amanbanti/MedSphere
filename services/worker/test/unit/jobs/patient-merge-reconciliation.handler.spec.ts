import { PatientMergeReconciliationHandler } from '../../src/jobs/patient-merge-reconciliation.handler';

describe('PatientMergeReconciliationHandler', () => {
  const handler = new PatientMergeReconciliationHandler();
  const context = { workerId: 'worker-test-1', metrics: { increment: jest.fn() } };

  it('executes PatientMergeReconciliationJob successfully', async () => {
    const result = await handler.execute(
      { organizationId: 'org-1', batchSize: 3, correlationId: 'corr-1' },
      context as never,
    );
    expect(result.success).toBe(true);
    expect(result.processedCount).toBe(3);
    expect(result.queue).toBe('patient');
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

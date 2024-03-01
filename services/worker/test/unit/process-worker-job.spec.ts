import { ProcessWorkerJobUseCase } from '../../src/application/use-cases/process-worker-job.use-case';
import { WorkerTask } from '../../src/domain/entities/worker-task.entity';
import { WorkerNotFoundError } from '../../src/domain/errors/worker.errors';

describe('ProcessWorkerJobUseCase', () => {
  const organizationId = '22222222-2222-4222-8222-222222222222' as const;
  const actorId = '11111111-1111-4111-8111-111111111111' as const;
  const correlationId = '33333333-3333-4333-8333-333333333333';

  const repository = {
    save: jest.fn(),
    findById: jest.fn(),
    list: jest.fn().mockResolvedValue({ items: [], meta: { page: 1, pageSize: 20, totalItems: 0, totalPages: 1, hasNext: false, hasPrevious: false } }),
  };

  let useCase: ProcessWorkerJobUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new ProcessWorkerJobUseCase(repository as never);
  });

  it('creates or updates domain records', async () => {
    const now = new Date().toISOString();
    const entity = WorkerTask.register({
      id: '44444444-4444-4444-8444-444444444444' as never,
      organizationId: organizationId as never,
      now: now as never,
      ...(Object.fromEntries(
        ["handlerName","jobId","payload","status","startedAt","completedAt","errorMessage"].map((key) => {
          if (key.includes('status')) return [key, 'ACTIVE'];
          if (key.includes('At') || key === 'dateOfBirth' || key === 'dueDate' || key === 'effectiveFrom') return [key, now];
          if (key.includes('Cents') || key.includes('Minutes') || key.includes('Days') || key.includes('Count') || key === 'attempts' || key === 'dayOfWeek') return [key, 1];
          if (key === 'payload' || key === 'metadata' || key === 'tags') return [key, key === 'tags' ? [] : {}];
          if (key.includes('Id')) return [key, organizationId];
          return [key, 'sample-value'];
        }),
      ) as Record<string, unknown>),
    } as Parameters<typeof WorkerTask.register>[0]);

    repository.findById.mockResolvedValue(entity);
    repository.save.mockResolvedValue(undefined);

    const result = await useCase.execute({
      organizationId: organizationId as never,
      actorId: actorId as never,
      correlationId,
      id: entity.id,
      payload: {},
    } as import('../../src/application/commands/process-worker-job.command').ProcessWorkerJobCommand);

    expect(repository.save).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  it('throws when entity is missing', async () => {
    repository.findById.mockResolvedValue(null);
    await expect(
      useCase.execute({
        organizationId: organizationId as never,
        actorId: actorId as never,
        correlationId,
        id: '99999999-9999-4999-8999-999999999999' as never,
      } as never),
    ).rejects.toBeInstanceOf(WorkerNotFoundError);
  });
});

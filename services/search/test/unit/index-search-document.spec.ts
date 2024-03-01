import { IndexSearchDocumentUseCase } from '../../src/application/use-cases/index-search-document.use-case';
import { SearchDocument } from '../../src/domain/entities/search-document.entity';
import { SearchNotFoundError } from '../../src/domain/errors/search.errors';

describe('IndexSearchDocumentUseCase', () => {
  const organizationId = '22222222-2222-4222-8222-222222222222' as const;
  const actorId = '11111111-1111-4111-8111-111111111111' as const;
  const correlationId = '33333333-3333-4333-8333-333333333333';

  const repository = {
    save: jest.fn(),
    findById: jest.fn(),
    list: jest.fn().mockResolvedValue({ items: [], meta: { page: 1, pageSize: 20, totalItems: 0, totalPages: 1, hasNext: false, hasPrevious: false } }),
  };

  let useCase: IndexSearchDocumentUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new IndexSearchDocumentUseCase(repository as never);
  });

  it('creates or updates domain records', async () => {
    const now = new Date().toISOString();
    const entity = SearchDocument.register({
      id: '44444444-4444-4444-8444-444444444444' as never,
      organizationId: organizationId as never,
      now: now as never,
      ...(Object.fromEntries(
        ["documentType","resourceId","title","content","indexedAt","tags"].map((key) => {
          if (key.includes('status')) return [key, 'ACTIVE'];
          if (key.includes('At') || key === 'dateOfBirth' || key === 'dueDate' || key === 'effectiveFrom') return [key, now];
          if (key.includes('Cents') || key.includes('Minutes') || key.includes('Days') || key.includes('Count') || key === 'attempts' || key === 'dayOfWeek') return [key, 1];
          if (key === 'payload' || key === 'metadata' || key === 'tags') return [key, key === 'tags' ? [] : {}];
          if (key.includes('Id')) return [key, organizationId];
          return [key, 'sample-value'];
        }),
      ) as Record<string, unknown>),
    } as Parameters<typeof SearchDocument.register>[0]);

    repository.findById.mockResolvedValue(entity);
    repository.save.mockResolvedValue(undefined);

    const result = await useCase.execute({
      organizationId: organizationId as never,
      actorId: actorId as never,
      correlationId,
      id: entity.id,
      payload: {},
    } as import('../../src/application/commands/index-search-document.command').IndexSearchDocumentCommand);

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
    ).rejects.toBeInstanceOf(SearchNotFoundError);
  });
});

import { SearchByCriteriaUseCase } from '../../src/application/use-cases/search-by-criteria-use-case.use-case';
import { SearchByCriteriaCommand } from '../../src/application/commands/search-by-criteria.command';
import type { JwtAccessPayload, UUID } from '@medsphere/shared';

describe('SearchByCriteriaUseCase', () => {
  const actor = {
    sub: 'user-1' as UUID,
    orgId: 'org-1' as UUID,
    facilityIds: [],
    roles: ['ORG_ADMIN'],
    permissions: [],
    sessionId: 'sess-1' as UUID,
    mfaVerified: true,
    iat: 0,
    exp: 999999,
    iss: 'medsphere',
    aud: 'medsphere',
  } as JwtAccessPayload;

  const mockRepository = {
    findById: jest.fn(),
    list: jest.fn().mockResolvedValue({ data: [], meta: { page: 1, pageSize: 25, totalItems: 0, totalPages: 0, hasNext: false, hasPrevious: false } }),
    save: jest.fn(),
  };

  const mockOrchestrator = {
    getOrThrow: jest.fn().mockResolvedValue({
      touch: jest.fn(),
      assertActive: jest.fn(),
    }),
  };

  let useCase: SearchByCriteriaUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new SearchByCriteriaUseCase(mockRepository as never, mockOrchestrator as never);
  });

  it('executes searchByCriteria for authorized actor', async () => {
    const command = new SearchByCriteriaCommand(
      actor,
      'org-1' as UUID,
      'analyticsevent-1' as UUID,
      { reason: 'test' },
    );
    const result = await useCase.execute(command);
    expect(result).toBeDefined();
  });

  it('rejects cross-tenant access', async () => {
    const badActor = { ...actor, orgId: 'other-org' as UUID };
    const command = new SearchByCriteriaCommand(badActor, 'org-1' as UUID, 'id-1' as UUID);
    await expect(useCase.execute(command)).rejects.toThrow();
  });
});

import { SyncExternalSystemUseCase } from '../../src/application/use-cases/sync-external-system-use-case.use-case';
import { SyncExternalSystemCommand } from '../../src/application/commands/sync-external-system.command';
import type { JwtAccessPayload, UUID } from '@medsphere/shared';

describe('SyncExternalSystemUseCase', () => {
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

  let useCase: SyncExternalSystemUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new SyncExternalSystemUseCase(mockRepository as never, mockOrchestrator as never);
  });

  it('executes syncExternal for authorized actor', async () => {
    const command = new SyncExternalSystemCommand(
      actor,
      'org-1' as UUID,
      'paymenttransaction-1' as UUID,
      { reason: 'test' },
    );
    await useCase.execute(command);
    expect(mockOrchestrator.getOrThrow).toHaveBeenCalled();
  });

  it('rejects cross-tenant access', async () => {
    const badActor = { ...actor, orgId: 'other-org' as UUID };
    const command = new SyncExternalSystemCommand(badActor, 'org-1' as UUID, 'id-1' as UUID);
    await expect(useCase.execute(command)).rejects.toThrow();
  });
});

import { RestoreQueueJobUseCase } from '../../src/application/use-cases/restore-queue-job-use-case.use-case';
import { RestoreQueueJobCommand } from '../../src/application/commands/restore-queue-job.command';
import type { JwtAccessPayload, UUID } from '@medsphere/shared';

describe('RestoreQueueJobUseCase', () => {
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

  let useCase: RestoreQueueJobUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new RestoreQueueJobUseCase(mockRepository as never, mockOrchestrator as never);
  });

  it('executes restore for authorized actor', async () => {
    const command = new RestoreQueueJobCommand(
      actor,
      'org-1' as UUID,
      'queuejob-1' as UUID,
      { reason: 'test' },
    );
    await useCase.execute(command);
    expect(mockOrchestrator.getOrThrow).toHaveBeenCalled();
  });

  it('rejects cross-tenant access', async () => {
    const badActor = { ...actor, orgId: 'other-org' as UUID };
    const command = new RestoreQueueJobCommand(badActor, 'org-1' as UUID, 'id-1' as UUID);
    await expect(useCase.execute(command)).rejects.toThrow();
  });
});

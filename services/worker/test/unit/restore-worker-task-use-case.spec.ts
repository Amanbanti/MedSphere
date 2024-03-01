import { RestoreWorkerTaskUseCase } from '../../src/application/use-cases/restore-worker-task-use-case.use-case';
import { RestoreWorkerTaskCommand } from '../../src/application/commands/restore-worker-task.command';
import type { JwtAccessPayload, UUID } from '@medsphere/shared';

describe('RestoreWorkerTaskUseCase', () => {
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

  let useCase: RestoreWorkerTaskUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new RestoreWorkerTaskUseCase(mockRepository as never, mockOrchestrator as never);
  });

  it('executes restore for authorized actor', async () => {
    const command = new RestoreWorkerTaskCommand(
      actor,
      'org-1' as UUID,
      'workertask-1' as UUID,
      { reason: 'test' },
    );
    await useCase.execute(command);
    expect(mockOrchestrator.getOrThrow).toHaveBeenCalled();
  });

  it('rejects cross-tenant access', async () => {
    const badActor = { ...actor, orgId: 'other-org' as UUID };
    const command = new RestoreWorkerTaskCommand(badActor, 'org-1' as UUID, 'id-1' as UUID);
    await expect(useCase.execute(command)).rejects.toThrow();
  });
});

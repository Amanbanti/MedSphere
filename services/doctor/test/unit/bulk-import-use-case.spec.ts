import { BulkImportUseCase } from '../../src/application/use-cases/bulk-import-use-case.use-case';
import { BulkImportCommand } from '../../src/application/commands/bulk-import.command';
import type { JwtAccessPayload, UUID } from '@medsphere/shared';

describe('BulkImportUseCase', () => {
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

  let useCase: BulkImportUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new BulkImportUseCase(mockRepository as never, mockOrchestrator as never);
  });

  it('executes bulkImport for authorized actor', async () => {
    const command = new BulkImportCommand(
      actor,
      'org-1' as UUID,
      'doctor-1' as UUID,
      { reason: 'test' },
    );
    await useCase.execute(command);
    expect(mockOrchestrator.getOrThrow).toHaveBeenCalled();
  });

  it('rejects cross-tenant access', async () => {
    const badActor = { ...actor, orgId: 'other-org' as UUID };
    const command = new BulkImportCommand(badActor, 'org-1' as UUID, 'id-1' as UUID);
    await expect(useCase.execute(command)).rejects.toThrow();
  });
});

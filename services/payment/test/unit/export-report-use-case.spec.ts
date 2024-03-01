import { ExportReportUseCase } from '../../src/application/use-cases/export-report-use-case.use-case';
import { ExportReportCommand } from '../../src/application/commands/export-report.command';
import type { JwtAccessPayload, UUID } from '@medsphere/shared';

describe('ExportReportUseCase', () => {
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

  let useCase: ExportReportUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new ExportReportUseCase(mockRepository as never, mockOrchestrator as never);
  });

  it('executes exportReport for authorized actor', async () => {
    const command = new ExportReportCommand(
      actor,
      'org-1' as UUID,
      'paymenttransaction-1' as UUID,
      { reason: 'test' },
    );
    const result = await useCase.execute(command);
    expect(result).toBeDefined();
  });

  it('rejects cross-tenant access', async () => {
    const badActor = { ...actor, orgId: 'other-org' as UUID };
    const command = new ExportReportCommand(badActor, 'org-1' as UUID, 'id-1' as UUID);
    await expect(useCase.execute(command)).rejects.toThrow();
  });
});

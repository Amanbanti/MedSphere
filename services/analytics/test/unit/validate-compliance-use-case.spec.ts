import { ValidateComplianceUseCase } from '../../src/application/use-cases/validate-compliance-use-case.use-case';
import { ValidateComplianceCommand } from '../../src/application/commands/validate-compliance.command';
import type { JwtAccessPayload, UUID } from '@medsphere/shared';

describe('ValidateComplianceUseCase', () => {
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

  let useCase: ValidateComplianceUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new ValidateComplianceUseCase(mockRepository as never, mockOrchestrator as never);
  });

  it('executes validateCompliance for authorized actor', async () => {
    const command = new ValidateComplianceCommand(
      actor,
      'org-1' as UUID,
      'analyticsevent-1' as UUID,
      { reason: 'test' },
    );
    await useCase.execute(command);
    expect(mockOrchestrator.getOrThrow).toHaveBeenCalled();
  });

  it('rejects cross-tenant access', async () => {
    const badActor = { ...actor, orgId: 'other-org' as UUID };
    const command = new ValidateComplianceCommand(badActor, 'org-1' as UUID, 'id-1' as UUID);
    await expect(useCase.execute(command)).rejects.toThrow();
  });
});

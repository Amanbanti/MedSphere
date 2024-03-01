import { LoginUseCase } from '../../src/application/use-cases/login.use-case';
import { User } from '../../src/domain/entities/user.entity';
import { Email } from '../../src/domain/value-objects/email.vo';
import {
  InvalidCredentialsError,
  MfaRequiredError,
} from '../../src/domain/errors/auth.errors';
import { UserStatus } from '@medsphere/shared';

jest.mock('@medsphere/auth-sdk', () => ({
  verifyPassword: jest.fn(),
  resolvePermissionsForRoles: jest.fn(() => ['USER:READ']),
}));

import { verifyPassword } from '@medsphere/auth-sdk';

describe('LoginUseCase', () => {
  const userId = '11111111-1111-4111-8111-111111111111';
  const organizationId = '22222222-2222-4222-8222-222222222222';
  const correlationId = '33333333-3333-4333-8333-333333333333';

  const userRepo = {
    findById: jest.fn(),
    findByEmail: jest.fn(),
    findByEmailGlobal: jest.fn(),
    save: jest.fn(),
    existsByEmail: jest.fn(),
  };

  const orgRepo = {
    findById: jest.fn(),
    findBySlug: jest.fn(),
  };

  const mfaRepo = {
    findActiveByUserId: jest.fn(),
    findByUserAndMethod: jest.fn(),
    saveEnrollment: jest.fn(),
    saveRecoveryCodes: jest.fn(),
    consumeRecoveryCode: jest.fn(),
    createChallenge: jest.fn(),
    findChallengeById: jest.fn(),
    consumeChallenge: jest.fn(),
  };

  const outboxRepo = { append: jest.fn() };
  const auditRepo = { append: jest.fn() };
  const roleRepo = {
    findActiveByUserId: jest.fn().mockResolvedValue([{ role: 'DOCTOR' }]),
  };

  const tokenIssuance = {
    issueTokens: jest.fn().mockResolvedValue({
      accessToken: 'access',
      refreshToken: 'refresh',
      tokenType: 'Bearer',
      expiresIn: 900,
      sessionId: '44444444-4444-4444-8444-444444444444',
    }),
  };

  const totpService = {
    verify: jest.fn(),
    generateSecret: jest.fn(),
    buildOtpAuthUrl: jest.fn(),
  };

  let useCase: LoginUseCase;

  function buildUser(overrides: Partial<{ mfaEnabled: boolean }> = {}) {
    const now = new Date().toISOString();
    return User.create({
      id: userId,
      organizationId,
      email: Email.create('doctor@hospital.com'),
      passwordHash: 'scrypt$16384$8$1$salt$hash',
      firstName: 'Jane',
      lastName: 'Doe',
      displayName: 'Jane Doe',
      phone: null,
      status: UserStatus.ACTIVE,
      emailVerifiedAt: now,
      mfaEnabled: overrides.mfaEnabled ?? false,
      failedLoginCount: 0,
      lockedUntil: null,
      lastLoginAt: null,
      passwordChangedAt: now,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      version: 1,
    });
  }

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new LoginUseCase(
      userRepo as never,
      orgRepo as never,
      mfaRepo as never,
      outboxRepo as never,
      auditRepo as never,
      roleRepo as never,
      tokenIssuance as never,
      totpService as never,
    );
  });

  it('returns tokens on successful login', async () => {
    const user = buildUser();
    userRepo.findByEmailGlobal.mockResolvedValue(user);
    (verifyPassword as jest.Mock).mockResolvedValue(true);
    userRepo.save.mockResolvedValue(undefined);
    outboxRepo.append.mockResolvedValue(undefined);
    auditRepo.append.mockResolvedValue(undefined);

    const result = await useCase.execute({
      email: 'doctor@hospital.com',
      password: 'SecurePass123!',
      correlationId,
    });

    expect(result.tokens?.accessToken).toBe('access');
    expect(result.user?.email).toBe('doctor@hospital.com');
    expect(tokenIssuance.issueTokens).toHaveBeenCalled();
  });

  it('throws on invalid password', async () => {
    userRepo.findByEmailGlobal.mockResolvedValue(buildUser());
    (verifyPassword as jest.Mock).mockResolvedValue(false);
    userRepo.save.mockResolvedValue(undefined);
    outboxRepo.append.mockResolvedValue(undefined);
    auditRepo.append.mockResolvedValue(undefined);

    await expect(
      useCase.execute({
        email: 'doctor@hospital.com',
        password: 'WrongPass123!',
        correlationId,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('throws MfaRequiredError when MFA enabled without code', async () => {
    userRepo.findByEmailGlobal.mockResolvedValue(buildUser({ mfaEnabled: true }));
    (verifyPassword as jest.Mock).mockResolvedValue(true);
    mfaRepo.createChallenge.mockResolvedValue(undefined);
    mfaRepo.findActiveByUserId.mockResolvedValue([{ method: 'TOTP' }]);

    await expect(
      useCase.execute({
        email: 'doctor@hospital.com',
        password: 'SecurePass123!',
        correlationId,
      }),
    ).rejects.toBeInstanceOf(MfaRequiredError);
  });
});

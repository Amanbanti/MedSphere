import { EnrollMfaUseCase } from '../../src/application/use-cases/enroll-mfa.use-case';
import { User } from '../../src/domain/entities/user.entity';
import { Email } from '../../src/domain/value-objects/email.vo';
import { ConflictError, NotFoundError } from '../../src/domain/errors/auth.errors';
import { MfaMethod, UserStatus } from '@medsphere/shared';

jest.mock('@medsphere/auth-sdk', () => ({
  hashPassword: jest.fn().mockResolvedValue('hashed'),
  generateSecureToken: jest.fn().mockReturnValue('recovery-code'),
}));

describe('EnrollMfaUseCase', () => {
  const userId = '11111111-1111-4111-8111-111111111111';
  const organizationId = '22222222-2222-4222-8222-222222222222';
  const correlationId = '33333333-3333-4333-8333-333333333333';

  const userRepo = { findById: jest.fn(), save: jest.fn() };
  const mfaRepo = {
    findActiveByUserId: jest.fn(),
    findByUserAndMethod: jest.fn(),
    saveEnrollment: jest.fn(),
    saveRecoveryCodes: jest.fn(),
  };
  const outboxRepo = { append: jest.fn() };
  const auditRepo = { append: jest.fn() };
  const totpService = {
    generateSecret: jest.fn().mockReturnValue('JBSWY3DPEHPK3PXP'),
    buildOtpAuthUrl: jest.fn().mockReturnValue('otpauth://totp/MedSphere:test'),
    verify: jest.fn(),
  };

  let useCase: EnrollMfaUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new EnrollMfaUseCase(
      userRepo as never,
      mfaRepo as never,
      outboxRepo as never,
      auditRepo as never,
      totpService as never,
    );
  });

  it('enrolls TOTP MFA and returns secret', async () => {
    const now = new Date().toISOString();
    userRepo.findById.mockResolvedValue(
      User.create({
        id: userId,
        organizationId,
        email: Email.create('doctor@hospital.com'),
        passwordHash: 'hash',
        firstName: 'Jane',
        lastName: 'Doe',
        displayName: 'Jane Doe',
        phone: null,
        status: UserStatus.ACTIVE,
        emailVerifiedAt: now,
        mfaEnabled: false,
        failedLoginCount: 0,
        lockedUntil: null,
        lastLoginAt: null,
        passwordChangedAt: now,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
        version: 1,
      }),
    );
    mfaRepo.findByUserAndMethod.mockResolvedValue(null);
    mfaRepo.saveEnrollment.mockResolvedValue(undefined);
    mfaRepo.saveRecoveryCodes.mockResolvedValue(undefined);
    outboxRepo.append.mockResolvedValue(undefined);
    auditRepo.append.mockResolvedValue(undefined);

    const result = await useCase.execute({
      userId,
      method: MfaMethod.TOTP,
      correlationId,
    });

    expect(result.method).toBe(MfaMethod.TOTP);
    expect(result.secret).toBe('JBSWY3DPEHPK3PXP');
    expect(result.recoveryCodes).toHaveLength(10);
    expect(mfaRepo.saveEnrollment).toHaveBeenCalled();
  });

  it('throws when user not found', async () => {
    userRepo.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({
        userId,
        method: MfaMethod.TOTP,
        correlationId,
      }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('throws when MFA already enrolled', async () => {
    const now = new Date().toISOString();
    userRepo.findById.mockResolvedValue(
      User.create({
        id: userId,
        organizationId,
        email: Email.create('doctor@hospital.com'),
        passwordHash: 'hash',
        firstName: 'Jane',
        lastName: 'Doe',
        displayName: 'Jane Doe',
        phone: null,
        status: UserStatus.ACTIVE,
        emailVerifiedAt: now,
        mfaEnabled: true,
        failedLoginCount: 0,
        lockedUntil: null,
        lastLoginAt: null,
        passwordChangedAt: now,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
        version: 1,
      }),
    );
    mfaRepo.findByUserAndMethod.mockResolvedValue({
      id: 'enrollment-id',
      userId,
      method: MfaMethod.TOTP,
      secretEncrypted: 'secret',
      isPrimary: true,
      verifiedAt: now,
      disabledAt: null,
    });

    await expect(
      useCase.execute({
        userId,
        method: MfaMethod.TOTP,
        correlationId,
      }),
    ).rejects.toBeInstanceOf(ConflictError);
  });
});

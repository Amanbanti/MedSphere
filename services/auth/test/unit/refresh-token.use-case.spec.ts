import { RefreshTokenUseCase } from '../../src/application/use-cases/refresh-token.use-case';
import { Session } from '../../src/domain/entities/session.entity';
import { User } from '../../src/domain/entities/user.entity';
import { Email } from '../../src/domain/value-objects/email.vo';
import {
  InvalidCredentialsError,
  TokenRevokedError,
} from '../../src/domain/errors/auth.errors';
import { UserStatus } from '@medsphere/shared';

jest.mock('@medsphere/auth-sdk', () => ({
  JwtService: jest.fn(),
  resolvePermissionsForRoles: jest.fn(() => ['USER:READ']),
}));

import { JwtService } from '@medsphere/auth-sdk';

describe('RefreshTokenUseCase', () => {
  const userId = '11111111-1111-4111-8111-111111111111';
  const sessionId = '22222222-2222-4222-8222-222222222222';
  const tokenFamily = '33333333-3333-4333-8333-333333333333';
  const correlationId = '44444444-4444-4444-8444-444444444444';

  const jwtService = {
    verifyRefresh: jest.fn(),
    signRefresh: jest.fn(),
  };

  const sessionRepo = {
    findById: jest.fn(),
    findByTokenFamily: jest.fn(),
    findActiveByUserId: jest.fn(),
    save: jest.fn(),
    revokeAllForUser: jest.fn(),
  };

  const userRepo = { findById: jest.fn(), save: jest.fn() };
  const roleRepo = {
    findActiveByUserId: jest.fn().mockResolvedValue([
      { role: 'DOCTOR', facilityId: null, permissions: [], expiresAt: null },
    ]),
  };
  const outboxRepo = { append: jest.fn() };

  const tokenIssuance = {
    hashToken: jest.fn().mockReturnValue('expected-hash'),
    issueTokens: jest.fn().mockResolvedValue({
      accessToken: 'new-access',
      refreshToken: 'new-refresh',
      tokenType: 'Bearer',
      expiresIn: 900,
      sessionId,
    }),
  };

  let useCase: RefreshTokenUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new RefreshTokenUseCase(
      jwtService as unknown as JwtService,
      sessionRepo as never,
      userRepo as never,
      roleRepo as never,
      outboxRepo as never,
      tokenIssuance as never,
    );
  });

  it('rotates tokens for valid refresh token', async () => {
    const now = new Date().toISOString();
    const session = Session.create({
      id: sessionId,
      userId,
      tokenFamily,
      refreshTokenHash: 'expected-hash',
      ipAddress: null,
      userAgent: null,
      mfaVerified: true,
      createdAt: now,
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
      lastSeenAt: now,
      revokedAt: null,
      revokeReason: null,
    });

    jwtService.verifyRefresh.mockReturnValue({
      sub: userId,
      sessionId,
      tokenFamily,
    });
    sessionRepo.findById.mockResolvedValue(session);
    userRepo.findById.mockResolvedValue(
      User.create({
        id: userId,
        organizationId: '55555555-5555-4555-8555-555555555555',
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
        lastLoginAt: now,
        passwordChangedAt: now,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
        version: 1,
      }),
    );
    jwtService.signRefresh.mockReturnValue('new-refresh');
    outboxRepo.append.mockResolvedValue(undefined);

    const result = await useCase.execute({
      refreshToken: 'valid-refresh-token',
      correlationId,
    });

    expect(result.accessToken).toBe('new-access');
    expect(tokenIssuance.issueTokens).toHaveBeenCalled();
  });

  it('revokes session on refresh token hash mismatch', async () => {
    const now = new Date().toISOString();
    const session = Session.create({
      id: sessionId,
      userId,
      tokenFamily,
      refreshTokenHash: 'different-hash',
      ipAddress: null,
      userAgent: null,
      mfaVerified: false,
      createdAt: now,
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
      lastSeenAt: now,
      revokedAt: null,
      revokeReason: null,
    });

    jwtService.verifyRefresh.mockReturnValue({
      sub: userId,
      sessionId,
      tokenFamily,
    });
    sessionRepo.findById.mockResolvedValue(session);
    sessionRepo.save.mockResolvedValue(undefined);

    await expect(
      useCase.execute({
        refreshToken: 'stolen-refresh-token',
        correlationId,
      }),
    ).rejects.toBeInstanceOf(TokenRevokedError);
  });

  it('throws on invalid refresh token', async () => {
    jwtService.verifyRefresh.mockImplementation(() => {
      throw new Error('Malformed JWT');
    });

    await expect(
      useCase.execute({
        refreshToken: 'bad-token',
        correlationId,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});

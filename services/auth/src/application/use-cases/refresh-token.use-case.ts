import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@medsphere/auth-sdk';
import { v4 as uuidv4 } from 'uuid';
import {
  createDomainEvent,
  nowIso,
  type AuthTokensDto,
} from '@medsphere/shared';
import type { RefreshTokenCommand } from '../commands/refresh-token.command';
import {
  InvalidCredentialsError,
  NotFoundError,
  TokenExpiredError,
  TokenRevokedError,
} from '../../domain/errors/auth.errors';
import {
  SESSION_REPOSITORY,
  type SessionRepository,
} from '../../domain/repositories/session.repository';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../../domain/repositories/user.repository';
import {
  ROLE_REPOSITORY,
  type RoleRepository,
} from '../../domain/repositories/role.repository';
import {
  OUTBOX_REPOSITORY,
  type OutboxRepository,
} from '../../domain/repositories/outbox.repository';
import { TokenIssuanceService } from '../services/token-issuance.service';
import { AUTH_EVENT_TYPES } from '../../domain/events/auth.domain-events';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepo: SessionRepository,
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @Inject(ROLE_REPOSITORY) private readonly roleRepo: RoleRepository,
    @Inject(OUTBOX_REPOSITORY) private readonly outboxRepo: OutboxRepository,
    private readonly tokenIssuance: TokenIssuanceService,
  ) {}

  async execute(command: RefreshTokenCommand): Promise<AuthTokensDto> {
    let payload;
    try {
      payload = this.jwtService.verifyRefresh(command.refreshToken);
    } catch (error) {
      if (error instanceof Error && error.message === 'Token expired') {
        throw new TokenExpiredError('Refresh token has expired');
      }
      throw new InvalidCredentialsError('Invalid refresh token');
    }

    const session = await this.sessionRepo.findById(payload.sessionId);
    if (!session) {
      throw new NotFoundError('Session not found');
    }

    try {
      session.assertActive();
    } catch (error) {
      if (error instanceof TokenRevokedError) {
        const familySessions = await this.sessionRepo.findByTokenFamily(
          session.tokenFamily,
        );
        for (const s of familySessions) {
          if (!s.isRevoked()) {
            s.revoke('refresh_token_reuse_detected', nowIso());
            await this.sessionRepo.save(s);
          }
        }
      }
      throw error;
    }

    const tokenHash = this.tokenIssuance.hashToken(command.refreshToken);
    if (tokenHash !== session.refreshTokenHash) {
      session.revoke('refresh_token_mismatch', nowIso());
      await this.sessionRepo.save(session);
      throw new TokenRevokedError('Refresh token has been revoked');
    }

    const user = await this.userRepo.findById(payload.sub);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    user.assertCanAuthenticate();

    const roles = (await this.roleRepo.findActiveByUserId(user.id)).map(
      (r) => r.role,
    );
    const facilityIds = (await this.roleRepo.findActiveByUserId(user.id))
      .map((r) => r.facilityId)
      .filter((id): id is import('@medsphere/shared').UUID => id !== null);

    const newRefreshToken = this.jwtService.signRefresh({
      sub: user.id,
      sessionId: session.id,
      tokenFamily: session.tokenFamily,
    });

    const tokens = await this.tokenIssuance.issueTokens({
      user,
      roles,
      facilityIds,
      mfaVerified: session.mfaVerified,
      ipAddress: command.ipAddress,
      userAgent: command.userAgent,
      refreshToken: newRefreshToken,
      existingSession: session,
    });

    const now = nowIso();
    const envelope = createDomainEvent({
      eventId: uuidv4() as import('@medsphere/shared').UUID,
      eventType: AUTH_EVENT_TYPES.USER_LOGIN_SUCCEEDED,
      occurredAt: now,
      correlationId: command.correlationId,
      organizationId: user.organizationId,
      actorId: user.id,
      payload: {
        userId: user.id,
        sessionId: session.id,
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
        mfaUsed: session.mfaVerified,
      },
    });

    await this.outboxRepo.append([
      {
        aggregateType: 'Session',
        aggregateId: session.id,
        eventType: AUTH_EVENT_TYPES.USER_LOGIN_SUCCEEDED,
        payload: envelope.payload,
        envelope,
      },
    ]);

    return tokens;
  }
}

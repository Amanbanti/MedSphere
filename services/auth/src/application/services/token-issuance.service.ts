import { Inject, Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import {
  JwtService,
  hashPassword,
  resolvePermissionsForRoles,
} from '@medsphere/auth-sdk';
import {
  JWT_REFRESH_TTL_SECONDS,
  createDomainEvent,
  nowIso,
  type AuthTokensDto,
  type ISODateString,
  type Permission,
  type SystemRole,
  type UUID,
} from '@medsphere/shared';
import { Session } from '../../domain/entities/session.entity';
import type { User } from '../../domain/entities/user.entity';
import {
  SESSION_REPOSITORY,
  type SessionRepository,
} from '../../domain/repositories/session.repository';

export interface TokenIssuanceInput {
  user: User;
  roles: SystemRole[];
  permissions?: Permission[];
  facilityIds?: UUID[];
  mfaVerified: boolean;
  ipAddress?: string;
  userAgent?: string;
  refreshToken?: string;
  existingSession?: Session;
}

@Injectable()
export class TokenIssuanceService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository: SessionRepository,
  ) {}

  async issueTokens(input: TokenIssuanceInput): Promise<AuthTokensDto> {
    const now = nowIso();
    const sessionId = input.existingSession?.id ?? (uuidv4() as UUID);
    const tokenFamily =
      input.existingSession?.tokenFamily ?? (uuidv4() as UUID);
    const refreshToken =
      input.refreshToken ?? this.jwtService.signRefresh({
        sub: input.user.id,
        sessionId,
        tokenFamily,
      });

    const refreshHash = this.hashToken(refreshToken);
    const expiresAt = new Date(
      Date.now() + JWT_REFRESH_TTL_SECONDS * 1000,
    ).toISOString() as ISODateString;

    let session: Session;
    if (input.existingSession) {
      session = input.existingSession;
      session.rotateRefreshToken(refreshHash, now);
      if (input.mfaVerified) {
        session.markMfaVerified(now);
      }
      session.touch(now);
    } else {
      session = Session.open({
        id: sessionId,
        userId: input.user.id,
        tokenFamily,
        refreshTokenHash: refreshHash,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
        mfaVerified: input.mfaVerified,
        now,
        expiresAt,
      });
    }

    await this.sessionRepository.save(session);

    const permissions =
      input.permissions ?? resolvePermissionsForRoles(input.roles);
    const accessToken = this.jwtService.signAccess({
      sub: input.user.id,
      orgId: input.user.organizationId,
      facilityIds: input.facilityIds ?? [],
      roles: input.roles,
      permissions,
      sessionId: session.id,
      mfaVerified: input.mfaVerified,
    });

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: this.jwtService.getAccessTtlSeconds(),
      sessionId: session.id,
    };
  }

  hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  async hashUserPassword(password: string): Promise<string> {
    return hashPassword(password);
  }
}

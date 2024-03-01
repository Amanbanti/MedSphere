import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  MfaMethod,
  createDomainEvent,
  nowIso,
  type AuthTokensDto,
} from '@medsphere/shared';
import type { VerifyMfaCommand } from '../commands/verify-mfa.command';
import {
  MfaInvalidError,
  NotFoundError,
} from '../../domain/errors/auth.errors';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../../domain/repositories/user.repository';
import {
  MFA_REPOSITORY,
  type MfaRepository,
} from '../../domain/repositories/mfa.repository';
import {
  SESSION_REPOSITORY,
  type SessionRepository,
} from '../../domain/repositories/session.repository';
import {
  ROLE_REPOSITORY,
  type RoleRepository,
} from '../../domain/repositories/role.repository';
import {
  OUTBOX_REPOSITORY,
  type OutboxRepository,
} from '../../domain/repositories/outbox.repository';
import {
  AUDIT_REPOSITORY,
  type AuditRepository,
} from '../../domain/repositories/audit.repository';
import { AUTH_EVENT_TYPES } from '../../domain/events/auth.domain-events';
import { TotpService } from '../../infrastructure/crypto/totp.service';
import { TokenIssuanceService } from '../services/token-issuance.service';
import { createHash } from 'crypto';

@Injectable()
export class VerifyMfaUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @Inject(MFA_REPOSITORY) private readonly mfaRepo: MfaRepository,
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepo: SessionRepository,
    @Inject(ROLE_REPOSITORY) private readonly roleRepo: RoleRepository,
    @Inject(OUTBOX_REPOSITORY) private readonly outboxRepo: OutboxRepository,
    @Inject(AUDIT_REPOSITORY) private readonly auditRepo: AuditRepository,
    private readonly totpService: TotpService,
    private readonly tokenIssuance: TokenIssuanceService,
  ) {}

  async execute(
    command: VerifyMfaCommand,
  ): Promise<{ verified: boolean; tokens?: AuthTokensDto }> {
    const user = await this.userRepo.findById(command.userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const enrollment = await this.mfaRepo.findByUserAndMethod(
      command.userId,
      command.method,
    );
    if (!enrollment?.secretEncrypted) {
      throw new NotFoundError('MFA enrollment not found');
    }

    let valid = false;

    if (command.method === MfaMethod.TOTP) {
      valid = this.totpService.verify(command.code, enrollment.secretEncrypted);
    }

    if (!valid && enrollment.id) {
      const codeHash = createHash('sha256')
        .update(command.code)
        .digest('hex');
      valid = await this.mfaRepo.consumeRecoveryCode(enrollment.id, codeHash);
    }

    if (!valid) {
      await this.auditRepo.append({
        organizationId: user.organizationId,
        actorId: user.id,
        action: 'MFA_VERIFY',
        resourceType: 'User',
        resourceId: user.id,
        outcome: 'FAILURE',
        correlationId: command.correlationId,
      });
      throw new MfaInvalidError('Invalid MFA code');
    }

    const now = nowIso();

    if (!enrollment.verifiedAt) {
      await this.mfaRepo.saveEnrollment({
        ...enrollment,
        verifiedAt: now,
      });
      user.enableMfa(now);
      await this.userRepo.save(user);
    }

    if (command.challengeId) {
      await this.mfaRepo.consumeChallenge(command.challengeId, now);
    }

    let tokens: AuthTokensDto | undefined;
    if (command.sessionId) {
      const session = await this.sessionRepo.findById(command.sessionId);
      if (session) {
        session.markMfaVerified(now);
        await this.sessionRepo.save(session);
      }
    } else {
      const roles = (await this.roleRepo.findActiveByUserId(user.id)).map(
        (r) => r.role,
      );
      tokens = await this.tokenIssuance.issueTokens({
        user,
        roles,
        mfaVerified: true,
        ipAddress: undefined,
        userAgent: undefined,
      });
    }

    const envelope = createDomainEvent({
      eventId: uuidv4() as import('@medsphere/shared').UUID,
      eventType: AUTH_EVENT_TYPES.MFA_VERIFIED,
      occurredAt: now,
      correlationId: command.correlationId,
      organizationId: user.organizationId,
      actorId: user.id,
      payload: {
        userId: user.id,
        method: command.method,
      },
    });

    await this.outboxRepo.append([
      {
        aggregateType: 'User',
        aggregateId: user.id,
        eventType: AUTH_EVENT_TYPES.MFA_VERIFIED,
        payload: envelope.payload,
        envelope,
      },
    ]);

    await this.auditRepo.append({
      organizationId: user.organizationId,
      actorId: user.id,
      action: 'MFA_VERIFY',
      resourceType: 'User',
      resourceId: user.id,
      outcome: 'SUCCESS',
      correlationId: command.correlationId,
    });

    return { verified: true, tokens };
  }
}

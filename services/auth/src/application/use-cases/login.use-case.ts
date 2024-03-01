import { Injectable, Inject } from '@nestjs/common';
import { verifyPassword } from '@medsphere/auth-sdk';
import { v4 as uuidv4 } from 'uuid';
import {
  MfaMethod,
  createDomainEvent,
  nowIso,
  type LoginResponseDto,
} from '@medsphere/shared';
import type { LoginCommand } from '../commands/login.command';
import { Email } from '../../domain/value-objects/email.vo';
import {
  InvalidCredentialsError,
  MfaRequiredError,
  NotFoundError,
} from '../../domain/errors/auth.errors';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../../domain/repositories/user.repository';
import {
  ORGANIZATION_REPOSITORY,
  type OrganizationRepository,
} from '../../domain/repositories/organization.repository';
import {
  MFA_REPOSITORY,
  type MfaRepository,
} from '../../domain/repositories/mfa.repository';
import {
  OUTBOX_REPOSITORY,
  type OutboxRepository,
} from '../../domain/repositories/outbox.repository';
import {
  AUDIT_REPOSITORY,
  type AuditRepository,
} from '../../domain/repositories/audit.repository';
import {
  ROLE_REPOSITORY,
  type RoleRepository,
} from '../../domain/repositories/role.repository';
import { AUTH_EVENT_TYPES } from '../../domain/events/auth.domain-events';
import { UserMapper } from '../mappers/user.mapper';
import { TokenIssuanceService } from '../services/token-issuance.service';
import { TotpService } from '../../infrastructure/crypto/totp.service';
import { MFA_CHALLENGE_TTL_SECONDS } from '@medsphere/shared';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @Inject(ORGANIZATION_REPOSITORY)
    private readonly orgRepo: OrganizationRepository,
    @Inject(MFA_REPOSITORY) private readonly mfaRepo: MfaRepository,
    @Inject(OUTBOX_REPOSITORY) private readonly outboxRepo: OutboxRepository,
    @Inject(AUDIT_REPOSITORY) private readonly auditRepo: AuditRepository,
    @Inject(ROLE_REPOSITORY) private readonly roleRepo: RoleRepository,
    private readonly tokenIssuance: TokenIssuanceService,
    private readonly totpService: TotpService,
  ) {}

  async execute(command: LoginCommand): Promise<LoginResponseDto> {
    const email = Email.create(command.email);
    const now = nowIso();

    let organizationId: import('@medsphere/shared').UUID | undefined;
    if (command.organizationSlug) {
      const org = await this.orgRepo.findBySlug(command.organizationSlug);
      if (!org) {
        throw new NotFoundError('Organization not found');
      }
      org.assertActive();
      organizationId = org.id;
    }

    const user = organizationId
      ? await this.userRepo.findByEmail(organizationId, email)
      : await this.userRepo.findByEmailGlobal(email);

    if (!user || !user.passwordHash) {
      await this.recordFailedLogin(email.normalized, organizationId, command, 'user_not_found');
      throw new InvalidCredentialsError('Invalid email or password');
    }

    try {
      user.assertCanAuthenticate();
    } catch (error) {
      await this.auditRepo.append({
        organizationId: user.organizationId,
        actorId: user.id,
        action: 'USER_LOGIN',
        resourceType: 'User',
        resourceId: user.id,
        outcome: 'DENIED',
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
        correlationId: command.correlationId,
        metadata: { reason: error instanceof Error ? error.message : 'denied' },
      });
      throw error;
    }

    const validPassword = await verifyPassword(
      command.password,
      user.passwordHash,
    );
    if (!validPassword) {
      user.recordFailedLogin(now);
      await this.userRepo.save(user);
      await this.recordFailedLogin(
        email.normalized,
        user.organizationId,
        command,
        'invalid_password',
      );
      throw new InvalidCredentialsError('Invalid email or password');
    }

    const roles = (await this.roleRepo.findActiveByUserId(user.id)).map(
      (r) => r.role,
    );
    const defaultRoles = roles.length > 0 ? roles : [];

    if (user.mfaEnabled && !command.mfaCode) {
      const challengeId = uuidv4() as import('@medsphere/shared').UUID;
      const expiresAt = new Date(
        Date.now() + MFA_CHALLENGE_TTL_SECONDS * 1000,
      ).toISOString() as import('@medsphere/shared').ISODateString;

      await this.mfaRepo.createChallenge({
        id: challengeId,
        userId: user.id,
        method: MfaMethod.TOTP,
        codeHash: null,
        expiresAt,
        consumedAt: null,
        ipAddress: command.ipAddress ?? null,
      });

      const methods = (await this.mfaRepo.findActiveByUserId(user.id)).map(
        (m) => m.method,
      );

      throw new MfaRequiredError(challengeId, methods);
    }

    if (user.mfaEnabled && command.mfaCode) {
      const enrollment = await this.mfaRepo.findByUserAndMethod(
        user.id,
        MfaMethod.TOTP,
      );
      if (!enrollment?.secretEncrypted || !enrollment.verifiedAt) {
        throw new InvalidCredentialsError('MFA is not properly configured');
      }
      const validMfa = this.totpService.verify(
        command.mfaCode,
        enrollment.secretEncrypted,
      );
      if (!validMfa) {
        await this.auditRepo.append({
          organizationId: user.organizationId,
          actorId: user.id,
          action: 'MFA_VERIFY',
          resourceType: 'User',
          resourceId: user.id,
          outcome: 'FAILURE',
          correlationId: command.correlationId,
        });
        throw new InvalidCredentialsError('Invalid MFA code');
      }
    }

    user.recordSuccessfulLogin(now);
    await this.userRepo.save(user);

    const tokens = await this.tokenIssuance.issueTokens({
      user,
      roles: defaultRoles,
      mfaVerified: user.mfaEnabled,
      ipAddress: command.ipAddress,
      userAgent: command.userAgent,
    });

    const envelope = createDomainEvent({
      eventId: uuidv4() as import('@medsphere/shared').UUID,
      eventType: AUTH_EVENT_TYPES.USER_LOGIN_SUCCEEDED,
      occurredAt: now,
      correlationId: command.correlationId,
      organizationId: user.organizationId,
      actorId: user.id,
      payload: {
        userId: user.id,
        sessionId: tokens.sessionId,
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
        mfaUsed: user.mfaEnabled,
      },
    });

    await this.outboxRepo.append([
      {
        aggregateType: 'Session',
        aggregateId: tokens.sessionId,
        eventType: AUTH_EVENT_TYPES.USER_LOGIN_SUCCEEDED,
        payload: envelope.payload,
        envelope,
      },
    ]);

    await this.auditRepo.append({
      organizationId: user.organizationId,
      actorId: user.id,
      action: 'USER_LOGIN',
      resourceType: 'User',
      resourceId: user.id,
      outcome: 'SUCCESS',
      ipAddress: command.ipAddress,
      userAgent: command.userAgent,
      correlationId: command.correlationId,
    });

    return {
      tokens,
      user: UserMapper.toDto(user),
    };
  }

  private async recordFailedLogin(
    email: string,
    organizationId: import('@medsphere/shared').UUID | undefined,
    command: LoginCommand,
    reason: string,
  ): Promise<void> {
    const now = nowIso();
    const envelope = createDomainEvent({
      eventId: uuidv4() as import('@medsphere/shared').UUID,
      eventType: AUTH_EVENT_TYPES.USER_LOGIN_FAILED,
      occurredAt: now,
      correlationId: command.correlationId,
      organizationId: organizationId ?? (uuidv4() as import('@medsphere/shared').UUID),
      actorId: null,
      payload: {
        email,
        organizationId,
        reason,
        ipAddress: command.ipAddress,
      },
    });

    if (organizationId) {
      await this.outboxRepo.append([
        {
          aggregateType: 'User',
          aggregateId: organizationId,
          eventType: AUTH_EVENT_TYPES.USER_LOGIN_FAILED,
          payload: envelope.payload,
          envelope,
        },
      ]);
    }

    await this.auditRepo.append({
      organizationId: organizationId ?? (uuidv4() as import('@medsphere/shared').UUID),
      actorId: null,
      action: 'USER_LOGIN',
      resourceType: 'User',
      resourceId: email,
      outcome: 'FAILURE',
      ipAddress: command.ipAddress,
      userAgent: command.userAgent,
      correlationId: command.correlationId,
      metadata: { reason },
    });
  }
}

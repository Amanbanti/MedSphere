import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  MfaMethod,
  createDomainEvent,
  nowIso,
  type MfaEnrollmentDto,
} from '@medsphere/shared';
import type { EnrollMfaCommand } from '../commands/enroll-mfa.command';
import {
  ConflictError,
  NotFoundError,
  ValidationError,
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
  OUTBOX_REPOSITORY,
  type OutboxRepository,
} from '../../domain/repositories/outbox.repository';
import {
  AUDIT_REPOSITORY,
  type AuditRepository,
} from '../../domain/repositories/audit.repository';
import { AUTH_EVENT_TYPES } from '../../domain/events/auth.domain-events';
import { TotpService } from '../../infrastructure/crypto/totp.service';
import { hashPassword, generateSecureToken } from '@medsphere/auth-sdk';
import { createHash } from 'crypto';

@Injectable()
export class EnrollMfaUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @Inject(MFA_REPOSITORY) private readonly mfaRepo: MfaRepository,
    @Inject(OUTBOX_REPOSITORY) private readonly outboxRepo: OutboxRepository,
    @Inject(AUDIT_REPOSITORY) private readonly auditRepo: AuditRepository,
    private readonly totpService: TotpService,
  ) {}

  async execute(command: EnrollMfaCommand): Promise<MfaEnrollmentDto> {
    const user = await this.userRepo.findById(command.userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (command.method !== MfaMethod.TOTP) {
      throw new ValidationError(`MFA method ${command.method} is not yet supported`);
    }

    const existing = await this.mfaRepo.findByUserAndMethod(
      command.userId,
      command.method,
    );
    if (existing?.verifiedAt) {
      throw new ConflictError('MFA method already enrolled');
    }

    const secret = this.totpService.generateSecret();
    const now = nowIso();
    const enrollmentId = uuidv4() as import('@medsphere/shared').UUID;

    await this.mfaRepo.saveEnrollment({
      id: enrollmentId,
      userId: command.userId,
      method: command.method,
      secretEncrypted: secret,
      isPrimary: true,
      verifiedAt: null,
      disabledAt: null,
    });

    const recoveryCodes = Array.from({ length: 10 }, () =>
      generateSecureToken(8),
    );
    const codeHashes = await Promise.all(
      recoveryCodes.map(async (code) => {
        const hash = await hashPassword(code);
        return createHash('sha256').update(hash).digest('hex');
      }),
    );
    await this.mfaRepo.saveRecoveryCodes(enrollmentId, codeHashes);

    const otpauthUrl = this.totpService.buildOtpAuthUrl(
      secret,
      user.email.normalized,
    );

    const envelope = createDomainEvent({
      eventId: uuidv4() as import('@medsphere/shared').UUID,
      eventType: AUTH_EVENT_TYPES.MFA_ENROLLED,
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
        eventType: AUTH_EVENT_TYPES.MFA_ENROLLED,
        payload: envelope.payload,
        envelope,
      },
    ]);

    await this.auditRepo.append({
      organizationId: user.organizationId,
      actorId: user.id,
      action: 'MFA_ENROLL',
      resourceType: 'User',
      resourceId: user.id,
      outcome: 'SUCCESS',
      correlationId: command.correlationId,
      metadata: { method: command.method },
    });

    return {
      method: command.method,
      secret,
      otpauthUrl,
      recoveryCodes,
    };
  }
}

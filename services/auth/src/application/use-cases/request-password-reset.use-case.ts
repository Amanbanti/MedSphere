import { Injectable, Inject } from '@nestjs/common';
import { generateSecureToken } from '@medsphere/auth-sdk';
import { createHash } from 'crypto';
import {
  PASSWORD_RESET_TTL_SECONDS,
  nowIso,
} from '@medsphere/shared';
import type { RequestPasswordResetCommand } from '../commands/request-password-reset.command';
import { Email } from '../../domain/value-objects/email.vo';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../../domain/repositories/user.repository';
import {
  PASSWORD_RESET_REPOSITORY,
  type PasswordResetRepository,
} from '../../domain/repositories/password-reset.repository';
import {
  AUDIT_REPOSITORY,
  type AuditRepository,
} from '../../domain/repositories/audit.repository';

@Injectable()
export class RequestPasswordResetUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @Inject(PASSWORD_RESET_REPOSITORY)
    private readonly resetRepo: PasswordResetRepository,
    @Inject(AUDIT_REPOSITORY) private readonly auditRepo: AuditRepository,
  ) {}

  async execute(command: RequestPasswordResetCommand): Promise<{ message: string }> {
    const email = Email.create(command.email);
    const user = await this.userRepo.findByEmailGlobal(email);

    if (user) {
      const rawToken = generateSecureToken(32);
      const tokenHash = createHash('sha256').update(rawToken).digest('hex');
      const expiresAt = new Date(
        Date.now() + PASSWORD_RESET_TTL_SECONDS * 1000,
      ).toISOString() as import('@medsphere/shared').ISODateString;

      await this.resetRepo.invalidateAllForUser(user.id);
      await this.resetRepo.create(user.id, tokenHash, expiresAt);

      await this.auditRepo.append({
        organizationId: user.organizationId,
        actorId: user.id,
        action: 'PASSWORD_RESET_REQUEST',
        resourceType: 'User',
        resourceId: user.id,
        outcome: 'SUCCESS',
        ipAddress: command.ipAddress,
        correlationId: command.correlationId,
        metadata: { tokenIssued: true },
      });
    }

    return {
      message:
        'If an account exists with that email, a password reset link has been sent.',
    };
  }
}

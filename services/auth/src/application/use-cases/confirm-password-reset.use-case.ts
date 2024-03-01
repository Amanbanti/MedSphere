import { Injectable, Inject } from '@nestjs/common';
import { hashPassword } from '@medsphere/auth-sdk';
import { createHash } from 'crypto';
import { nowIso } from '@medsphere/shared';
import type { ConfirmPasswordResetCommand } from '../commands/confirm-password-reset.command';
import { Password } from '../../domain/value-objects/password.vo';
import {
  InvalidCredentialsError,
  NotFoundError,
  TokenExpiredError,
} from '../../domain/errors/auth.errors';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../../domain/repositories/user.repository';
import {
  PASSWORD_RESET_REPOSITORY,
  type PasswordResetRepository,
} from '../../domain/repositories/password-reset.repository';
import {
  SESSION_REPOSITORY,
  type SessionRepository,
} from '../../domain/repositories/session.repository';
import {
  AUDIT_REPOSITORY,
  type AuditRepository,
} from '../../domain/repositories/audit.repository';

@Injectable()
export class ConfirmPasswordResetUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @Inject(PASSWORD_RESET_REPOSITORY)
    private readonly resetRepo: PasswordResetRepository,
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepo: SessionRepository,
    @Inject(AUDIT_REPOSITORY) private readonly auditRepo: AuditRepository,
  ) {}

  async execute(command: ConfirmPasswordResetCommand): Promise<{ message: string }> {
    const password = Password.create(command.newPassword);
    const tokenHash = createHash('sha256')
      .update(command.token)
      .digest('hex');

    const record = await this.resetRepo.findByTokenHash(tokenHash);
    if (!record) {
      throw new InvalidCredentialsError('Invalid or expired reset token');
    }

    if (record.usedAt) {
      throw new InvalidCredentialsError('Reset token has already been used');
    }

    if (new Date(record.expiresAt) <= new Date()) {
      throw new TokenExpiredError('Reset token has expired');
    }

    const user = await this.userRepo.findById(record.userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const now = nowIso();
    const passwordHash = await hashPassword(password.value);
    user.updatePassword(passwordHash, now);
    await this.userRepo.save(user);
    await this.resetRepo.markUsed(record.id, now);
    await this.sessionRepo.revokeAllForUser(
      user.id,
      'password_reset',
      now,
    );

    await this.auditRepo.append({
      organizationId: user.organizationId,
      actorId: user.id,
      action: 'PASSWORD_RESET_CONFIRM',
      resourceType: 'User',
      resourceId: user.id,
      outcome: 'SUCCESS',
      correlationId: command.correlationId,
    });

    return { message: 'Password has been reset successfully' };
  }
}

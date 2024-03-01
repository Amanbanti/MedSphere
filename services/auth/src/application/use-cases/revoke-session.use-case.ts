import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { createDomainEvent, nowIso } from '@medsphere/shared';
import type { RevokeSessionCommand } from '../commands/revoke-session.command';
import {
  NotFoundError,
  UnauthorizedError,
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
  OUTBOX_REPOSITORY,
  type OutboxRepository,
} from '../../domain/repositories/outbox.repository';
import {
  AUDIT_REPOSITORY,
  type AuditRepository,
} from '../../domain/repositories/audit.repository';
import { AUTH_EVENT_TYPES } from '../../domain/events/auth.domain-events';

@Injectable()
export class RevokeSessionUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepo: SessionRepository,
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @Inject(OUTBOX_REPOSITORY) private readonly outboxRepo: OutboxRepository,
    @Inject(AUDIT_REPOSITORY) private readonly auditRepo: AuditRepository,
  ) {}

  async execute(command: RevokeSessionCommand): Promise<void> {
    const session = await this.sessionRepo.findById(command.sessionId);
    if (!session) {
      throw new NotFoundError('Session not found');
    }

    if (session.userId !== command.userId && command.actorId !== command.userId) {
      throw new UnauthorizedError('Insufficient permissions to revoke session');
    }

    const now = nowIso();
    session.revoke(command.reason, now);
    await this.sessionRepo.save(session);

    const user = await this.userRepo.findById(session.userId);

    const envelope = createDomainEvent({
      eventId: uuidv4() as import('@medsphere/shared').UUID,
      eventType: AUTH_EVENT_TYPES.SESSION_REVOKED,
      occurredAt: now,
      correlationId: command.correlationId,
      organizationId: user?.organizationId ?? (uuidv4() as import('@medsphere/shared').UUID),
      actorId: command.actorId,
      payload: {
        userId: session.userId,
        sessionId: command.sessionId,
        reason: command.reason,
      },
    });

    await this.outboxRepo.append([
      {
        aggregateType: 'Session',
        aggregateId: command.sessionId,
        eventType: AUTH_EVENT_TYPES.SESSION_REVOKED,
        payload: envelope.payload,
        envelope,
      },
    ]);

    if (user) {
      await this.auditRepo.append({
        organizationId: user.organizationId,
        actorId: command.actorId,
        action: 'SESSION_REVOKE',
        resourceType: 'Session',
        resourceId: command.sessionId,
        outcome: 'SUCCESS',
        correlationId: command.correlationId,
        metadata: { reason: command.reason },
      });
    }
  }
}

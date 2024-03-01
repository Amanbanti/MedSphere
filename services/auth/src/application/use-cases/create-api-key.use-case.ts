import { Injectable, Inject } from '@nestjs/common';
import { generateApiKey } from '@medsphere/auth-sdk';
import { v4 as uuidv4 } from 'uuid';
import {
  createDomainEvent,
  nowIso,
  type ApiKeyCreatedDto,
} from '@medsphere/shared';
import type { CreateApiKeyCommand } from '../commands/create-api-key.command';
import { NotFoundError } from '../../domain/errors/auth.errors';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../../domain/repositories/user.repository';
import {
  API_KEY_REPOSITORY,
  type ApiKeyRepository,
} from '../../domain/repositories/api-key.repository';
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
export class CreateApiKeyUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @Inject(API_KEY_REPOSITORY) private readonly apiKeyRepo: ApiKeyRepository,
    @Inject(OUTBOX_REPOSITORY) private readonly outboxRepo: OutboxRepository,
    @Inject(AUDIT_REPOSITORY) private readonly auditRepo: AuditRepository,
  ) {}

  async execute(command: CreateApiKeyCommand): Promise<ApiKeyCreatedDto> {
    const user = await this.userRepo.findById(command.userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const generated = generateApiKey();
    const now = nowIso();
    const id = uuidv4() as import('@medsphere/shared').UUID;

    await this.apiKeyRepo.save({
      id,
      organizationId: command.organizationId,
      userId: command.userId,
      name: command.name,
      keyPrefix: generated.keyPrefix,
      keyHash: generated.keyHash,
      scopes: command.scopes,
      expiresAt: command.expiresAt ?? null,
      lastUsedAt: null,
      revokedAt: null,
      createdAt: now,
    });

    const envelope = createDomainEvent({
      eventId: uuidv4() as import('@medsphere/shared').UUID,
      eventType: AUTH_EVENT_TYPES.API_KEY_CREATED,
      occurredAt: now,
      correlationId: command.correlationId,
      organizationId: command.organizationId,
      actorId: command.userId,
      payload: {
        userId: command.userId,
        apiKeyId: id,
        name: command.name,
      },
    });

    await this.outboxRepo.append([
      {
        aggregateType: 'ApiKey',
        aggregateId: id,
        eventType: AUTH_EVENT_TYPES.API_KEY_CREATED,
        payload: envelope.payload,
        envelope,
      },
    ]);

    await this.auditRepo.append({
      organizationId: command.organizationId,
      actorId: command.userId,
      action: 'API_KEY_CREATE',
      resourceType: 'ApiKey',
      resourceId: id,
      outcome: 'SUCCESS',
      correlationId: command.correlationId,
      metadata: { name: command.name, scopes: command.scopes },
    });

    return {
      id,
      name: command.name,
      keyPrefix: generated.keyPrefix,
      scopes: command.scopes,
      createdAt: now,
      expiresAt: command.expiresAt,
      rawKey: generated.rawKey,
    };
  }
}

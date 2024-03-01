import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '@medsphere/auth-sdk';
import {
  createDomainEvent,
  nowIso,
  type UserDto,
} from '@medsphere/shared';
import type { RegisterUserCommand } from '../commands/register-user.command';
import { User } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { Password } from '../../domain/value-objects/password.vo';
import {
  ConflictError,
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
  OUTBOX_REPOSITORY,
  type OutboxRepository,
} from '../../domain/repositories/outbox.repository';
import {
  AUDIT_REPOSITORY,
  type AuditRepository,
} from '../../domain/repositories/audit.repository';
import { AUTH_EVENT_TYPES } from '../../domain/events/auth.domain-events';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @Inject(ORGANIZATION_REPOSITORY)
    private readonly orgRepo: OrganizationRepository,
    @Inject(OUTBOX_REPOSITORY) private readonly outboxRepo: OutboxRepository,
    @Inject(AUDIT_REPOSITORY) private readonly auditRepo: AuditRepository,
  ) {}

  async execute(command: RegisterUserCommand): Promise<UserDto> {
    const email = Email.create(command.email);
    const password = Password.create(command.password);

    const organization = await this.orgRepo.findById(command.organizationId);
    if (!organization) {
      throw new NotFoundError('Organization not found');
    }
    organization.assertActive();

    const exists = await this.userRepo.existsByEmail(
      command.organizationId,
      email,
    );
    if (exists) {
      throw new ConflictError('A user with this email already exists in the organization');
    }

    const now = nowIso();
    const passwordHash = await hashPassword(password.value);
    const user = User.register({
      id: uuidv4() as import('@medsphere/shared').UUID,
      organizationId: command.organizationId,
      email,
      passwordHash,
      firstName: command.firstName,
      lastName: command.lastName,
      phone: command.phone,
      now,
    });

    await this.userRepo.save(user);

    const envelope = createDomainEvent({
      eventId: uuidv4() as import('@medsphere/shared').UUID,
      eventType: AUTH_EVENT_TYPES.USER_REGISTERED,
      occurredAt: now,
      correlationId: command.correlationId,
      organizationId: user.organizationId,
      actorId: user.id,
      payload: {
        userId: user.id,
        email: email.normalized,
        organizationId: user.organizationId,
      },
    });

    await this.outboxRepo.append([
      {
        aggregateType: 'User',
        aggregateId: user.id,
        eventType: AUTH_EVENT_TYPES.USER_REGISTERED,
        payload: envelope.payload,
        envelope,
      },
    ]);

    await this.auditRepo.append({
      organizationId: user.organizationId,
      actorId: user.id,
      action: 'USER_REGISTER',
      resourceType: 'User',
      resourceId: user.id,
      outcome: 'SUCCESS',
      ipAddress: command.ipAddress,
      userAgent: command.userAgent,
      correlationId: command.correlationId,
    });

    return UserMapper.toDto(user);
  }
}

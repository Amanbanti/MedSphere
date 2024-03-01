import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { SendNotificationCommand } from '../commands/send-notification.command';
import { NOTIFICATION_REPOSITORY, type NotificationRepository } from '../../domain/repositories/notification.repository';
import { Notification } from '../../domain/entities/notification.entity';
import {
  NotificationNotFoundError,
  ValidationError,
} from '../../domain/errors/notification.errors';
import { NotificationMapper } from '../mappers/notification.mapper';

@Injectable()
export class SendNotificationUseCase {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY) private readonly repository: NotificationRepository,
  ) {}

  async execute(command: SendNotificationCommand) {
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = Notification.register({
      id,
      organizationId: command.organizationId,
      now,
      ...(command.payload as Record<string, never>),
    } as Parameters<typeof Notification.register>[0]);
    await this.repository.save(entity);
    return NotificationMapper.toDto(entity);
  }
}

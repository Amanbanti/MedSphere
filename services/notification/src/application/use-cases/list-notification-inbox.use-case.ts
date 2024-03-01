import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { ListNotificationInboxCommand } from '../commands/list-notification-inbox.command';
import { NOTIFICATION_REPOSITORY, type NotificationRepository } from '../../domain/repositories/notification.repository';
import { Notification } from '../../domain/entities/notification.entity';
import {
  NotificationNotFoundError,
  ValidationError,
} from '../../domain/errors/notification.errors';
import { NotificationMapper } from '../mappers/notification.mapper';

@Injectable()
export class ListNotificationInboxUseCase {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY) private readonly repository: NotificationRepository,
  ) {}

  async execute(command: ListNotificationInboxCommand) {
    const query = command.query ?? {};
    const result = await this.repository.list(command.organizationId, query);
    return {
      items: result.items.map((item) => NotificationMapper.toDto(item)),
      meta: result.meta,
    };
  }
}

import type { Notification } from '../../domain/entities/notification.entity';

export interface NotificationDto {
  id: string;
  organizationId: string;
  recipientId: string;
  channel: NotificationChannel;
  subject: string;
  body: string;
  status: NotificationStatus;
  sentAt: string | null;
  readAt: string | null;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class NotificationMapper {
  static toDto(entity: Notification): NotificationDto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
      recipientId: entity.recipientId,
      channel: entity.channel,
      subject: entity.subject,
      body: entity.body,
      status: entity.status,
      sentAt: entity.sentAt,
      readAt: entity.readAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}

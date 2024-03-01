import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { Notification } from '../entities/notification.entity';

export interface NotificationFactoryInput {
  organizationId: UUID;
  recipientId: UUID;
  channel: NotificationChannel;
  subject: string;
  body: string;
  status: NotificationStatus;
  sentAt?: string | null;
  id?: UUID;
  now?: string;
}

export class NotificationFactory {
  static create(input: NotificationFactoryInput): Notification {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return Notification.register({
      id,
      organizationId: input.organizationId,
      now,
      recipientId: input.recipientId,
      channel: input.channel,
      subject: input.subject,
      body: input.body,
      status: input.status,
      sentAt: input.sentAt ?? null,
    } as Parameters<typeof Notification.register>[0]);
  }

  static reconstitute(props: Parameters<typeof Notification.reconstitute>[0]): Notification {
    return Notification.reconstitute(props);
  }

  static clone(source: Notification, overrides: Partial<NotificationFactoryInput> = {}): Notification {
    const snapshot = source.toSnapshot();
    return NotificationFactory.create({
      organizationId: snapshot.organizationId as UUID,
      recipientId: (overrides.recipientId ?? snapshot.recipientId) as UUID,
      channel: (overrides.channel ?? snapshot.channel) as NotificationChannel,
      subject: (overrides.subject ?? snapshot.subject) as string,
      body: (overrides.body ?? snapshot.body) as string,
      status: (overrides.status ?? snapshot.status) as NotificationStatus,
      sentAt: (overrides.sentAt ?? snapshot.sentAt) as string | null,
      id: overrides.id,
      now: overrides.now,
    });
  }
}

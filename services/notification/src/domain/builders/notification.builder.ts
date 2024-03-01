import type { UUID } from '@medsphere/shared';
import { NotificationFactory, type NotificationFactoryInput } from '../factories/notification.factory';
import { Notification } from '../entities/notification.entity';

export class NotificationBuilder {
  private readonly input: Partial<NotificationFactoryInput> = {};

  static create(): NotificationBuilder {
    return new NotificationBuilder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

  withRecipientId(recipientId: UUID): this {
    this.input.recipientId = recipientId;
    return this;
  }

  withChannel(channel: NotificationChannel): this {
    this.input.channel = channel;
    return this;
  }

  withSubject(subject: string): this {
    this.input.subject = subject;
    return this;
  }

  withBody(body: string): this {
    this.input.body = body;
    return this;
  }

  withStatus(status: NotificationStatus): this {
    this.input.status = status;
    return this;
  }

  withSentAt(sentAt: string | null): this {
    this.input.sentAt = sentAt;
    return this;
  }

  withReadAt(readAt: string | null): this {
    this.input.readAt = readAt;
    return this;
  }

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): Notification {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return NotificationFactory.create(this.input as NotificationFactoryInput);
  }
}

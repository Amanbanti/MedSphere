import { Module } from '@nestjs/common';
import { NotificationController } from '../presentation/http/notification.controller';
import { NOTIFICATION_REPOSITORY } from '../domain/repositories/notification.repository';
import { InMemoryNotificationRepository } from '../infrastructure/persistence/in-memory-notification.repository';
import { PrismaNotificationRepository } from '../infrastructure/persistence/prisma-notification.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { NotificationOrchestrator } from '../application/services/notification-orchestrator.service';
import { NotificationEventPublisher } from '../infrastructure/messaging/notification-event.publisher';

import {
  SendNotificationUseCase,
    MarkNotificationReadUseCase,
    ListNotificationInboxUseCase,
    ConfigureNotificationPreferencesUseCase,
} from '../application/use-cases';

@Module({
  controllers: [NotificationController],
  providers: [
    PrismaService,
    InMemoryNotificationRepository,
    NotificationOrchestrator,
    NotificationEventPublisher,
    {
      provide: NOTIFICATION_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemoryNotificationRepository
        : PrismaNotificationRepository,
    },
    SendNotificationUseCase,
    MarkNotificationReadUseCase,
    ListNotificationInboxUseCase,
    ConfigureNotificationPreferencesUseCase,
  ],
  exports: [NOTIFICATION_REPOSITORY, NotificationOrchestrator],
})
export class NotificationModule {}

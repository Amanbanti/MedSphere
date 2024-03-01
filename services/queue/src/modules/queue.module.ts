import { Module } from '@nestjs/common';
import { QueueJobController } from '../presentation/http/queue-job.controller';
import { QUEUE_JOB_REPOSITORY } from '../domain/repositories/queue-job.repository';
import { InMemoryQueueJobRepository } from '../infrastructure/persistence/in-memory-queue-job.repository';
import { PrismaQueueJobRepository } from '../infrastructure/persistence/prisma-queue-job.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { QueueOrchestrator } from '../application/services/queue-orchestrator.service';
import { QueueEventPublisher } from '../infrastructure/messaging/queue-event.publisher';

import {
  EnqueueJobUseCase,
    DequeueJobUseCase,
    AcknowledgeJobUseCase,
    GetQueueStatsUseCase,
} from '../application/use-cases';

@Module({
  controllers: [QueueJobController],
  providers: [
    PrismaService,
    InMemoryQueueJobRepository,
    QueueOrchestrator,
    QueueEventPublisher,
    {
      provide: QUEUE_JOB_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemoryQueueJobRepository
        : PrismaQueueJobRepository,
    },
    EnqueueJobUseCase,
    DequeueJobUseCase,
    AcknowledgeJobUseCase,
    GetQueueStatsUseCase,
  ],
  exports: [QUEUE_JOB_REPOSITORY, QueueOrchestrator],
})
export class QueueModule {}

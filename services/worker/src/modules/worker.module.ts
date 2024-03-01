import { Module } from '@nestjs/common';
import { WorkerTaskController } from '../presentation/http/worker-task.controller';
import { WORKER_TASK_REPOSITORY } from '../domain/repositories/worker-task.repository';
import { InMemoryWorkerTaskRepository } from '../infrastructure/persistence/in-memory-worker-task.repository';
import { PrismaWorkerTaskRepository } from '../infrastructure/persistence/prisma-worker-task.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { WorkerOrchestrator } from '../application/services/worker-orchestrator.service';
import { WorkerEventPublisher } from '../infrastructure/messaging/worker-event.publisher';

import {
  RegisterWorkerHandlerUseCase,
    ProcessWorkerJobUseCase,
    RetryFailedWorkerJobUseCase,
    GetWorkerStatusUseCase,
} from '../application/use-cases';

@Module({
  controllers: [WorkerTaskController],
  providers: [
    PrismaService,
    InMemoryWorkerTaskRepository,
    WorkerOrchestrator,
    WorkerEventPublisher,
    {
      provide: WORKER_TASK_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemoryWorkerTaskRepository
        : PrismaWorkerTaskRepository,
    },
    RegisterWorkerHandlerUseCase,
    ProcessWorkerJobUseCase,
    RetryFailedWorkerJobUseCase,
    GetWorkerStatusUseCase,
  ],
  exports: [WORKER_TASK_REPOSITORY, WorkerOrchestrator],
})
export class WorkerModule {}

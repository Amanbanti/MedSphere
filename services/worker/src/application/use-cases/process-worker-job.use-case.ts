import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { ProcessWorkerJobCommand } from '../commands/process-worker-job.command';
import { WORKER_TASK_REPOSITORY, type WorkerTaskRepository } from '../../domain/repositories/worker-task.repository';
import { WorkerTask } from '../../domain/entities/worker-task.entity';
import {
  WorkerNotFoundError,
  ValidationError,
} from '../../domain/errors/worker.errors';
import { WorkerTaskMapper } from '../mappers/worker-task.mapper';

@Injectable()
export class ProcessWorkerJobUseCase {
  constructor(
    @Inject(WORKER_TASK_REPOSITORY) private readonly repository: WorkerTaskRepository,
  ) {}

  async execute(command: ProcessWorkerJobCommand) {
    if (!command.id && !command.payload) {
      throw new ValidationError('id or payload is required');
    }
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (!targetId) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, targetId);
    if (!entity) {
      throw new WorkerNotFoundError(targetId);
    }
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    return WorkerTaskMapper.toDto(entity);
  }
}

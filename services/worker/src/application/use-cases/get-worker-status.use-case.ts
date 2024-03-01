import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { GetWorkerStatusCommand } from '../commands/get-worker-status.command';
import { WORKER_TASK_REPOSITORY, type WorkerTaskRepository } from '../../domain/repositories/worker-task.repository';
import { WorkerTask } from '../../domain/entities/worker-task.entity';
import {
  WorkerNotFoundError,
  ValidationError,
} from '../../domain/errors/worker.errors';
import { WorkerTaskMapper } from '../mappers/worker-task.mapper';

@Injectable()
export class GetWorkerStatusUseCase {
  constructor(
    @Inject(WORKER_TASK_REPOSITORY) private readonly repository: WorkerTaskRepository,
  ) {}

  async execute(command: GetWorkerStatusCommand) {
    const query = command.query ?? {};
    const result = await this.repository.list(command.organizationId, query);
    return {
      items: result.items.map((item) => WorkerTaskMapper.toDto(item)),
      meta: result.meta,
    };
  }
}

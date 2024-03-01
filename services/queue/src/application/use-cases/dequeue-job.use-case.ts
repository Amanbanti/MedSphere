import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { DequeueJobCommand } from '../commands/dequeue-job.command';
import { QUEUE_JOB_REPOSITORY, type QueueJobRepository } from '../../domain/repositories/queue-job.repository';
import { QueueJob } from '../../domain/entities/queue-job.entity';
import {
  QueueNotFoundError,
  ValidationError,
} from '../../domain/errors/queue.errors';
import { QueueJobMapper } from '../mappers/queue-job.mapper';

@Injectable()
export class DequeueJobUseCase {
  constructor(
    @Inject(QUEUE_JOB_REPOSITORY) private readonly repository: QueueJobRepository,
  ) {}

  async execute(command: DequeueJobCommand) {
    if (!command.id && !command.payload) {
      throw new ValidationError('id or payload is required');
    }
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (!targetId) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, targetId);
    if (!entity) {
      throw new QueueNotFoundError(targetId);
    }
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    return QueueJobMapper.toDto(entity);
  }
}

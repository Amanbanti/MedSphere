import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { EnqueueJobCommand } from '../commands/enqueue-job.command';
import { QUEUE_JOB_REPOSITORY, type QueueJobRepository } from '../../domain/repositories/queue-job.repository';
import { QueueJob } from '../../domain/entities/queue-job.entity';
import {
  QueueNotFoundError,
  ValidationError,
} from '../../domain/errors/queue.errors';
import { QueueJobMapper } from '../mappers/queue-job.mapper';

@Injectable()
export class EnqueueJobUseCase {
  constructor(
    @Inject(QUEUE_JOB_REPOSITORY) private readonly repository: QueueJobRepository,
  ) {}

  async execute(command: EnqueueJobCommand) {
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = QueueJob.register({
      id,
      organizationId: command.organizationId,
      now,
      ...(command.payload as Record<string, never>),
    } as Parameters<typeof QueueJob.register>[0]);
    await this.repository.save(entity);
    return QueueJobMapper.toDto(entity);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { GetQueueStatsCommand } from '../commands/get-queue-stats.command';
import { QUEUE_JOB_REPOSITORY, type QueueJobRepository } from '../../domain/repositories/queue-job.repository';
import { QueueJob } from '../../domain/entities/queue-job.entity';
import {
  QueueNotFoundError,
  ValidationError,
} from '../../domain/errors/queue.errors';
import { QueueJobMapper } from '../mappers/queue-job.mapper';

@Injectable()
export class GetQueueStatsUseCase {
  constructor(
    @Inject(QUEUE_JOB_REPOSITORY) private readonly repository: QueueJobRepository,
  ) {}

  async execute(command: GetQueueStatsCommand) {
    const query = command.query ?? {};
    const result = await this.repository.list(command.organizationId, query);
    return {
      items: result.items.map((item) => QueueJobMapper.toDto(item)),
      meta: result.meta,
    };
  }
}

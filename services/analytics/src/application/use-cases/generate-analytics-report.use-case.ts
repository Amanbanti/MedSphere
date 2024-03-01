import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { GenerateAnalyticsReportCommand } from '../commands/generate-analytics-report.command';
import { ANALYTICS_EVENT_REPOSITORY, type AnalyticsEventRepository } from '../../domain/repositories/analytics-event.repository';
import { AnalyticsEvent } from '../../domain/entities/analytics-event.entity';
import {
  AnalyticsNotFoundError,
  ValidationError,
} from '../../domain/errors/analytics.errors';
import { AnalyticsEventMapper } from '../mappers/analytics-event.mapper';

@Injectable()
export class GenerateAnalyticsReportUseCase {
  constructor(
    @Inject(ANALYTICS_EVENT_REPOSITORY) private readonly repository: AnalyticsEventRepository,
  ) {}

  async execute(command: GenerateAnalyticsReportCommand) {
    if (!command.id && !command.payload) {
      throw new ValidationError('id or payload is required');
    }
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (!targetId) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, targetId);
    if (!entity) {
      throw new AnalyticsNotFoundError(targetId);
    }
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    return AnalyticsEventMapper.toDto(entity);
  }
}

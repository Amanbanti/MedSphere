import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { AggregateAnalyticsMetricsCommand } from '../commands/aggregate-analytics-metrics.command';
import { ANALYTICS_EVENT_REPOSITORY, type AnalyticsEventRepository } from '../../domain/repositories/analytics-event.repository';
import { AnalyticsEvent } from '../../domain/entities/analytics-event.entity';
import {
  AnalyticsNotFoundError,
  ValidationError,
} from '../../domain/errors/analytics.errors';
import { AnalyticsEventMapper } from '../mappers/analytics-event.mapper';

@Injectable()
export class AggregateAnalyticsMetricsUseCase {
  constructor(
    @Inject(ANALYTICS_EVENT_REPOSITORY) private readonly repository: AnalyticsEventRepository,
  ) {}

  async execute(command: AggregateAnalyticsMetricsCommand) {
    const query = command.query ?? {};
    const result = await this.repository.list(command.organizationId, query);
    return {
      items: result.items.map((item) => AnalyticsEventMapper.toDto(item)),
      meta: result.meta,
    };
  }
}

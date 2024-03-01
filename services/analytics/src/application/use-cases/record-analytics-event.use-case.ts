import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { RecordAnalyticsEventCommand } from '../commands/record-analytics-event.command';
import { ANALYTICS_EVENT_REPOSITORY, type AnalyticsEventRepository } from '../../domain/repositories/analytics-event.repository';
import { AnalyticsEvent } from '../../domain/entities/analytics-event.entity';
import {
  AnalyticsNotFoundError,
  ValidationError,
} from '../../domain/errors/analytics.errors';
import { AnalyticsEventMapper } from '../mappers/analytics-event.mapper';

@Injectable()
export class RecordAnalyticsEventUseCase {
  constructor(
    @Inject(ANALYTICS_EVENT_REPOSITORY) private readonly repository: AnalyticsEventRepository,
  ) {}

  async execute(command: RecordAnalyticsEventCommand) {
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = AnalyticsEvent.register({
      id,
      organizationId: command.organizationId,
      now,
      ...(command.payload as Record<string, never>),
    } as Parameters<typeof AnalyticsEvent.register>[0]);
    await this.repository.save(entity);
    return AnalyticsEventMapper.toDto(entity);
  }
}

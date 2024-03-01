import type { AnalyticsEvent } from '../../domain/entities/analytics-event.entity';

export interface AnalyticsEventDto {
  id: string;
  organizationId: string;
  eventType: string;
  source: string;
  payload: Record<string, unknown>;
  occurredAt: string;
  actorId: string | null;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class AnalyticsEventMapper {
  static toDto(entity: AnalyticsEvent): AnalyticsEventDto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
      eventType: entity.eventType,
      source: entity.source,
      payload: entity.payload,
      occurredAt: entity.occurredAt,
      actorId: entity.actorId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}

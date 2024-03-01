import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { AnalyticsEvent } from '../entities/analytics-event.entity';

export interface AnalyticsEventFactoryInput {
  organizationId: UUID;
  eventType: string;
  source: string;
  payload: Record<string, unknown>;
  occurredAt: string;
  actorId?: UUID | null;
  id?: UUID;
  now?: string;
}

export class AnalyticsEventFactory {
  static create(input: AnalyticsEventFactoryInput): AnalyticsEvent {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return AnalyticsEvent.register({
      id,
      organizationId: input.organizationId,
      now,
      eventType: input.eventType,
      source: input.source,
      payload: input.payload,
      occurredAt: input.occurredAt,
      actorId: input.actorId ?? null,
    } as Parameters<typeof AnalyticsEvent.register>[0]);
  }

  static reconstitute(props: Parameters<typeof AnalyticsEvent.reconstitute>[0]): AnalyticsEvent {
    return AnalyticsEvent.reconstitute(props);
  }

  static clone(source: AnalyticsEvent, overrides: Partial<AnalyticsEventFactoryInput> = {}): AnalyticsEvent {
    const snapshot = source.toSnapshot();
    return AnalyticsEventFactory.create({
      organizationId: snapshot.organizationId as UUID,
      eventType: (overrides.eventType ?? snapshot.eventType) as string,
      source: (overrides.source ?? snapshot.source) as string,
      payload: (overrides.payload ?? snapshot.payload) as Record<string, unknown>,
      occurredAt: (overrides.occurredAt ?? snapshot.occurredAt) as string,
      actorId: (overrides.actorId ?? snapshot.actorId) as UUID | null,
      id: overrides.id,
      now: overrides.now,
    });
  }
}

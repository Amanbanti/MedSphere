import { Injectable } from '@nestjs/common';
import { createDomainEvent, nowIso, type UUID } from '@medsphere/shared';
import { v4 as uuidv4 } from 'uuid';
import { VIDEO_CONSULTATION_EVENT_TYPES } from '../../domain/events/video-consultation.domain-events';

export interface PublishedEvent {
  eventType: string;
  aggregateId: UUID;
  payload: Record<string, unknown>;
}

@Injectable()
export class VideoConsultationEventPublisher {
  private readonly buffer: PublishedEvent[] = [];

  recordCreated(organizationId: UUID, aggregateId: UUID, actorId: UUID, payload: Record<string, unknown>): PublishedEvent {
    const envelope = createDomainEvent({
      eventId: uuidv4() as UUID,
      eventType: VIDEO_CONSULTATION_EVENT_TYPES.CREATED,
      occurredAt: nowIso(),
      organizationId,
      actorId,
      payload: { aggregateId, ...payload },
    });
    const event: PublishedEvent = {
      eventType: envelope.eventType,
      aggregateId,
      payload: envelope.payload as Record<string, unknown>,
    };
    this.buffer.push(event);
    return event;
  }

  recordUpdated(organizationId: UUID, aggregateId: UUID, actorId: UUID, payload: Record<string, unknown>): PublishedEvent {
    const envelope = createDomainEvent({
      eventId: uuidv4() as UUID,
      eventType: VIDEO_CONSULTATION_EVENT_TYPES.UPDATED,
      occurredAt: nowIso(),
      organizationId,
      actorId,
      payload: { aggregateId, ...payload },
    });
    const event: PublishedEvent = {
      eventType: envelope.eventType,
      aggregateId,
      payload: envelope.payload as Record<string, unknown>,
    };
    this.buffer.push(event);
    return event;
  }

  drain(): PublishedEvent[] {
    const events = [...this.buffer];
    this.buffer.length = 0;
    return events;
  }
}

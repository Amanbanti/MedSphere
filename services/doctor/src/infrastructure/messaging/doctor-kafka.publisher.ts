import { Injectable } from '@nestjs/common';
import { createDomainEvent, nowIso, type UUID } from '@medsphere/shared';
import { v4 as uuidv4 } from 'uuid';

export const DOCTOR_TOPICS = {
  CREATED: 'medsphere.doctor.created',
  UPDATED: 'medsphere.doctor.updated',
  DELETED: 'medsphere.doctor.deleted',
  STATUS_CHANGED: 'medsphere.doctor.status-changed',
} as const;

export interface KafkaPublishPayload {
  topic: string;
  key: string;
  value: Record<string, unknown>;
}

@Injectable()
export class DoctorKafkaPublisher {
  private readonly outbox: KafkaPublishPayload[] = [];
  private readonly kafkaEnabled: boolean;

  constructor() {
    this.kafkaEnabled = process.env.KAFKA_BROKERS != null && process.env.USE_IN_MEMORY_REPO !== 'true';
  }

  publishCreated(organizationId: UUID, aggregateId: UUID, actorId: UUID, payload: Record<string, unknown>): void {
    this.enqueue(DOCTOR_TOPICS.CREATED, organizationId, aggregateId, actorId, payload);
  }

  publishUpdated(organizationId: UUID, aggregateId: UUID, actorId: UUID, payload: Record<string, unknown>): void {
    this.enqueue(DOCTOR_TOPICS.UPDATED, organizationId, aggregateId, actorId, payload);
  }

  publishStatusChanged(organizationId: UUID, aggregateId: UUID, actorId: UUID, fromStatus: string, toStatus: string): void {
    this.enqueue(DOCTOR_TOPICS.STATUS_CHANGED, organizationId, aggregateId, actorId, { fromStatus, toStatus });
  }

  private enqueue(topic: string, organizationId: UUID, aggregateId: UUID, actorId: UUID, payload: Record<string, unknown>): void {
    const envelope = createDomainEvent({
      eventId: uuidv4() as UUID,
      eventType: topic,
      occurredAt: nowIso(),
      organizationId,
      actorId,
      payload: { aggregateId, ...payload },
    });
    this.outbox.push({ topic, key: aggregateId, value: envelope as unknown as Record<string, unknown> });
  }

  drain(): KafkaPublishPayload[] {
    const events = [...this.outbox];
    this.outbox.length = 0;
    return events;
  }

  isKafkaEnabled(): boolean {
    return this.kafkaEnabled;
  }
}

import type { UUID } from '@medsphere/shared';
import { AnalyticsEventFactory, type AnalyticsEventFactoryInput } from '../factories/analytics-event.factory';
import { AnalyticsEvent } from '../entities/analytics-event.entity';

export class AnalyticsEventBuilder {
  private readonly input: Partial<AnalyticsEventFactoryInput> = {};

  static create(): AnalyticsEventBuilder {
    return new AnalyticsEventBuilder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

  withEventType(eventType: string): this {
    this.input.eventType = eventType;
    return this;
  }

  withSource(source: string): this {
    this.input.source = source;
    return this;
  }

  withPayload(payload: Record<string, unknown>): this {
    this.input.payload = payload;
    return this;
  }

  withOccurredAt(occurredAt: string): this {
    this.input.occurredAt = occurredAt;
    return this;
  }

  withActorId(actorId: UUID | null): this {
    this.input.actorId = actorId;
    return this;
  }

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): AnalyticsEvent {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return AnalyticsEventFactory.create(this.input as AnalyticsEventFactoryInput);
  }
}

import type { OutboxDomainEvent } from '../events/auth.domain-events';

export interface OutboxRepository {
  append(events: OutboxDomainEvent[]): Promise<void>;
  findPending(limit: number): Promise<OutboxDomainEvent[]>;
  markPublished(eventIds: string[]): Promise<void>;
}

export const OUTBOX_REPOSITORY = Symbol('OUTBOX_REPOSITORY');

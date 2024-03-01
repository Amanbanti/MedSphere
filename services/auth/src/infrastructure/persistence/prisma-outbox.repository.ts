import { Injectable } from '@nestjs/common';
import type { OutboxDomainEvent } from '../../domain/events/auth.domain-events';
import type { OutboxRepository } from '../../domain/repositories/outbox.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaOutboxRepository implements OutboxRepository {
  constructor(private readonly prisma: PrismaService) {}

  async append(events: OutboxDomainEvent[]): Promise<void> {
    if (events.length === 0) {
      return;
    }
    await this.prisma.client.outboxEvent.createMany({
      data: events.map((event) => ({
        aggregateType: event.aggregateType,
        aggregateId: event.aggregateId,
        eventType: event.eventType,
        payload: event.envelope as object,
        headers: {
          correlationId: event.envelope.correlationId,
          eventVersion: event.envelope.eventVersion,
        },
      })),
    });
  }

  async findPending(limit: number): Promise<OutboxDomainEvent[]> {
    const rows = await this.prisma.client.outboxEvent.findMany({
      where: { publishedAt: null },
      orderBy: { createdAt: 'asc' },
      take: limit,
    });

    return rows.map((row) => {
      const envelope = row.payload as OutboxDomainEvent['envelope'];
      return {
        aggregateType: row.aggregateType,
        aggregateId: row.aggregateId as import('@medsphere/shared').UUID,
        eventType: row.eventType as OutboxDomainEvent['eventType'],
        payload: envelope.payload,
        envelope,
      };
    });
  }

  async markPublished(eventIds: string[]): Promise<void> {
    if (eventIds.length === 0) {
      return;
    }
    await this.prisma.client.outboxEvent.updateMany({
      where: { id: { in: eventIds } },
      data: { publishedAt: new Date(), attempts: { increment: 1 } },
    });
  }
}

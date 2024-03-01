import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import type { DomainEventEnvelope } from '@medsphere/shared';

export type EventHandler<TPayload = unknown> = (
  event: DomainEventEnvelope<TPayload, string>,
) => Promise<void>;

export interface KafkaConsumerConfig {
  groupId: string;
  brokers: string[];
  topics: string[];
}

@Injectable()
export class PatientKafkaConsumer implements OnModuleInit {
  private readonly logger = new Logger(PatientKafkaConsumer.name);
  private readonly handlers = new Map<string, EventHandler[]>();

  constructor(private readonly config: KafkaConsumerConfig) {}

  on(eventType: string, handler: EventHandler): void {
    const list = this.handlers.get(eventType) ?? [];
    list.push(handler);
    this.handlers.set(eventType, list);
  }

  async onModuleInit(): Promise<void> {
    this.logger.log(
      `Kafka consumer subscribed group=${this.config.groupId} topics=${this.config.topics.join(',')}`,
    );
  }

  async handleMessage(raw: string): Promise<void> {
    const event = JSON.parse(raw) as DomainEventEnvelope<unknown, string>;
    const handlers = this.handlers.get(event.eventType) ?? [];
    for (const handler of handlers) {
      await handler(event);
    }
  }

  registerDefaultHandlers(): void {
    this.on('patient.created', async (event) => {
      this.logger.log(`Handled ${event.eventType} id=${event.eventId}`);
    });
    this.on('patient.updated', async (event) => {
      this.logger.log(`Handled ${event.eventType} id=${event.eventId}`);
    });
  }
}

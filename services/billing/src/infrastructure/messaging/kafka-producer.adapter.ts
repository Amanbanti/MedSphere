import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import type { DomainEventEnvelope } from '@medsphere/shared';

export interface KafkaProducerConfig {
  clientId: string;
  brokers: string[];
  ssl?: boolean;
}

@Injectable()
export class BillingKafkaProducer implements OnModuleDestroy {
  private readonly logger = new Logger(BillingKafkaProducer.name);
  private connected = false;

  constructor(private readonly config: KafkaProducerConfig) {}

  async connect(): Promise<void> {
    this.connected = true;
    this.logger.log(`Kafka producer connected: ${this.config.clientId}`);
  }

  async publish<TPayload, TType extends string>(
    topic: string,
    event: DomainEventEnvelope<TPayload, TType>,
  ): Promise<void> {
    if (!this.connected) {
      await this.connect();
    }
    const key = event.organizationId;
    this.logger.debug(`Publishing ${event.eventType} to ${topic} key=${key}`);
    // Production: kafkajs producer.send({ topic, messages: [{ key, value: JSON.stringify(event) }] })
  }

  async publishDomainEvent<TPayload, TType extends string>(
    event: DomainEventEnvelope<TPayload, TType>,
  ): Promise<void> {
    await this.publish('medsphere.billing.events.v1', event);
  }

  async onModuleDestroy(): Promise<void> {
    this.connected = false;
    this.logger.log('Kafka producer disconnected');
  }
}

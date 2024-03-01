import { registerAs } from '@nestjs/config';

export interface QueueConfig {
  port: number;
  serviceName: string;
}

export const queueConfigFactory = registerAs('queue', (): QueueConfig => ({
  port: parseInt(process.env.PORT ?? '3027', 10),
  serviceName: process.env.SERVICE_NAME ?? 'queue-service',
}));

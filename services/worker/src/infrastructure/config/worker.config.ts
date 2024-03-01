import { registerAs } from '@nestjs/config';

export interface WorkerConfig {
  port: number;
  serviceName: string;
}

export const workerConfigFactory = registerAs('worker', (): WorkerConfig => ({
  port: parseInt(process.env.PORT ?? '3028', 10),
  serviceName: process.env.SERVICE_NAME ?? 'worker-service',
}));

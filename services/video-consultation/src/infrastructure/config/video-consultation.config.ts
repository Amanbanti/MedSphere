import { registerAs } from '@nestjs/config';

export interface VideoConsultationConfig {
  port: number;
  serviceName: string;
}

export const videoConsultationConfigFactory = registerAs('video-consultation', (): VideoConsultationConfig => ({
  port: parseInt(process.env.PORT ?? '3026', 10),
  serviceName: process.env.SERVICE_NAME ?? 'video-consultation-service',
}));

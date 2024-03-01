import { registerAs } from '@nestjs/config';

export interface AnalyticsConfig {
  port: number;
  serviceName: string;
}

export const analyticsConfigFactory = registerAs('analytics', (): AnalyticsConfig => ({
  port: parseInt(process.env.PORT ?? '3023', 10),
  serviceName: process.env.SERVICE_NAME ?? 'analytics-service',
}));

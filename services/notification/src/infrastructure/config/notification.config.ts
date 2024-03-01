import { registerAs } from '@nestjs/config';

export interface NotificationConfig {
  port: number;
  serviceName: string;
}

export const notificationConfigFactory = registerAs('notification', (): NotificationConfig => ({
  port: parseInt(process.env.PORT ?? '3022', 10),
  serviceName: process.env.SERVICE_NAME ?? 'notification-service',
}));

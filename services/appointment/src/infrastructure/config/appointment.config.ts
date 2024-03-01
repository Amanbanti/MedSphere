import { registerAs } from '@nestjs/config';

export interface AppointmentConfig {
  port: number;
  serviceName: string;
}

export const appointmentConfigFactory = registerAs('appointment', (): AppointmentConfig => ({
  port: parseInt(process.env.PORT ?? '3012', 10),
  serviceName: process.env.SERVICE_NAME ?? 'appointment-service',
}));

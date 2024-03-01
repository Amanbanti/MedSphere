import { registerAs } from '@nestjs/config';

export interface PrescriptionConfig {
  port: number;
  serviceName: string;
}

export const prescriptionConfigFactory = registerAs('prescription', (): PrescriptionConfig => ({
  port: parseInt(process.env.PORT ?? '3021', 10),
  serviceName: process.env.SERVICE_NAME ?? 'prescription-service',
}));

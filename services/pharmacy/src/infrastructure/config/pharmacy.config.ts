import { registerAs } from '@nestjs/config';

export interface PharmacyConfig {
  port: number;
  serviceName: string;
}

export const pharmacyConfigFactory = registerAs('pharmacy', (): PharmacyConfig => ({
  port: parseInt(process.env.PORT ?? '3014', 10),
  serviceName: process.env.SERVICE_NAME ?? 'pharmacy-service',
}));

import { registerAs } from '@nestjs/config';

export interface RadiologyConfig {
  port: number;
  serviceName: string;
}

export const radiologyConfigFactory = registerAs('radiology', (): RadiologyConfig => ({
  port: parseInt(process.env.PORT ?? '3016', 10),
  serviceName: process.env.SERVICE_NAME ?? 'radiology-service',
}));

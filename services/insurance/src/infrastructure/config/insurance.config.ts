import { registerAs } from '@nestjs/config';

export interface InsuranceConfig {
  port: number;
  serviceName: string;
}

export const insuranceConfigFactory = registerAs('insurance', (): InsuranceConfig => ({
  port: parseInt(process.env.PORT ?? '3019', 10),
  serviceName: process.env.SERVICE_NAME ?? 'insurance-service',
}));

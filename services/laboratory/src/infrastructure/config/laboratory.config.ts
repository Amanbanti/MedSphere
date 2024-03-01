import { registerAs } from '@nestjs/config';

export interface LaboratoryConfig {
  port: number;
  serviceName: string;
}

export const laboratoryConfigFactory = registerAs('laboratory', (): LaboratoryConfig => ({
  port: parseInt(process.env.PORT ?? '3015', 10),
  serviceName: process.env.SERVICE_NAME ?? 'laboratory-service',
}));

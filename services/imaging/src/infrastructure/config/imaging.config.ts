import { registerAs } from '@nestjs/config';

export interface ImagingConfig {
  port: number;
  serviceName: string;
}

export const imagingConfigFactory = registerAs('imaging', (): ImagingConfig => ({
  port: parseInt(process.env.PORT ?? '3017', 10),
  serviceName: process.env.SERVICE_NAME ?? 'imaging-service',
}));

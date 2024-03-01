import { registerAs } from '@nestjs/config';

export interface SearchConfig {
  port: number;
  serviceName: string;
}

export const searchConfigFactory = registerAs('search', (): SearchConfig => ({
  port: parseInt(process.env.PORT ?? '3025', 10),
  serviceName: process.env.SERVICE_NAME ?? 'search-service',
}));

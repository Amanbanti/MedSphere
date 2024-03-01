import { registerAs } from '@nestjs/config';

export interface BillingConfig {
  port: number;
  serviceName: string;
}

export const billingConfigFactory = registerAs('billing', (): BillingConfig => ({
  port: parseInt(process.env.PORT ?? '3018', 10),
  serviceName: process.env.SERVICE_NAME ?? 'billing-service',
}));

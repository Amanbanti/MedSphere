import { registerAs } from '@nestjs/config';

export interface PaymentConfig {
  port: number;
  serviceName: string;
}

export const paymentConfigFactory = registerAs('payment', (): PaymentConfig => ({
  port: parseInt(process.env.PORT ?? '3020', 10),
  serviceName: process.env.SERVICE_NAME ?? 'payment-service',
}));

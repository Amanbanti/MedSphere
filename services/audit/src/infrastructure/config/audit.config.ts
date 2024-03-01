import { registerAs } from '@nestjs/config';

export interface AuditConfig {
  port: number;
  serviceName: string;
}

export const auditConfigFactory = registerAs('audit', (): AuditConfig => ({
  port: parseInt(process.env.PORT ?? '3024', 10),
  serviceName: process.env.SERVICE_NAME ?? 'audit-service',
}));

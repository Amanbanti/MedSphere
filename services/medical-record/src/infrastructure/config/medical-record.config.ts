import { registerAs } from '@nestjs/config';

export interface MedicalRecordConfig {
  port: number;
  serviceName: string;
}

export const medicalRecordConfigFactory = registerAs('medical-record', (): MedicalRecordConfig => ({
  port: parseInt(process.env.PORT ?? '3013', 10),
  serviceName: process.env.SERVICE_NAME ?? 'medical-record-service',
}));

import { registerAs } from '@nestjs/config';

export interface PatientConfig {
  port: number;
  serviceName: string;
}

export const patientConfigFactory = registerAs('patient', (): PatientConfig => ({
  port: parseInt(process.env.PORT ?? '3010', 10),
  serviceName: process.env.SERVICE_NAME ?? 'patient-service',
}));

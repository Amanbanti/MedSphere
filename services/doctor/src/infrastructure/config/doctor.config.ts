import { registerAs } from '@nestjs/config';

export interface DoctorConfig {
  port: number;
  serviceName: string;
}

export const doctorConfigFactory = registerAs('doctor', (): DoctorConfig => ({
  port: parseInt(process.env.PORT ?? '3011', 10),
  serviceName: process.env.SERVICE_NAME ?? 'doctor-service',
}));

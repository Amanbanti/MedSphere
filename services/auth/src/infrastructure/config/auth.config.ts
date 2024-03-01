import { registerAs } from '@nestjs/config';
import {
  JWT_ACCESS_TTL_SECONDS,
  JWT_REFRESH_TTL_SECONDS,
  MEDSPHERE_AUDIENCE,
  MEDSPHERE_ISSUER,
} from '@medsphere/shared';

export interface AuthConfig {
  port: number;
  serviceName: string;
  jwtSecret: string;
  jwtIssuer: string;
  jwtAudience: string;
  accessTtlSeconds: number;
  refreshTtlSeconds: number;
  databaseUrl: string;
}

export const authConfigFactory = registerAs(
  'auth',
  (): AuthConfig => ({
    port: parseInt(process.env.AUTH_SERVICE_PORT ?? '3001', 10),
    serviceName: process.env.SERVICE_NAME ?? 'auth-service',
    jwtSecret:
      process.env.JWT_SECRET ??
      'dev-only-secret-change-in-production-min-32-chars!!',
    jwtIssuer: process.env.JWT_ISSUER ?? MEDSPHERE_ISSUER,
    jwtAudience: process.env.JWT_AUDIENCE ?? MEDSPHERE_AUDIENCE,
    accessTtlSeconds: parseInt(
      process.env.JWT_ACCESS_TTL_SECONDS ?? String(JWT_ACCESS_TTL_SECONDS),
      10,
    ),
    refreshTtlSeconds: parseInt(
      process.env.JWT_REFRESH_TTL_SECONDS ?? String(JWT_REFRESH_TTL_SECONDS),
      10,
    ),
    databaseUrl: process.env.DATABASE_URL ?? '',
  }),
);

export const AUTH_CONFIG = 'AUTH_CONFIG';

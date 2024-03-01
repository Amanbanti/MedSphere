import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { createLogger, NestMedSphereLogger } from '@medsphere/logger';
import { AppModule } from './app.module';
import type { AuthConfig } from './infrastructure/config/auth.config';

async function bootstrap(): Promise<void> {
  const logger = new NestMedSphereLogger(
    createLogger({ service: process.env.SERVICE_NAME ?? 'auth-service' }),
  );

  const app = await NestFactory.create(AppModule, { logger });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableShutdownHooks();

  const config = app.get(ConfigService).get<AuthConfig>('auth')!;
  await app.listen(config.port);
  logger.log(`Auth service listening on port ${config.port}`);
}

bootstrap().catch((error) => {
  console.error('Failed to start auth service', error);
  process.exit(1);
});

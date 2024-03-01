import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { createLogger, NestMedSphereLogger } from '@medsphere/logger';
import { AppModule } from './app.module';
import type { NotificationConfig } from './infrastructure/config/notification.config';
import { DomainExceptionFilter } from './presentation/http/filters/domain-exception.filter';
import { CorrelationIdInterceptor } from './presentation/interceptors/correlation-id.interceptor';

async function bootstrap(): Promise<void> {
  const logger = new NestMedSphereLogger(
    createLogger({ service: process.env.SERVICE_NAME ?? 'notification-service' }),
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
  app.useGlobalFilters(new DomainExceptionFilter());
  app.useGlobalInterceptors(new CorrelationIdInterceptor());
  app.enableShutdownHooks();

  const config = app.get(ConfigService).get<NotificationConfig>('notification')!;
  await app.listen(config.port);
  logger.log(`Multi-channel patient and staff notifications listening on port ${config.port}`);
}

bootstrap().catch((error) => {
  console.error('Failed to start notification service', error);
  process.exit(1);
});

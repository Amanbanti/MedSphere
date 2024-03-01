import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { createLogger, NestMedSphereLogger } from '@medsphere/logger';
import { AppModule } from './app.module';
import type { PrescriptionConfig } from './infrastructure/config/prescription.config';
import { DomainExceptionFilter } from './presentation/http/filters/domain-exception.filter';
import { CorrelationIdInterceptor } from './presentation/interceptors/correlation-id.interceptor';

async function bootstrap(): Promise<void> {
  const logger = new NestMedSphereLogger(
    createLogger({ service: process.env.SERVICE_NAME ?? 'prescription-service' }),
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

  const config = app.get(ConfigService).get<PrescriptionConfig>('prescription')!;
  await app.listen(config.port);
  logger.log(`E-prescribing and medication orders listening on port ${config.port}`);
}

bootstrap().catch((error) => {
  console.error('Failed to start prescription service', error);
  process.exit(1);
});

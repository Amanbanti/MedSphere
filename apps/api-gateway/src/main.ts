import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { createLogger, NestMedSphereLogger } from '@medsphere/logger';
import { AppModule } from './app.module';
import type { GatewayConfig } from './config/gateway.config';

async function bootstrap(): Promise<void> {
  const logger = new NestMedSphereLogger(
    createLogger({ service: process.env.SERVICE_NAME ?? 'api-gateway' }),
  );

  const app = await NestFactory.create(AppModule, {
    logger,
    rawBody: true,
  });

  const configService = app.get(ConfigService);
  const config = configService.get<GatewayConfig>('gateway')!;

  if (config.cors.enabled) {
    app.enableCors({
      origin: config.cors.origins,
      methods: config.cors.methods,
      allowedHeaders: config.cors.allowedHeaders,
      exposedHeaders: config.cors.exposedHeaders,
      credentials: config.cors.credentials,
      maxAge: config.cors.maxAgeSeconds,
    });
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  app.enableShutdownHooks();

  await app.listen(config.port, config.host);
  logger.log(
    `MedSphere API Gateway listening on http://${config.host}:${config.port}`,
  );
  logger.log(`GraphQL endpoint: http://${config.host}:${config.port}${config.graphql.path}`);
  logger.log(`WebSocket namespace: ws://${config.host}:${config.port}${config.websocket.path}`);
}

bootstrap().catch((error) => {
  console.error('Failed to start API Gateway', error);
  process.exit(1);
});

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { gatewayConfigFactory } from '../config/gateway.config';
import { validateEnv } from '../config/env.validation';
import { CorrelationIdMiddleware } from '../middleware/correlation-id.middleware';
import { RequestLoggingMiddleware } from '../middleware/request-logging.middleware';
import { RateLimitGuard } from '../guards/rate-limit.guard';
import { GatewayAuthGuard } from '../guards/gateway-auth.guard';
import { TimeoutInterceptor } from '../interceptors/timeout.interceptor';
import { ResponseTransformInterceptor } from '../interceptors/response-transform.interceptor';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { AuthSdkModule } from '../providers/auth-sdk.module';
import { AuthProxyModule } from './auth-proxy/auth-proxy.module';
import { ApiProxyModule } from './api-proxy/api-proxy.module';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { GatewayGraphqlModule } from '../graphql/graphql.module';
import { WsModule } from '../ws/ws.module';
import { ProxyModule } from '../proxy/proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [gatewayConfigFactory],
      validate: validateEnv,
    }),
    AuthSdkModule,
    ProxyModule,
    HealthModule,
    MetricsModule,
    AuthProxyModule,
    ApiProxyModule,
    GatewayGraphqlModule,
    WsModule,
  ],
  providers: [
    GatewayAuthGuard,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
  ],
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(CorrelationIdMiddleware, RequestLoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

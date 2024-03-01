import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnalyticsModule } from './modules/analytics.module';
import { HealthModule } from './modules/health.module';
import { analyticsConfigFactory } from './infrastructure/config/analytics.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [analyticsConfigFactory],
    }),
    AnalyticsModule,
    HealthModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BillingModule } from './modules/billing.module';
import { HealthModule } from './modules/health.module';
import { billingConfigFactory } from './infrastructure/config/billing.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [billingConfigFactory],
    }),
    BillingModule,
    HealthModule,
  ],
})
export class AppModule {}

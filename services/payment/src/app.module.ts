import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './modules/payment.module';
import { HealthModule } from './modules/health.module';
import { paymentConfigFactory } from './infrastructure/config/payment.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [paymentConfigFactory],
    }),
    PaymentModule,
    HealthModule,
  ],
})
export class AppModule {}

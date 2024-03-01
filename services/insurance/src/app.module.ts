import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InsuranceModule } from './modules/insurance.module';
import { HealthModule } from './modules/health.module';
import { insuranceConfigFactory } from './infrastructure/config/insurance.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [insuranceConfigFactory],
    }),
    InsuranceModule,
    HealthModule,
  ],
})
export class AppModule {}

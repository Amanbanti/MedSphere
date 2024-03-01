import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PharmacyModule } from './modules/pharmacy.module';
import { HealthModule } from './modules/health.module';
import { pharmacyConfigFactory } from './infrastructure/config/pharmacy.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [pharmacyConfigFactory],
    }),
    PharmacyModule,
    HealthModule,
  ],
})
export class AppModule {}

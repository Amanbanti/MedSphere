import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrescriptionModule } from './modules/prescription.module';
import { HealthModule } from './modules/health.module';
import { prescriptionConfigFactory } from './infrastructure/config/prescription.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [prescriptionConfigFactory],
    }),
    PrescriptionModule,
    HealthModule,
  ],
})
export class AppModule {}

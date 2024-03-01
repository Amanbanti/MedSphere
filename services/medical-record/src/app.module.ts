import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MedicalRecordModule } from './modules/medical-record.module';
import { HealthModule } from './modules/health.module';
import { medicalRecordConfigFactory } from './infrastructure/config/medical-record.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [medicalRecordConfigFactory],
    }),
    MedicalRecordModule,
    HealthModule,
  ],
})
export class AppModule {}

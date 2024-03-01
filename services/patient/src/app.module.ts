import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PatientModule } from './modules/patient.module';
import { HealthModule } from './modules/health.module';
import { patientConfigFactory } from './infrastructure/config/patient.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [patientConfigFactory],
    }),
    PatientModule,
    HealthModule,
  ],
})
export class AppModule {}

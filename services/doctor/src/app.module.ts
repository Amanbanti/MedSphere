import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DoctorModule } from './modules/doctor.module';
import { HealthModule } from './modules/health.module';
import { doctorConfigFactory } from './infrastructure/config/doctor.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [doctorConfigFactory],
    }),
    DoctorModule,
    HealthModule,
  ],
})
export class AppModule {}

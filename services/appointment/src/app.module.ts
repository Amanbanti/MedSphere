import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppointmentModule } from './modules/appointment.module';
import { HealthModule } from './modules/health.module';
import { appointmentConfigFactory } from './infrastructure/config/appointment.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appointmentConfigFactory],
    }),
    AppointmentModule,
    HealthModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RadiologyModule } from './modules/radiology.module';
import { HealthModule } from './modules/health.module';
import { radiologyConfigFactory } from './infrastructure/config/radiology.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [radiologyConfigFactory],
    }),
    RadiologyModule,
    HealthModule,
  ],
})
export class AppModule {}

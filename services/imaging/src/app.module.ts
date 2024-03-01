import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImagingModule } from './modules/imaging.module';
import { HealthModule } from './modules/health.module';
import { imagingConfigFactory } from './infrastructure/config/imaging.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [imagingConfigFactory],
    }),
    ImagingModule,
    HealthModule,
  ],
})
export class AppModule {}

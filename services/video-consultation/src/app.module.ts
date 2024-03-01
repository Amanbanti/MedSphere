import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VideoConsultationModule } from './modules/video-consultation.module';
import { HealthModule } from './modules/health.module';
import { videoConsultationConfigFactory } from './infrastructure/config/video-consultation.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [videoConsultationConfigFactory],
    }),
    VideoConsultationModule,
    HealthModule,
  ],
})
export class AppModule {}

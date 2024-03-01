import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QueueModule } from './modules/queue.module';
import { HealthModule } from './modules/health.module';
import { queueConfigFactory } from './infrastructure/config/queue.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [queueConfigFactory],
    }),
    QueueModule,
    HealthModule,
  ],
})
export class AppModule {}

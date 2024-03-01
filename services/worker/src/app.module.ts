import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WorkerModule } from './modules/worker.module';
import { HealthModule } from './modules/health.module';
import { workerConfigFactory } from './infrastructure/config/worker.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [workerConfigFactory],
    }),
    WorkerModule,
    HealthModule,
  ],
})
export class AppModule {}

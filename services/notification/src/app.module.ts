import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './modules/notification.module';
import { HealthModule } from './modules/health.module';
import { notificationConfigFactory } from './infrastructure/config/notification.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [notificationConfigFactory],
    }),
    NotificationModule,
    HealthModule,
  ],
})
export class AppModule {}

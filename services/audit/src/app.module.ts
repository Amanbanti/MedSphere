import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuditModule } from './modules/audit.module';
import { HealthModule } from './modules/health.module';
import { auditConfigFactory } from './infrastructure/config/audit.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [auditConfigFactory],
    }),
    AuditModule,
    HealthModule,
  ],
})
export class AppModule {}

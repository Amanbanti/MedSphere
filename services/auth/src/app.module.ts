import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth.module';
import { HealthModule } from './modules/health.module';
import { FeatureFlagsModule } from './modules/feature-flags.module';
import { authConfigFactory } from './infrastructure/config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfigFactory],
    }),
    AuthModule,
    HealthModule,
    FeatureFlagsModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LaboratoryModule } from './modules/laboratory.module';
import { HealthModule } from './modules/health.module';
import { laboratoryConfigFactory } from './infrastructure/config/laboratory.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [laboratoryConfigFactory],
    }),
    LaboratoryModule,
    HealthModule,
  ],
})
export class AppModule {}

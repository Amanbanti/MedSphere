import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SearchModule } from './modules/search.module';
import { HealthModule } from './modules/health.module';
import { searchConfigFactory } from './infrastructure/config/search.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [searchConfigFactory],
    }),
    SearchModule,
    HealthModule,
  ],
})
export class AppModule {}

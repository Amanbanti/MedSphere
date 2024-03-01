import { Module } from '@nestjs/common';
import { HealthController } from '../presentation/http/health.controller';
import { PrismaService } from '../infrastructure/prisma/prisma.service';

@Module({
  controllers: [HealthController],
  providers: [PrismaService],
})
export class HealthModule {}

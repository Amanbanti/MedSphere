import { Controller, Get } from '@nestjs/common';
import { Public, CorrelationId } from '@medsphere/auth-sdk';
import { HealthRegistry, createPostgresHealthIndicator } from '@medsphere/monitoring-sdk';
import { successBody } from '@medsphere/shared';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Controller('health')
export class HealthController {
  private readonly registry: HealthRegistry;

  constructor(private readonly prisma: PrismaService) {
    this.registry = new HealthRegistry(
      process.env.SERVICE_NAME ?? 'video-consultation-service',
      process.env.npm_package_version ?? '0.1.0',
    );
    this.registry.register(
      'postgres',
      createPostgresHealthIndicator(() => this.prisma.ping()),
    );
  }

  @Public()
  @Get()
  async check(@CorrelationId() correlationId: string) {
    const data = await this.registry.check();
    return successBody(data, correlationId);
  }

  @Public()
  @Get('live')
  live(@CorrelationId() correlationId: string) {
    return successBody({ status: 'ok' }, correlationId);
  }

  @Public()
  @Get('ready')
  async ready(@CorrelationId() correlationId: string) {
    const data = await this.registry.check();
    return successBody(data, correlationId);
  }
}

import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Public, CorrelationId } from '@medsphere/auth-sdk';
import { HealthRegistry } from '@medsphere/monitoring-sdk';
import { successBody } from '@medsphere/shared';
import type { GatewayConfig } from '../../config/gateway.config';
import { HttpProxyService } from '../../proxy/http-proxy.service';
import type { ServiceName } from '../../proxy/service-registry';

@Controller('health')
export class HealthController {
  private readonly registry: HealthRegistry;

  constructor(
    private readonly configService: ConfigService,
    private readonly proxyService: HttpProxyService,
  ) {
    const config = this.configService.get<GatewayConfig>('gateway')!;
    this.registry = new HealthRegistry(config.serviceName, config.version);
    this.registerUpstreamProbes(config);
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
    return successBody(
      {
        status: 'ok',
        service: this.configService.get<GatewayConfig>('gateway')!.serviceName,
      },
      correlationId,
    );
  }

  @Public()
  @Get('ready')
  async ready(@CorrelationId() correlationId: string) {
    const data = await this.registry.check();
    return successBody(data, correlationId);
  }

  @Public()
  @Get('routes')
  routes(@CorrelationId() correlationId: string) {
    const routes = this.proxyService.getRegistry().listRoutes();
    return successBody(
      {
        count: routes.length,
        routes: routes.map((route) => ({
          service: route.serviceName,
          gatewayPrefix: route.gatewayPrefix,
          upstreamPrefix: route.upstreamPrefix,
          requiresAuth: route.requiresAuth,
          description: route.description,
        })),
      },
      correlationId,
    );
  }

  private registerUpstreamProbes(config: GatewayConfig): void {
    const services = Object.keys(config.upstreams) as ServiceName[];

    for (const serviceName of services) {
      this.registry.register(`upstream:${serviceName}`, async () => {
        const result = await this.proxyService.probeHealth(serviceName);
        return {
          name: serviceName,
          status: result.status,
          latencyMs: result.latencyMs,
          message: result.message,
        };
      });
    }
  }
}

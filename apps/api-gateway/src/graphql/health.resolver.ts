import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { Public } from '@medsphere/auth-sdk';
import type { GatewayConfig } from '../config/gateway.config';

@ObjectType()
export class GatewayHealthPayload {
  @Field()
  status!: string;

  @Field()
  service!: string;

  @Field()
  version!: string;

  @Field()
  timestamp!: string;
}

@Resolver()
export class HealthResolver {
  constructor(private readonly configService: ConfigService) {}

  @Public()
  @Query(() => GatewayHealthPayload, {
    name: 'gatewayHealth',
    description: 'Returns aggregate health metadata for the API gateway',
  })
  gatewayHealth(): GatewayHealthPayload {
    const config = this.configService.get<GatewayConfig>('gateway')!;
    return {
      status: 'ok',
      service: config.serviceName,
      version: config.version,
      timestamp: new Date().toISOString(),
    };
  }
}

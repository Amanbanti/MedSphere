import { Module } from '@nestjs/common';
import { ApiProxyController } from './api-proxy.controller';
import { GatewayAuthGuard } from '../../guards/gateway-auth.guard';

@Module({
  controllers: [ApiProxyController],
  providers: [GatewayAuthGuard],
})
export class ApiProxyModule {}

import { Module } from '@nestjs/common';
import { AuthProxyController } from './auth-proxy.controller';

@Module({
  controllers: [AuthProxyController],
})
export class AuthProxyModule {}

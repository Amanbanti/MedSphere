import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@medsphere/auth-sdk';
import type { GatewayConfig } from '../config/gateway.config';

@Global()
@Module({
  providers: [
    {
      provide: JwtService,
      useFactory: (configService: ConfigService) => {
        const config = configService.get<GatewayConfig>('gateway')!;
        return new JwtService({
          secret: config.jwtSecret,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [JwtService],
})
export class AuthSdkModule {}

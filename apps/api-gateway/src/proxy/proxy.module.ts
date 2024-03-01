import { Global, Module } from '@nestjs/common';
import { HttpProxyService } from './http-proxy.service';
import { ProxyResponseWriter } from './proxy-response.writer';

@Global()
@Module({
  providers: [HttpProxyService, ProxyResponseWriter],
  exports: [HttpProxyService, ProxyResponseWriter],
})
export class ProxyModule {}

import { Controller, Get, Header, Res } from '@nestjs/common';
import type { Response } from 'express';
import { Public } from '@medsphere/auth-sdk';
import { globalMetrics } from '@medsphere/monitoring-sdk';

@Controller('metrics')
export class MetricsController {
  @Public()
  @Get()
  @Header('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')
  metrics(@Res() response: Response): void {
    response.locals.skipResponseTransform = true;
    response.send(globalMetrics.exposePrometheus());
  }
}

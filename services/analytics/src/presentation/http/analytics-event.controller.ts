import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type ListQuery, type UUID } from '@medsphere/shared';
import { RecordAnalyticsEventUseCase } from '../../application/use-cases/record-analytics-event.use-case';
import { AggregateAnalyticsMetricsUseCase } from '../../application/use-cases/aggregate-analytics-metrics.use-case';
import { GenerateAnalyticsReportUseCase } from '../../application/use-cases/generate-analytics-report.use-case';
import { ExportAnalyticsDataUseCase } from '../../application/use-cases/export-analytics-data.use-case';

@Controller('analytics-events')
export class AnalyticsEventController {
  constructor(
    private readonly recordAnalyticsEventUseCase: RecordAnalyticsEventUseCase,
    private readonly aggregateAnalyticsMetricsUseCase: AggregateAnalyticsMetricsUseCase,
    private readonly generateAnalyticsReportUseCase: GenerateAnalyticsReportUseCase,
    private readonly exportAnalyticsDataUseCase: ExportAnalyticsDataUseCase,
  ) {}

  @Post('/events')
  async recordAnalyticsEvent(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.recordAnalyticsEventUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Get('/metrics')
  async aggregateAnalyticsMetrics(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    
    @Query() query: Record<string, unknown>,
  ) {
    const result = await this.aggregateAnalyticsMetricsUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/reports')
  async generateAnalyticsReport(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.generateAnalyticsReportUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/export')
  async exportAnalyticsData(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.exportAnalyticsDataUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }
}

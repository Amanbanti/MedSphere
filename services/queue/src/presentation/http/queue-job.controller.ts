import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type ListQuery, type UUID } from '@medsphere/shared';
import { EnqueueJobUseCase } from '../../application/use-cases/enqueue-job.use-case';
import { DequeueJobUseCase } from '../../application/use-cases/dequeue-job.use-case';
import { AcknowledgeJobUseCase } from '../../application/use-cases/acknowledge-job.use-case';
import { GetQueueStatsUseCase } from '../../application/use-cases/get-queue-stats.use-case';

@Controller('queue-jobs')
export class QueueJobController {
  constructor(
    private readonly enqueueJobUseCase: EnqueueJobUseCase,
    private readonly dequeueJobUseCase: DequeueJobUseCase,
    private readonly acknowledgeJobUseCase: AcknowledgeJobUseCase,
    private readonly getQueueStatsUseCase: GetQueueStatsUseCase,
  ) {}

  @Post('/jobs')
  async enqueueJob(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.enqueueJobUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/jobs/dequeue')
  async dequeueJob(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.dequeueJobUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/jobs/:id/ack')
  async acknowledgeJob(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.acknowledgeJobUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Get('/stats')
  async getQueueStats(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    
    @Query() query: Record<string, unknown>,
  ) {
    const result = await this.getQueueStatsUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }
}

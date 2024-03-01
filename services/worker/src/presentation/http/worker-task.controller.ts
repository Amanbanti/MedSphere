import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type ListQuery, type UUID } from '@medsphere/shared';
import { RegisterWorkerHandlerUseCase } from '../../application/use-cases/register-worker-handler.use-case';
import { ProcessWorkerJobUseCase } from '../../application/use-cases/process-worker-job.use-case';
import { RetryFailedWorkerJobUseCase } from '../../application/use-cases/retry-failed-worker-job.use-case';
import { GetWorkerStatusUseCase } from '../../application/use-cases/get-worker-status.use-case';

@Controller('worker-tasks')
export class WorkerTaskController {
  constructor(
    private readonly registerWorkerHandlerUseCase: RegisterWorkerHandlerUseCase,
    private readonly processWorkerJobUseCase: ProcessWorkerJobUseCase,
    private readonly retryFailedWorkerJobUseCase: RetryFailedWorkerJobUseCase,
    private readonly getWorkerStatusUseCase: GetWorkerStatusUseCase,
  ) {}

  @Post('/handlers')
  async registerWorkerHandler(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.registerWorkerHandlerUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/jobs/process')
  async processWorkerJob(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.processWorkerJobUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/jobs/:id/retry')
  async retryFailedWorkerJob(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.retryFailedWorkerJobUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Get('/status')
  async getWorkerStatus(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    
    @Query() query: Record<string, unknown>,
  ) {
    const result = await this.getWorkerStatusUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }
}

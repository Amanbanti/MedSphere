import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type ListQuery, type UUID } from '@medsphere/shared';
import { OrderLabTestUseCase } from '../../application/use-cases/order-lab-test.use-case';
import { CollectLabSampleUseCase } from '../../application/use-cases/collect-lab-sample.use-case';
import { ReportLabResultUseCase } from '../../application/use-cases/report-lab-result.use-case';
import { ListLabOrdersUseCase } from '../../application/use-cases/list-lab-orders.use-case';
import { GetLabOrderUseCase } from '../../application/use-cases/get-lab-order.use-case';

export class OrderLabTestDto {
  @IsString()
  patientId: string;

  @IsString()
  orderingProviderId: string;

  @IsString()
  testCode: string;

  @IsString()
  testName: string;

  @IsString()
  priority: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class CollectLabSampleDto {
  @IsString()
  patientId: string;

  @IsString()
  orderingProviderId: string;

  @IsString()
  testCode: string;

  @IsString()
  testName: string;

  @IsString()
  priority: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class ReportLabResultDto {
  @IsString()
  patientId: string;

  @IsString()
  orderingProviderId: string;

  @IsString()
  testCode: string;

  @IsString()
  testName: string;

  @IsString()
  priority: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

@Controller('lab-orders')
export class LabOrderController {
  constructor(
    private readonly orderLabTestUseCase: OrderLabTestUseCase,
    private readonly collectLabSampleUseCase: CollectLabSampleUseCase,
    private readonly reportLabResultUseCase: ReportLabResultUseCase,
    private readonly listLabOrdersUseCase: ListLabOrdersUseCase,
    private readonly getLabOrderUseCase: GetLabOrderUseCase,
  ) {}

  @Post('/orders')
  async orderLabTest(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    
    @Body() body: OrderLabTestDto,
  ) {
    const result = await this.orderLabTestUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Post('/orders/:id/collect')
  async collectLabSample(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    
    @Body() body: CollectLabSampleDto,
  ) {
    const result = await this.collectLabSampleUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Post('/orders/:id/result')
  async reportLabResult(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    
    @Body() body: ReportLabResultDto,
  ) {
    const result = await this.reportLabResultUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Get('/orders')
  async listLabOrders(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Query() query: Record<string, unknown>,
    
  ) {
    const result = await this.listLabOrdersUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      query: query as ListQuery,
      
    });
    return successBody(result, correlationId);
  }

  @Get('/orders/:id')
  async getLabOrder(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Query() query: Record<string, unknown>,
    
  ) {
    const result = await this.getLabOrderUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      query: query as ListQuery,
      
    });
    return successBody(result, correlationId);
  }
}

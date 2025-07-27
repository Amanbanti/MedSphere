import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type ListQuery, type UUID } from '@medsphere/shared';
import { ScheduleRadiologyStudyUseCase } from '../../application/use-cases/schedule-radiology-study.use-case';
import { AcquireRadiologyImagesUseCase } from '../../application/use-cases/acquire-radiology-images.use-case';
import { ReportRadiologyFindingsUseCase } from '../../application/use-cases/report-radiology-findings.use-case';
import { ListRadiologyStudiesUseCase } from '../../application/use-cases/list-radiology-studies.use-case';

export class ScheduleRadiologyStudyDto {
  @IsString()
  patientId: string;

  @IsString()
  modality: string;

  @IsString()
  bodyPart: string;

  @IsString()
  scheduledAt: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class AcquireRadiologyImagesDto {
  @IsString()
  patientId: string;

  @IsString()
  modality: string;

  @IsString()
  bodyPart: string;

  @IsString()
  scheduledAt: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class ReportRadiologyFindingsDto {
  @IsString()
  patientId: string;

  @IsString()
  modality: string;

  @IsString()
  bodyPart: string;

  @IsString()
  scheduledAt: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

@Controller('radiology-studys')
export class RadiologyStudyController {
  constructor(
    private readonly scheduleRadiologyStudyUseCase: ScheduleRadiologyStudyUseCase,
    private readonly acquireRadiologyImagesUseCase: AcquireRadiologyImagesUseCase,
    private readonly reportRadiologyFindingsUseCase: ReportRadiologyFindingsUseCase,
    private readonly listRadiologyStudiesUseCase: ListRadiologyStudiesUseCase,
  ) {}

  @Post('/studies')
  async scheduleRadiologyStudy(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    
    @Body() body: ScheduleRadiologyStudyDto,
  ) {
    const result = await this.scheduleRadiologyStudyUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Post('/studies/:id/acquire')
  async acquireRadiologyImages(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    
    @Body() body: AcquireRadiologyImagesDto,
  ) {
    const result = await this.acquireRadiologyImagesUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Post('/studies/:id/report')
  async reportRadiologyFindings(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    
    @Body() body: ReportRadiologyFindingsDto,
  ) {
    const result = await this.reportRadiologyFindingsUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Get('/studies')
  async listRadiologyStudies(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Query() query: Record<string, unknown>,
    
  ) {
    const result = await this.listRadiologyStudiesUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      query: query as ListQuery,
      
    });
    return successBody(result, correlationId);
  }
}

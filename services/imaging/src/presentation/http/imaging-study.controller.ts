import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type ListQuery, type UUID } from '@medsphere/shared';
import { StoreImagingStudyUseCase } from '../../application/use-cases/store-imaging-study.use-case';
import { RetrieveImagingStudyUseCase } from '../../application/use-cases/retrieve-imaging-study.use-case';
import { AnnotateImagingStudyUseCase } from '../../application/use-cases/annotate-imaging-study.use-case';
import { ArchiveImagingStudyUseCase } from '../../application/use-cases/archive-imaging-study.use-case';
import { ListImagingStudiesUseCase } from '../../application/use-cases/list-imaging-studies.use-case';

export class StoreImagingStudyDto {
  @IsString()
  studyInstanceUid: string;

  @IsString()
  patientId: string;

  @IsString()
  modality: string;

  @IsNumber()
  seriesCount: number;

  @IsString()
  storagePath: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class AnnotateImagingStudyDto {
  @IsString()
  studyInstanceUid: string;

  @IsString()
  patientId: string;

  @IsString()
  modality: string;

  @IsNumber()
  seriesCount: number;

  @IsString()
  storagePath: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class ArchiveImagingStudyDto {
  @IsString()
  studyInstanceUid: string;

  @IsString()
  patientId: string;

  @IsString()
  modality: string;

  @IsNumber()
  seriesCount: number;

  @IsString()
  storagePath: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

@Controller('imaging-studys')
export class ImagingStudyController {
  constructor(
    private readonly storeImagingStudyUseCase: StoreImagingStudyUseCase,
    private readonly retrieveImagingStudyUseCase: RetrieveImagingStudyUseCase,
    private readonly annotateImagingStudyUseCase: AnnotateImagingStudyUseCase,
    private readonly archiveImagingStudyUseCase: ArchiveImagingStudyUseCase,
    private readonly listImagingStudiesUseCase: ListImagingStudiesUseCase,
  ) {}

  @Post('/studies')
  async storeImagingStudy(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    
    @Body() body: StoreImagingStudyDto,
  ) {
    const result = await this.storeImagingStudyUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Get('/studies/:id')
  async retrieveImagingStudy(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Query() query: Record<string, unknown>,
    
  ) {
    const result = await this.retrieveImagingStudyUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      query: query as ListQuery,
      
    });
    return successBody(result, correlationId);
  }

  @Post('/studies/:id/annotations')
  async annotateImagingStudy(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    
    @Body() body: AnnotateImagingStudyDto,
  ) {
    const result = await this.annotateImagingStudyUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Post('/studies/:id/archive')
  async archiveImagingStudy(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    
    @Body() body: ArchiveImagingStudyDto,
  ) {
    const result = await this.archiveImagingStudyUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Get('/studies')
  async listImagingStudies(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Query() query: Record<string, unknown>,
    
  ) {
    const result = await this.listImagingStudiesUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      query: query as ListQuery,
      
    });
    return successBody(result, correlationId);
  }
}

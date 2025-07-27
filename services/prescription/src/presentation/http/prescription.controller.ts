import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type ListQuery, type UUID } from '@medsphere/shared';
import { CreatePrescriptionUseCase } from '../../application/use-cases/create-prescription.use-case';
import { RenewPrescriptionUseCase } from '../../application/use-cases/renew-prescription.use-case';
import { CancelPrescriptionUseCase } from '../../application/use-cases/cancel-prescription.use-case';
import { CheckPrescriptionInteractionsUseCase } from '../../application/use-cases/check-prescription-interactions.use-case';
import { ListPrescriptionsUseCase } from '../../application/use-cases/list-prescriptions.use-case';

export class CreatePrescriptionDto {
  @IsString()
  patientId: string;

  @IsString()
  prescriberId: string;

  @IsString()
  medicationName: string;

  @IsString()
  dosage: string;

  @IsString()
  frequency: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class RenewPrescriptionDto {
  @IsString()
  patientId: string;

  @IsString()
  prescriberId: string;

  @IsString()
  medicationName: string;

  @IsString()
  dosage: string;

  @IsString()
  frequency: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class CancelPrescriptionDto {
  @IsString()
  patientId: string;

  @IsString()
  prescriberId: string;

  @IsString()
  medicationName: string;

  @IsString()
  dosage: string;

  @IsString()
  frequency: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class CheckPrescriptionInteractionsDto {
  @IsString()
  patientId: string;

  @IsString()
  prescriberId: string;

  @IsString()
  medicationName: string;

  @IsString()
  dosage: string;

  @IsString()
  frequency: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

@Controller('prescriptions')
export class PrescriptionController {
  constructor(
    private readonly createPrescriptionUseCase: CreatePrescriptionUseCase,
    private readonly renewPrescriptionUseCase: RenewPrescriptionUseCase,
    private readonly cancelPrescriptionUseCase: CancelPrescriptionUseCase,
    private readonly checkPrescriptionInteractionsUseCase: CheckPrescriptionInteractionsUseCase,
    private readonly listPrescriptionsUseCase: ListPrescriptionsUseCase,
  ) {}

  @Post('')
  async createPrescription(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    
    @Body() body: CreatePrescriptionDto,
  ) {
    const result = await this.createPrescriptionUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Post('/:id/renew')
  async renewPrescription(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    
    @Body() body: RenewPrescriptionDto,
  ) {
    const result = await this.renewPrescriptionUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Post('/:id/cancel')
  async cancelPrescription(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    
    @Body() body: CancelPrescriptionDto,
  ) {
    const result = await this.cancelPrescriptionUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Post('/interactions/check')
  async checkPrescriptionInteractions(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    
    @Body() body: CheckPrescriptionInteractionsDto,
  ) {
    const result = await this.checkPrescriptionInteractionsUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Get('')
  async listPrescriptions(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Query() query: Record<string, unknown>,
    
  ) {
    const result = await this.listPrescriptionsUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      query: query as ListQuery,
      
    });
    return successBody(result, correlationId);
  }
}

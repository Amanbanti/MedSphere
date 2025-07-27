import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type ListQuery, type UUID } from '@medsphere/shared';
import { AddPharmacyInventoryUseCase } from '../../application/use-cases/add-pharmacy-inventory.use-case';
import { DispenseMedicationUseCase } from '../../application/use-cases/dispense-medication.use-case';
import { CheckPharmacyStockUseCase } from '../../application/use-cases/check-pharmacy-stock.use-case';
import { UpdatePharmacyPricingUseCase } from '../../application/use-cases/update-pharmacy-pricing.use-case';
import { ListPharmacyInventoryUseCase } from '../../application/use-cases/list-pharmacy-inventory.use-case';

export class AddPharmacyInventoryDto {
  @IsString()
  ndcCode: string;

  @IsString()
  drugName: string;

  @IsString()
  strength: string;

  @IsString()
  form: string;

  @IsNumber()
  quantityOnHand: number;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class DispenseMedicationDto {
  @IsString()
  ndcCode: string;

  @IsString()
  drugName: string;

  @IsString()
  strength: string;

  @IsString()
  form: string;

  @IsNumber()
  quantityOnHand: number;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdatePharmacyPricingDto {
  @IsString()
  ndcCode: string;

  @IsString()
  drugName: string;

  @IsString()
  strength: string;

  @IsString()
  form: string;

  @IsNumber()
  quantityOnHand: number;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

@Controller('pharmacy-items')
export class PharmacyItemController {
  constructor(
    private readonly addPharmacyInventoryUseCase: AddPharmacyInventoryUseCase,
    private readonly dispenseMedicationUseCase: DispenseMedicationUseCase,
    private readonly checkPharmacyStockUseCase: CheckPharmacyStockUseCase,
    private readonly updatePharmacyPricingUseCase: UpdatePharmacyPricingUseCase,
    private readonly listPharmacyInventoryUseCase: ListPharmacyInventoryUseCase,
  ) {}

  @Post('/inventory')
  async addPharmacyInventory(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    
    @Body() body: AddPharmacyInventoryDto,
  ) {
    const result = await this.addPharmacyInventoryUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Post('/dispense')
  async dispenseMedication(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    
    @Body() body: DispenseMedicationDto,
  ) {
    const result = await this.dispenseMedicationUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Get('/inventory/:ndcCode')
  async checkPharmacyStock(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('ndcCode') ndcCode: string,
    @Query() query: Record<string, unknown>,
    
  ) {
    const result = await this.checkPharmacyStockUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      ndcCode,
      query: query as ListQuery,
      
    });
    return successBody(result, correlationId);
  }

  @Patch('/inventory/:id/pricing')
  async updatePharmacyPricing(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    
    @Body() body: UpdatePharmacyPricingDto,
  ) {
    const result = await this.updatePharmacyPricingUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Get('/inventory')
  async listPharmacyInventory(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Query() query: Record<string, unknown>,
    
  ) {
    const result = await this.listPharmacyInventoryUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      query: query as ListQuery,
      
    });
    return successBody(result, correlationId);
  }
}

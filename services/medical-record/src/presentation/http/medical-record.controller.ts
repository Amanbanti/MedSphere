import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type ListQuery, type UUID } from '@medsphere/shared';
import { CreateMedicalRecordUseCase } from '../../application/use-cases/create-medical-record.use-case';
import { AddClinicalNoteUseCase } from '../../application/use-cases/add-clinical-note.use-case';
import { AttachMedicalDocumentUseCase } from '../../application/use-cases/attach-medical-document.use-case';
import { SignMedicalRecordUseCase } from '../../application/use-cases/sign-medical-record.use-case';
import { GetMedicalRecordHistoryUseCase } from '../../application/use-cases/get-medical-record-history.use-case';
import { GetMedicalRecordUseCase } from '../../application/use-cases/get-medical-record.use-case';

@Controller('medical-records')
export class MedicalRecordController {
  constructor(
    private readonly createMedicalRecordUseCase: CreateMedicalRecordUseCase,
    private readonly addClinicalNoteUseCase: AddClinicalNoteUseCase,
    private readonly attachMedicalDocumentUseCase: AttachMedicalDocumentUseCase,
    private readonly signMedicalRecordUseCase: SignMedicalRecordUseCase,
    private readonly getMedicalRecordHistoryUseCase: GetMedicalRecordHistoryUseCase,
    private readonly getMedicalRecordUseCase: GetMedicalRecordUseCase,
  ) {}

  @Post('')
  async createMedicalRecord(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.createMedicalRecordUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/:id/notes')
  async addClinicalNote(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.addClinicalNoteUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/:id/documents')
  async attachMedicalDocument(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.attachMedicalDocumentUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/:id/sign')
  async signMedicalRecord(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.signMedicalRecordUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Get('/patient/:patientId')
  async getMedicalRecordHistory(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('patientId') patientId: string,
    
    @Query() query: Record<string, unknown>,
  ) {
    const result = await this.getMedicalRecordHistoryUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      patientId: patientId as UUID,
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Get('/:id')
  async getMedicalRecord(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    
    @Query() query: Record<string, unknown>,
  ) {
    const result = await this.getMedicalRecordUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }
}

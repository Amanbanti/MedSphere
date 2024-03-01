import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type ListQuery, type UUID } from '@medsphere/shared';
import { RegisterPatientUseCase } from '../../application/use-cases/register-patient.use-case';
import { UpdatePatientDemographicsUseCase } from '../../application/use-cases/update-patient-demographics.use-case';
import { RecordPatientAllergyUseCase } from '../../application/use-cases/record-patient-allergy.use-case';
import { AddPatientVitalsUseCase } from '../../application/use-cases/add-patient-vitals.use-case';
import { GetPatientProfileUseCase } from '../../application/use-cases/get-patient-profile.use-case';
import { ListPatientsUseCase } from '../../application/use-cases/list-patients.use-case';
import { DeactivatePatientUseCase } from '../../application/use-cases/deactivate-patient.use-case';
import { MergePatientRecordsUseCase } from '../../application/use-cases/merge-patient-records.use-case';

@Controller('patients')
export class PatientController {
  constructor(
    private readonly registerPatientUseCase: RegisterPatientUseCase,
    private readonly updatePatientDemographicsUseCase: UpdatePatientDemographicsUseCase,
    private readonly recordPatientAllergyUseCase: RecordPatientAllergyUseCase,
    private readonly addPatientVitalsUseCase: AddPatientVitalsUseCase,
    private readonly getPatientProfileUseCase: GetPatientProfileUseCase,
    private readonly listPatientsUseCase: ListPatientsUseCase,
    private readonly deactivatePatientUseCase: DeactivatePatientUseCase,
    private readonly mergePatientRecordsUseCase: MergePatientRecordsUseCase,
  ) {}

  @Post('')
  async registerPatient(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.registerPatientUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Patch('/:id/demographics')
  async updatePatientDemographics(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.updatePatientDemographicsUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/:id/allergies')
  async recordPatientAllergy(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.recordPatientAllergyUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/:id/vitals')
  async addPatientVitals(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.addPatientVitalsUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Get('/:id')
  async getPatientProfile(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    
    @Query() query: Record<string, unknown>,
  ) {
    const result = await this.getPatientProfileUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Get('')
  async listPatients(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    
    @Query() query: Record<string, unknown>,
  ) {
    const result = await this.listPatientsUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/:id/deactivate')
  async deactivatePatient(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.deactivatePatientUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/merge')
  async mergePatientRecords(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.mergePatientRecordsUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }
}

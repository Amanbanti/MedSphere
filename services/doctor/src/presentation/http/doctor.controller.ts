import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type ListQuery, type UUID } from '@medsphere/shared';
import { RegisterDoctorUseCase } from '../../application/use-cases/register-doctor.use-case';
import { UpdateDoctorCredentialsUseCase } from '../../application/use-cases/update-doctor-credentials.use-case';
import { AssignDoctorDepartmentUseCase } from '../../application/use-cases/assign-doctor-department.use-case';
import { SetDoctorAvailabilityUseCase } from '../../application/use-cases/set-doctor-availability.use-case';
import { GetDoctorProfileUseCase } from '../../application/use-cases/get-doctor-profile.use-case';
import { ListDoctorsUseCase } from '../../application/use-cases/list-doctors.use-case';
import { SuspendDoctorUseCase } from '../../application/use-cases/suspend-doctor.use-case';

export class RegisterDoctorDto {
  @IsString()
  npi: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  specialty: string;

  @IsString()
  licenseNumber: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdateDoctorCredentialsDto {
  @IsString()
  npi: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  specialty: string;

  @IsString()
  licenseNumber: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class AssignDoctorDepartmentDto {
  @IsString()
  npi: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  specialty: string;

  @IsString()
  licenseNumber: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class SetDoctorAvailabilityDto {
  @IsString()
  npi: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  specialty: string;

  @IsString()
  licenseNumber: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class SuspendDoctorDto {
  @IsString()
  npi: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  specialty: string;

  @IsString()
  licenseNumber: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

@Controller('doctors')
export class DoctorController {
  constructor(
    private readonly registerDoctorUseCase: RegisterDoctorUseCase,
    private readonly updateDoctorCredentialsUseCase: UpdateDoctorCredentialsUseCase,
    private readonly assignDoctorDepartmentUseCase: AssignDoctorDepartmentUseCase,
    private readonly setDoctorAvailabilityUseCase: SetDoctorAvailabilityUseCase,
    private readonly getDoctorProfileUseCase: GetDoctorProfileUseCase,
    private readonly listDoctorsUseCase: ListDoctorsUseCase,
    private readonly suspendDoctorUseCase: SuspendDoctorUseCase,
  ) {}

  @Post('')
  async registerDoctor(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    
    @Body() body: RegisterDoctorDto,
  ) {
    const result = await this.registerDoctorUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Patch('/:id/credentials')
  async updateDoctorCredentials(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    
    @Body() body: UpdateDoctorCredentialsDto,
  ) {
    const result = await this.updateDoctorCredentialsUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Post('/:id/department')
  async assignDoctorDepartment(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    
    @Body() body: AssignDoctorDepartmentDto,
  ) {
    const result = await this.assignDoctorDepartmentUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Put('/:id/availability')
  async setDoctorAvailability(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    
    @Body() body: SetDoctorAvailabilityDto,
  ) {
    const result = await this.setDoctorAvailabilityUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }

  @Get('/:id')
  async getDoctorProfile(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Query() query: Record<string, unknown>,
    
  ) {
    const result = await this.getDoctorProfileUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      query: query as ListQuery,
      
    });
    return successBody(result, correlationId);
  }

  @Get('')
  async listDoctors(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Query() query: Record<string, unknown>,
    
  ) {
    const result = await this.listDoctorsUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      query: query as ListQuery,
      
    });
    return successBody(result, correlationId);
  }

  @Post('/:id/suspend')
  async suspendDoctor(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    
    @Body() body: SuspendDoctorDto,
  ) {
    const result = await this.suspendDoctorUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
    });
    return successBody(result, correlationId);
  }
}

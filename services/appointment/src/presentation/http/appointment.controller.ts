import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type ListQuery, type UUID } from '@medsphere/shared';
import { BookAppointmentUseCase } from '../../application/use-cases/book-appointment.use-case';
import { RescheduleAppointmentUseCase } from '../../application/use-cases/reschedule-appointment.use-case';
import { CancelAppointmentUseCase } from '../../application/use-cases/cancel-appointment.use-case';
import { CheckInAppointmentUseCase } from '../../application/use-cases/check-in-appointment.use-case';
import { GetAppointmentUseCase } from '../../application/use-cases/get-appointment.use-case';
import { ListAppointmentsByPatientUseCase } from '../../application/use-cases/list-appointments-by-patient.use-case';
import { ListAppointmentsByDoctorUseCase } from '../../application/use-cases/list-appointments-by-doctor.use-case';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly bookAppointmentUseCase: BookAppointmentUseCase,
    private readonly rescheduleAppointmentUseCase: RescheduleAppointmentUseCase,
    private readonly cancelAppointmentUseCase: CancelAppointmentUseCase,
    private readonly checkInAppointmentUseCase: CheckInAppointmentUseCase,
    private readonly getAppointmentUseCase: GetAppointmentUseCase,
    private readonly listAppointmentsByPatientUseCase: ListAppointmentsByPatientUseCase,
    private readonly listAppointmentsByDoctorUseCase: ListAppointmentsByDoctorUseCase,
  ) {}

  @Post('')
  async bookAppointment(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.bookAppointmentUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Patch('/:id/reschedule')
  async rescheduleAppointment(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.rescheduleAppointmentUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/:id/cancel')
  async cancelAppointment(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.cancelAppointmentUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/:id/check-in')
  async checkInAppointment(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.checkInAppointmentUseCase.execute({
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
  async getAppointment(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    
    @Query() query: Record<string, unknown>,
  ) {
    const result = await this.getAppointmentUseCase.execute({
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
  async listAppointmentsByPatient(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('patientId') patientId: string,
    
    @Query() query: Record<string, unknown>,
  ) {
    const result = await this.listAppointmentsByPatientUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      patientId: patientId as UUID,
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Get('/doctor/:doctorId')
  async listAppointmentsByDoctor(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('doctorId') doctorId: string,
    
    @Query() query: Record<string, unknown>,
  ) {
    const result = await this.listAppointmentsByDoctorUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      doctorId: doctorId as UUID,
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }
}

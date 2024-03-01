import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type ListQuery, type UUID } from '@medsphere/shared';
import { AppendAuditLogUseCase } from '../../application/use-cases/append-audit-log.use-case';
import { QueryAuditLogsUseCase } from '../../application/use-cases/query-audit-logs.use-case';
import { ExportAuditTrailUseCase } from '../../application/use-cases/export-audit-trail.use-case';

@Controller('audit-entrys')
export class AuditEntryController {
  constructor(
    private readonly appendAuditLogUseCase: AppendAuditLogUseCase,
    private readonly queryAuditLogsUseCase: QueryAuditLogsUseCase,
    private readonly exportAuditTrailUseCase: ExportAuditTrailUseCase,
  ) {}

  @Post('/logs')
  async appendAuditLog(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.appendAuditLogUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Get('/logs')
  async queryAuditLogs(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    
    @Query() query: Record<string, unknown>,
  ) {
    const result = await this.queryAuditLogsUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/export')
  async exportAuditTrail(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.exportAuditTrailUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }
}

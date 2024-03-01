import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type ListQuery, type UUID } from '@medsphere/shared';
import { StartVideoSessionUseCase } from '../../application/use-cases/start-video-session.use-case';
import { JoinVideoSessionUseCase } from '../../application/use-cases/join-video-session.use-case';
import { EndVideoSessionUseCase } from '../../application/use-cases/end-video-session.use-case';
import { RecordVideoSessionMetadataUseCase } from '../../application/use-cases/record-video-session-metadata.use-case';

@Controller('video-sessions')
export class VideoSessionController {
  constructor(
    private readonly startVideoSessionUseCase: StartVideoSessionUseCase,
    private readonly joinVideoSessionUseCase: JoinVideoSessionUseCase,
    private readonly endVideoSessionUseCase: EndVideoSessionUseCase,
    private readonly recordVideoSessionMetadataUseCase: RecordVideoSessionMetadataUseCase,
  ) {}

  @Post('/sessions')
  async startVideoSession(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.startVideoSessionUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/sessions/:id/join')
  async joinVideoSession(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.joinVideoSessionUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/sessions/:id/end')
  async endVideoSession(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.endVideoSessionUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/sessions/:id/metadata')
  async recordVideoSessionMetadata(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.recordVideoSessionMetadataUseCase.execute({
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

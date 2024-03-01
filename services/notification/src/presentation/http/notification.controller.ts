import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type ListQuery, type UUID } from '@medsphere/shared';
import { SendNotificationUseCase } from '../../application/use-cases/send-notification.use-case';
import { MarkNotificationReadUseCase } from '../../application/use-cases/mark-notification-read.use-case';
import { ListNotificationInboxUseCase } from '../../application/use-cases/list-notification-inbox.use-case';
import { ConfigureNotificationPreferencesUseCase } from '../../application/use-cases/configure-notification-preferences.use-case';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
    private readonly markNotificationReadUseCase: MarkNotificationReadUseCase,
    private readonly listNotificationInboxUseCase: ListNotificationInboxUseCase,
    private readonly configureNotificationPreferencesUseCase: ConfigureNotificationPreferencesUseCase,
  ) {}

  @Post('')
  async sendNotification(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.sendNotificationUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/:id/read')
  async markNotificationRead(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.markNotificationReadUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Get('/inbox/:recipientId')
  async listNotificationInbox(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('recipientId') recipientId: string,
    
    @Query() query: Record<string, unknown>,
  ) {
    const result = await this.listNotificationInboxUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      recipientId: recipientId as UUID,
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Put('/preferences/:recipientId')
  async configureNotificationPreferences(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('recipientId') recipientId: string,
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.configureNotificationPreferencesUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      recipientId: recipientId as UUID,
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }
}

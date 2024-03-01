import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type UUID } from '@medsphere/shared';
import { GetProfileUseCase } from '../../../application/use-cases/get-profile.use-case';
import { ListSessionsUseCase } from '../../../application/use-cases/list-sessions.use-case';
import { RevokeSessionUseCase } from '../../../application/use-cases/revoke-session.use-case';
import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

class ListSessionsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number;
}

@Controller('users')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class UsersController {
  constructor(
    private readonly getProfile: GetProfileUseCase,
    private readonly listSessions: ListSessionsUseCase,
    private readonly revokeSession: RevokeSessionUseCase,
  ) {}

  @Get('me')
  async me(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
  ) {
    const data = await this.getProfile.execute({ userId: user.sub });
    return successBody(data, correlationId);
  }

  @Get('me/sessions')
  async sessions(
    @CurrentUser() user: JwtAccessPayload,
    @Query() query: ListSessionsQueryDto,
    @CorrelationId() correlationId: string,
  ) {
    const data = await this.listSessions.execute({
      userId: user.sub,
      page: query.page,
      pageSize: query.pageSize,
    });
    return successBody(data, correlationId);
  }

  @Delete('me/sessions/:sessionId')
  async revoke(
    @CurrentUser() user: JwtAccessPayload,
    @Param('sessionId') sessionId: string,
    @CorrelationId() correlationId: string,
  ) {
    await this.revokeSession.execute({
      sessionId: sessionId as UUID,
      userId: user.sub,
      actorId: user.sub,
      reason: 'user_revoked_session',
      correlationId: correlationId as UUID,
    });
    return successBody({ revoked: true }, correlationId);
  }
}

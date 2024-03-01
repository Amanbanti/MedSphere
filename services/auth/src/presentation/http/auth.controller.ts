import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import type { Request } from 'express';
import { Public } from '@medsphere/auth-sdk';
import { successBody } from '@medsphere/shared';
import { RegisterUserUseCase } from '../../../application/use-cases/register-user.use-case';
import { LoginUseCase } from '../../../application/use-cases/login.use-case';
import { RefreshTokenUseCase } from '../../../application/use-cases/refresh-token.use-case';
import { LogoutUseCase } from '../../../application/use-cases/logout.use-case';
import { EnrollMfaUseCase } from '../../../application/use-cases/enroll-mfa.use-case';
import { VerifyMfaUseCase } from '../../../application/use-cases/verify-mfa.use-case';
import { RequestPasswordResetUseCase } from '../../../application/use-cases/request-password-reset.use-case';
import { ConfirmPasswordResetUseCase } from '../../../application/use-cases/confirm-password-reset.use-case';
import { CreateApiKeyUseCase } from '../../../application/use-cases/create-api-key.use-case';
import {
  ConfirmPasswordResetDto,
  CreateApiKeyRequestDto,
  EnrollMfaRequestDto,
  LoginRequestDto,
  RefreshTokenRequestDto,
  RegisterUserRequestDto,
  RequestPasswordResetDto,
  VerifyMfaRequestDto,
} from './dto/auth-request.dto';
import {
  CurrentUser,
  CorrelationId,
} from '@medsphere/auth-sdk';
import type { JwtAccessPayload, UUID } from '@medsphere/shared';

type AuthedRequest = Request & { correlationId?: string };

@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly login: LoginUseCase,
    private readonly refreshToken: RefreshTokenUseCase,
    private readonly logout: LogoutUseCase,
    private readonly enrollMfa: EnrollMfaUseCase,
    private readonly verifyMfa: VerifyMfaUseCase,
    private readonly requestPasswordReset: RequestPasswordResetUseCase,
    private readonly confirmPasswordReset: ConfirmPasswordResetUseCase,
    private readonly createApiKey: CreateApiKeyUseCase,
  ) {}

  @Public()
  @Post('register')
  async register(
    @Body() dto: RegisterUserRequestDto,
    @CorrelationId() correlationId: string,
    @Req() req: AuthedRequest,
  ) {
    const data = await this.registerUser.execute({
      email: dto.email,
      password: dto.password,
      firstName: dto.firstName,
      lastName: dto.lastName,
      organizationId: dto.organizationId as UUID,
      phone: dto.phone,
      correlationId: correlationId as UUID,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });
    return successBody(data, correlationId);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(
    @Body() dto: LoginRequestDto,
    @CorrelationId() correlationId: string,
    @Req() req: AuthedRequest,
  ) {
    const data = await this.login.execute({
      email: dto.email,
      password: dto.password,
      organizationSlug: dto.organizationSlug,
      mfaCode: dto.mfaCode,
      deviceId: dto.deviceId,
      correlationId: correlationId as UUID,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });
    return successBody(data, correlationId);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Body() dto: RefreshTokenRequestDto,
    @CorrelationId() correlationId: string,
    @Req() req: AuthedRequest,
  ) {
    const data = await this.refreshToken.execute({
      refreshToken: dto.refreshToken,
      correlationId: correlationId as UUID,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });
    return successBody(data, correlationId);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logoutUser(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
  ): Promise<void> {
    await this.logout.execute({
      sessionId: user.sessionId,
      userId: user.sub,
      correlationId: correlationId as UUID,
    });
  }

  @Post('mfa/enroll')
  async mfaEnroll(
    @CurrentUser() user: JwtAccessPayload,
    @Body() dto: EnrollMfaRequestDto,
    @CorrelationId() correlationId: string,
  ) {
    const data = await this.enrollMfa.execute({
      userId: user.sub,
      method: dto.method,
      correlationId: correlationId as UUID,
    });
    return successBody(data, correlationId);
  }

  @Post('mfa/verify')
  @HttpCode(HttpStatus.OK)
  async mfaVerify(
    @CurrentUser() user: JwtAccessPayload,
    @Body() dto: VerifyMfaRequestDto,
    @CorrelationId() correlationId: string,
  ) {
    const data = await this.verifyMfa.execute({
      userId: user.sub,
      method: dto.method,
      code: dto.code,
      challengeId: dto.challengeId as UUID | undefined,
      sessionId: user.sessionId,
      correlationId: correlationId as UUID,
    });
    return successBody(data, correlationId);
  }

  @Public()
  @Post('password-reset/request')
  @HttpCode(HttpStatus.OK)
  async passwordResetRequest(
    @Body() dto: RequestPasswordResetDto,
    @CorrelationId() correlationId: string,
    @Req() req: AuthedRequest,
  ) {
    const data = await this.requestPasswordReset.execute({
      email: dto.email,
      correlationId: correlationId as UUID,
      ipAddress: req.ip,
    });
    return successBody(data, correlationId);
  }

  @Public()
  @Post('password-reset/confirm')
  @HttpCode(HttpStatus.OK)
  async passwordResetConfirm(
    @Body() dto: ConfirmPasswordResetDto,
    @CorrelationId() correlationId: string,
  ) {
    const data = await this.confirmPasswordReset.execute({
      token: dto.token,
      newPassword: dto.newPassword,
      correlationId: correlationId as UUID,
    });
    return successBody(data, correlationId);
  }

  @Post('api-keys')
  async apiKeys(
    @CurrentUser() user: JwtAccessPayload,
    @Body() dto: CreateApiKeyRequestDto,
    @CorrelationId() correlationId: string,
  ) {
    const data = await this.createApiKey.execute({
      userId: user.sub,
      organizationId: user.orgId,
      name: dto.name,
      scopes: dto.scopes,
      expiresAt: dto.expiresAt as import('@medsphere/shared').ISODateString | undefined,
      correlationId: correlationId as UUID,
    });
    return successBody(data, correlationId);
  }
}

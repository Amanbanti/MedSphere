import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtService, JwtAuthGuard, PermissionsGuard } from '@medsphere/auth-sdk';
import { createLogger, NestMedSphereLogger } from '@medsphere/logger';
import { authConfigFactory, type AuthConfig } from '../infrastructure/config/auth.config';
import { PrismaModule } from '../infrastructure/prisma/prisma.module';
import { TotpService } from '../infrastructure/crypto/totp.service';
import { PrismaUserRepository } from '../infrastructure/persistence/prisma-user.repository';
import { PrismaSessionRepository } from '../infrastructure/persistence/prisma-session.repository';
import { PrismaOrganizationRepository } from '../infrastructure/persistence/prisma-organization.repository';
import { PrismaMfaRepository } from '../infrastructure/persistence/prisma-mfa.repository';
import { PrismaAuditRepository } from '../infrastructure/persistence/prisma-audit.repository';
import { PrismaOutboxRepository } from '../infrastructure/persistence/prisma-outbox.repository';
import { PrismaRoleRepository } from '../infrastructure/persistence/prisma-role.repository';
import { PrismaApiKeyRepository } from '../infrastructure/persistence/prisma-api-key.repository';
import { PrismaPasswordResetRepository } from '../infrastructure/persistence/prisma-password-reset.repository';
import { USER_REPOSITORY } from '../domain/repositories/user.repository';
import { SESSION_REPOSITORY } from '../domain/repositories/session.repository';
import { ORGANIZATION_REPOSITORY } from '../domain/repositories/organization.repository';
import { MFA_REPOSITORY } from '../domain/repositories/mfa.repository';
import { AUDIT_REPOSITORY } from '../domain/repositories/audit.repository';
import { OUTBOX_REPOSITORY } from '../domain/repositories/outbox.repository';
import { ROLE_REPOSITORY } from '../domain/repositories/role.repository';
import { API_KEY_REPOSITORY } from '../domain/repositories/api-key.repository';
import { PASSWORD_RESET_REPOSITORY } from '../domain/repositories/password-reset.repository';
import { TokenIssuanceService } from '../application/services/token-issuance.service';
import { RegisterUserUseCase } from '../application/use-cases/register-user.use-case';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { RefreshTokenUseCase } from '../application/use-cases/refresh-token.use-case';
import { LogoutUseCase } from '../application/use-cases/logout.use-case';
import { EnrollMfaUseCase } from '../application/use-cases/enroll-mfa.use-case';
import { VerifyMfaUseCase } from '../application/use-cases/verify-mfa.use-case';
import { RequestPasswordResetUseCase } from '../application/use-cases/request-password-reset.use-case';
import { ConfirmPasswordResetUseCase } from '../application/use-cases/confirm-password-reset.use-case';
import { CreateApiKeyUseCase } from '../application/use-cases/create-api-key.use-case';
import { RevokeSessionUseCase } from '../application/use-cases/revoke-session.use-case';
import { GetProfileUseCase } from '../application/use-cases/get-profile.use-case';
import { ListSessionsUseCase } from '../application/use-cases/list-sessions.use-case';
import { AuthController } from '../presentation/http/auth.controller';
import { UsersController } from '../presentation/http/users.controller';
import { DomainExceptionFilter } from '../presentation/filters/domain-exception.filter';
import { CorrelationIdInterceptor } from '../presentation/interceptors/correlation-id.interceptor';
import { PasswordPolicyService } from '../domain/services/password-policy.domain-service';

@Module({
  imports: [ConfigModule.forFeature(authConfigFactory), PrismaModule],
  controllers: [AuthController, UsersController],
  providers: [
    {
      provide: JwtService,
      useFactory: (config: ConfigService) => {
        const auth = config.get<AuthConfig>('auth')!;
        return new JwtService({
          secret: auth.jwtSecret,
          issuer: auth.jwtIssuer,
          audience: auth.jwtAudience,
          accessTtlSeconds: auth.accessTtlSeconds,
          refreshTtlSeconds: auth.refreshTtlSeconds,
        });
      },
      inject: [ConfigService],
    },
    {
      provide: NestMedSphereLogger,
      useFactory: () =>
        new NestMedSphereLogger(
          createLogger({ service: process.env.SERVICE_NAME ?? 'auth-service' }),
        ),
    },
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
    { provide: SESSION_REPOSITORY, useClass: PrismaSessionRepository },
    { provide: ORGANIZATION_REPOSITORY, useClass: PrismaOrganizationRepository },
    { provide: MFA_REPOSITORY, useClass: PrismaMfaRepository },
    { provide: AUDIT_REPOSITORY, useClass: PrismaAuditRepository },
    { provide: OUTBOX_REPOSITORY, useClass: PrismaOutboxRepository },
    { provide: ROLE_REPOSITORY, useClass: PrismaRoleRepository },
    { provide: API_KEY_REPOSITORY, useClass: PrismaApiKeyRepository },
    { provide: PASSWORD_RESET_REPOSITORY, useClass: PrismaPasswordResetRepository },
    TotpService,
    PasswordPolicyService,
    TokenIssuanceService,
    RegisterUserUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
    LogoutUseCase,
    EnrollMfaUseCase,
    VerifyMfaUseCase,
    RequestPasswordResetUseCase,
    ConfirmPasswordResetUseCase,
    CreateApiKeyUseCase,
    RevokeSessionUseCase,
    GetProfileUseCase,
    ListSessionsUseCase,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: PermissionsGuard },
    { provide: APP_FILTER, useClass: DomainExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: CorrelationIdInterceptor },
  ],
  exports: [JwtService],
})
export class AuthModule {}

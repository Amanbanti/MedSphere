import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { JwtAccessPayload, Permission, SystemRole } from '@medsphere/shared';

export const IS_PUBLIC_KEY = 'medsphere:isPublic';
export const PERMISSIONS_KEY = 'medsphere:permissions';
export const ROLES_KEY = 'medsphere:roles';
export const MFA_REQUIRED_KEY = 'medsphere:mfaRequired';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Permissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
export const Roles = (...roles: SystemRole[]) => SetMetadata(ROLES_KEY, roles);
export const RequireMfa = () => SetMetadata(MFA_REQUIRED_KEY, true);

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtAccessPayload | undefined => {
    const request = ctx.switchToHttp().getRequest<{ user?: JwtAccessPayload }>();
    return request.user;
  },
);

export const CorrelationId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
      correlationId?: string;
    }>();
    if (request.correlationId) {
      return request.correlationId;
    }
    const header = request.headers['x-correlation-id'];
    return Array.isArray(header) ? header[0] : header;
  },
);

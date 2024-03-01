import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY, JwtService } from '@medsphere/auth-sdk';
import { ERROR_CODES, HTTP_STATUS } from '@medsphere/shared';
import { HttpProxyService } from '../proxy/http-proxy.service';
import { extractApiV1RelativePath } from '../proxy/service-registry';
import type { GatewayRequest } from '../types/request.types';

/**
 * Dynamic gateway auth guard — skips JWT validation for upstream routes
 * marked as public while enforcing bearer tokens for protected services.
 */
@Injectable()
export class GatewayAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly proxyService: HttpProxyService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<GatewayRequest>();
    const relativePath = extractApiV1RelativePath(
      request.originalUrl ?? request.url,
    );

    if (relativePath.startsWith('auth')) {
      return true;
    }

    const match = this.proxyService.getRegistry().resolveRoute(relativePath);
    if (match && !match.requiresAuth) {
      return this.attachUserIfPresent(request);
    }

    return this.requireAuthenticated(request);
  }

  private attachUserIfPresent(request: GatewayRequest): boolean {
    const token = this.extractBearerToken(request);
    if (!token) {
      return true;
    }
    try {
      request.user = this.jwtService.verifyAccess(token);
    } catch {
      // Optional auth — invalid token on public route is ignored
    }
    return true;
  }

  private requireAuthenticated(request: GatewayRequest): boolean {
    const token = this.extractBearerToken(request);
    if (!token) {
      throw new UnauthorizedException({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        errorCode: ERROR_CODES.UNAUTHORIZED,
        message: 'Missing bearer token',
        correlationId: request.correlationId ?? 'unknown',
      });
    }

    try {
      request.user = this.jwtService.verifyAccess(token);
      return true;
    } catch {
      throw new UnauthorizedException({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        errorCode: ERROR_CODES.TOKEN_EXPIRED,
        message: 'Invalid or expired token',
        correlationId: request.correlationId ?? 'unknown',
      });
    }
  }

  private extractBearerToken(request: GatewayRequest): string | undefined {
    const header = request.headers.authorization;
    const value = Array.isArray(header) ? header[0] : header;
    if (!value?.startsWith('Bearer ')) {
      return undefined;
    }
    return value.slice('Bearer '.length).trim();
  }
}

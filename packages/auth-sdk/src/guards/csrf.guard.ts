import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import type { Request, Response } from 'express';
import { IS_PUBLIC_KEY } from '../decorators';

export const CSRF_PROTECTED_KEY = 'csrfProtected';
export const CSRF_COOKIE_NAME = 'ms_csrf';
export const CSRF_HEADER_NAME = 'x-csrf-token';

export interface CsrfGuardOptions {
  cookieName?: string;
  headerName?: string;
  /** HTTP methods that require CSRF validation */
  protectedMethods?: string[];
  /** Use secure cookies in production */
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

const DEFAULT_PROTECTED_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export function generateCsrfToken(): string {
  return randomBytes(32).toString('base64url');
}

export function setCsrfCookie(
  res: Response,
  token: string,
  options: CsrfGuardOptions = {},
): void {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie(options.cookieName ?? CSRF_COOKIE_NAME, hashToken(token), {
    httpOnly: true,
    secure: options.secure ?? isProduction,
    sameSite: options.sameSite ?? 'strict',
    path: '/',
    maxAge: 86_400_000,
  });
}

/**
 * Double-submit cookie CSRF guard for cookie-based portal sessions.
 * Compares hashed cookie value with SHA-256 hash of the X-CSRF-Token header.
 */
@Injectable()
export class CsrfGuard implements CanActivate {
  private readonly cookieName: string;
  private readonly headerName: string;
  private readonly protectedMethods: Set<string>;

  constructor(
    private readonly reflector: Reflector,
    options: CsrfGuardOptions = {},
  ) {
    this.cookieName = options.cookieName ?? CSRF_COOKIE_NAME;
    this.headerName = options.headerName ?? CSRF_HEADER_NAME;
    this.protectedMethods = new Set(
      options.protectedMethods ?? DEFAULT_PROTECTED_METHODS,
    );
  }

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const csrfRequired = this.reflector.getAllAndOverride<boolean>(
      CSRF_PROTECTED_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!csrfRequired) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method.toUpperCase();

    if (!this.protectedMethods.has(method)) {
      return true;
    }

    const sessionCookie =
      request.cookies?.['ms_session'] ?? request.cookies?.['connect.sid'];
    if (!sessionCookie) {
      throw new UnauthorizedException('Session cookie required for CSRF validation');
    }

    const cookieHash = request.cookies?.[this.cookieName];
    const headerToken = request.headers[this.headerName.toLowerCase()];

    if (!cookieHash || typeof headerToken !== 'string') {
      throw new ForbiddenException('CSRF token missing');
    }

    const headerHash = hashToken(headerToken);
    if (!safeEqual(cookieHash, headerHash)) {
      throw new ForbiddenException('CSRF token mismatch');
    }

    return true;
  }
}

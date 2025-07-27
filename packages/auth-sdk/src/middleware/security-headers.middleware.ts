import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

export interface SecurityHeadersOptions {
  /** Enable HTTP Strict Transport Security */
  hsts?: boolean;
  /** Max age for HSTS in seconds (default: 1 year) */
  hstsMaxAge?: number;
  /** Content Security Policy directive string */
  contentSecurityPolicy?: string;
  /** Referrer-Policy value */
  referrerPolicy?: string;
  /** Permissions-Policy value */
  permissionsPolicy?: string;
  /** Disable framing (X-Frame-Options) */
  frameDeny?: boolean;
}

const DEFAULT_CSP =
  "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https: wss:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'";

const DEFAULT_PERMISSIONS_POLICY =
  'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()';

@Injectable()
export class SecurityHeadersMiddleware implements NestMiddleware {
  constructor(private readonly options: SecurityHeadersOptions = {}) {}

  use(_req: Request, res: Response, next: NextFunction): void {
    const isProduction = process.env.NODE_ENV === 'production';
    const hstsEnabled = this.options.hsts ?? isProduction;

    if (hstsEnabled) {
      const maxAge = this.options.hstsMaxAge ?? 31_536_000;
      res.setHeader(
        'Strict-Transport-Security',
        `max-age=${maxAge}; includeSubDomains; preload`,
      );
    }

    res.setHeader(
      'Content-Security-Policy',
      this.options.contentSecurityPolicy ?? DEFAULT_CSP,
    );
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', this.options.frameDeny !== false ? 'DENY' : 'SAMEORIGIN');
    res.setHeader(
      'Referrer-Policy',
      this.options.referrerPolicy ?? 'strict-origin-when-cross-origin',
    );
    res.setHeader(
      'Permissions-Policy',
      this.options.permissionsPolicy ?? DEFAULT_PERMISSIONS_POLICY,
    );
    res.setHeader('X-DNS-Prefetch-Control', 'off');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');

    next();
  }
}

export function createSecurityHeadersMiddleware(
  options?: SecurityHeadersOptions,
): SecurityHeadersMiddleware {
  return new SecurityHeadersMiddleware(options);
}

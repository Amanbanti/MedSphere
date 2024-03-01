/**
 * JWT access/refresh token helpers (crypto-agnostic interface + HMAC implementation).
 */

import { createHmac, timingSafeEqual } from 'crypto';
import type { JwtAccessPayload, JwtRefreshPayload } from '@medsphere/shared';
import {
  MEDSPHERE_AUDIENCE,
  MEDSPHERE_ISSUER,
} from '@medsphere/shared';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface JwtSignerOptions {
  secret: string;
  issuer?: string;
  audience?: string;
  accessTtlSeconds?: number;
  refreshTtlSeconds?: number;
}

function base64UrlEncode(input: Buffer | string): string {
  const buffer = typeof input === 'string' ? Buffer.from(input, 'utf8') : input;
  return buffer
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(input: string): Buffer {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  const padLength = (4 - (padded.length % 4)) % 4;
  return Buffer.from(padded + '='.repeat(padLength), 'base64');
}

function signHs256(data: string, secret: string): string {
  return base64UrlEncode(createHmac('sha256', secret).update(data).digest());
}

function safeCompare(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) {
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
}

export class JwtService {
  private readonly secret: string;
  private readonly issuer: string;
  private readonly audience: string;
  private readonly accessTtlSeconds: number;
  private readonly refreshTtlSeconds: number;

  constructor(options: JwtSignerOptions) {
    if (!options.secret || options.secret.length < 32) {
      throw new Error('JWT secret must be at least 32 characters');
    }
    this.secret = options.secret;
    this.issuer = options.issuer ?? MEDSPHERE_ISSUER;
    this.audience = options.audience ?? MEDSPHERE_AUDIENCE;
    this.accessTtlSeconds = options.accessTtlSeconds ?? 900;
    this.refreshTtlSeconds = options.refreshTtlSeconds ?? 604800;
  }

  signAccess(payload: Omit<JwtAccessPayload, 'iat' | 'exp' | 'iss' | 'aud'>): string {
    const now = Math.floor(Date.now() / 1000);
    const full: JwtAccessPayload = {
      ...payload,
      iat: now,
      exp: now + this.accessTtlSeconds,
      iss: this.issuer,
      aud: this.audience,
    };
    return this.sign(full);
  }

  signRefresh(
    payload: Omit<JwtRefreshPayload, 'iat' | 'exp' | 'iss'>,
  ): string {
    const now = Math.floor(Date.now() / 1000);
    const full: JwtRefreshPayload = {
      ...payload,
      iat: now,
      exp: now + this.refreshTtlSeconds,
      iss: this.issuer,
    };
    return this.sign(full);
  }

  verifyAccess(token: string): JwtAccessPayload {
    const payload = this.verify(token) as JwtAccessPayload;
    if (payload.iss !== this.issuer || payload.aud !== this.audience) {
      throw new Error('Invalid token issuer or audience');
    }
    if (!payload.sub || !payload.sessionId) {
      throw new Error('Invalid access token payload');
    }
    return payload;
  }

  verifyRefresh(token: string): JwtRefreshPayload {
    const payload = this.verify(token) as JwtRefreshPayload;
    if (payload.iss !== this.issuer) {
      throw new Error('Invalid refresh token issuer');
    }
    if (!payload.sub || !payload.sessionId || !payload.tokenFamily) {
      throw new Error('Invalid refresh token payload');
    }
    return payload;
  }

  getAccessTtlSeconds(): number {
    return this.accessTtlSeconds;
  }

  private sign(payload: object): string {
    const header = base64UrlEncode(
      JSON.stringify({ alg: 'HS256', typ: 'JWT' }),
    );
    const body = base64UrlEncode(JSON.stringify(payload));
    const signature = signHs256(`${header}.${body}`, this.secret);
    return `${header}.${body}.${signature}`;
  }

  private verify(token: string): Record<string, unknown> {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Malformed JWT');
    }
    const [header, body, signature] = parts;
    if (!header || !body || !signature) {
      throw new Error('Malformed JWT');
    }
    const expected = signHs256(`${header}.${body}`, this.secret);
    if (!safeCompare(signature, expected)) {
      throw new Error('Invalid JWT signature');
    }
    const payload = JSON.parse(base64UrlDecode(body).toString('utf8')) as {
      exp?: number;
      nbf?: number;
      [key: string]: unknown;
    };
    const now = Math.floor(Date.now() / 1000);
    if (typeof payload.exp === 'number' && payload.exp < now) {
      throw new Error('Token expired');
    }
    if (typeof payload.nbf === 'number' && payload.nbf > now) {
      throw new Error('Token not yet valid');
    }
    return payload;
  }
}

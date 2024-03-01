import type { Request, Response } from 'express';
import type { JwtAccessPayload } from '@medsphere/shared';

export interface GatewayRequest extends Request {
  correlationId?: string;
  requestId?: string;
  user?: JwtAccessPayload;
  gatewayStartTime?: number;
  rateLimitKey?: string;
  proxiedService?: string;
}

export interface GatewayResponse extends Response {
  locals: Response['locals'] & {
    skipResponseTransform?: boolean;
  };
}

export interface ForwardedHeaders {
  [header: string]: string;
}

export interface ProxyResult {
  statusCode: number;
  headers: Record<string, string | string[]>;
  body: Buffer | string | null;
  upstreamUrl: string;
  serviceName: string;
  durationMs: number;
}

export interface RouteMatch {
  serviceName: ServiceNameRef;
  upstreamPath: string;
  requiresAuth: boolean;
  isAuthRoute: boolean;
}

export type ServiceNameRef =
  | 'auth'
  | 'patient'
  | 'doctor'
  | 'appointment'
  | 'medical-record'
  | 'pharmacy'
  | 'laboratory'
  | 'radiology'
  | 'billing'
  | 'insurance'
  | 'notification'
  | 'search'
  | 'analytics'
  | 'video-consultation'
  | 'diagnosis-ai';

export const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailers',
  'transfer-encoding',
  'upgrade',
  'host',
]);

export const GATEWAY_INTERNAL_HEADERS = new Set([
  'x-forwarded-host',
  'x-forwarded-proto',
  'x-forwarded-for',
  'x-real-ip',
]);

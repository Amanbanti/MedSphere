import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import {
  ERROR_CODES,
  HTTP_STATUS,
  RATE_LIMIT_AUTH_MAX_REQUESTS,
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW_MS,
} from '@medsphere/shared';
import { globalMetrics } from '@medsphere/monitoring-sdk';
import { IS_PUBLIC_KEY } from '@medsphere/auth-sdk';
import type { GatewayConfig } from '../config/gateway.config';
import type { GatewayRequest } from '../types/request.types';
import { METRIC_RATE_LIMITED_TOTAL } from '../constants';

export interface RateLimitDecision {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetMs: number;
  key: string;
}

interface SlidingWindowBucket {
  timestamps: number[];
}

export class SlidingWindowRateLimiter {
  private readonly buckets = new Map<string, SlidingWindowBucket>();

  consume(key: string, limit: number, windowMs: number): RateLimitDecision {
    const now = Date.now();
    const bucket = this.buckets.get(key) ?? { timestamps: [] };
    bucket.timestamps = bucket.timestamps.filter(
      (timestamp) => now - timestamp < windowMs,
    );

    if (bucket.timestamps.length >= limit) {
      const oldest = bucket.timestamps[0] ?? now;
      this.buckets.set(key, bucket);
      return {
        allowed: false,
        limit,
        remaining: 0,
        resetMs: Math.max(0, windowMs - (now - oldest)),
        key,
      };
    }

    bucket.timestamps.push(now);
    this.buckets.set(key, bucket);

    return {
      allowed: true,
      limit,
      remaining: Math.max(0, limit - bucket.timestamps.length),
      resetMs: windowMs,
      key,
    };
  }

  purgeStale(windowMs: number): number {
    const now = Date.now();
    let removed = 0;

    for (const [key, bucket] of this.buckets.entries()) {
      bucket.timestamps = bucket.timestamps.filter(
        (timestamp) => now - timestamp < windowMs,
      );
      if (bucket.timestamps.length === 0) {
        this.buckets.delete(key);
        removed += 1;
      }
    }

    return removed;
  }

  size(): number {
    return this.buckets.size;
  }
}

import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_AUTH_KEY = 'medsphere:rateLimitAuth';

export const RateLimitAuthRoute = () => SetMetadata(RATE_LIMIT_AUTH_KEY, true);

@Injectable()
export class RateLimitGuard implements CanActivate, OnModuleInit, OnModuleDestroy {
  private readonly limiter = new SlidingWindowRateLimiter();
  private cleanupTimer?: ReturnType<typeof setInterval>;
  private config!: GatewayConfig['rateLimit'];

  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  onModuleInit(): void {
    this.config = this.configService.get<GatewayConfig>('gateway')!.rateLimit;
    this.cleanupTimer = setInterval(() => {
      this.limiter.purgeStale(this.config.windowMs);
    }, this.config.cleanupIntervalMs);
  }

  onModuleDestroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
  }

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<GatewayRequest>();
    const response = context.switchToHttp().getResponse();

    const isAuthRoute = this.reflector.getAllAndOverride<boolean>(
      RATE_LIMIT_AUTH_KEY,
      [context.getHandler(), context.getClass()],
    );

    const windowMs = this.config?.windowMs ?? RATE_LIMIT_WINDOW_MS;
    const limit = isAuthRoute
      ? (this.config?.authMaxRequests ?? RATE_LIMIT_AUTH_MAX_REQUESTS)
      : (this.config?.maxRequests ?? RATE_LIMIT_MAX_REQUESTS);

    const clientKey = this.buildClientKey(request, isPublic);
    request.rateLimitKey = clientKey;

    const decision = this.limiter.consume(clientKey, limit, windowMs);

    response.setHeader('X-RateLimit-Limit', String(decision.limit));
    response.setHeader('X-RateLimit-Remaining', String(decision.remaining));
    response.setHeader(
      'X-RateLimit-Reset',
      String(Math.ceil(decision.resetMs / 1000)),
    );

    if (!decision.allowed) {
      globalMetrics
        .counter(METRIC_RATE_LIMITED_TOTAL, 'Total rate-limited requests', {
          authRoute: String(isAuthRoute),
        })
        .inc();

      throw new HttpException(
        {
          statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
          errorCode: ERROR_CODES.RATE_LIMITED,
          message: 'Rate limit exceeded. Please retry later.',
          correlationId: request.correlationId ?? 'unknown',
          retryAfterSeconds: Math.ceil(decision.resetMs / 1000),
        },
        HTTP_STATUS.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }

  evaluate(key: string, limit: number, windowMs: number): RateLimitDecision {
    return this.limiter.consume(key, limit, windowMs);
  }

  private buildClientKey(request: GatewayRequest, isPublic: boolean): string {
    const ip = this.extractClientIp(request);
    const userId = request.user?.sub;
    const path = (request.originalUrl ?? request.url).split('?')[0] ?? '/';

    if (userId) {
      return `user:${userId}:${path}`;
    }

    if (isPublic) {
      return `ip:${ip}:public:${path}`;
    }

    return `ip:${ip}:${path}`;
  }

  private extractClientIp(request: GatewayRequest): string {
    const forwarded = request.headers['x-forwarded-for'];
    if (forwarded) {
      const first = Array.isArray(forwarded) ? forwarded[0] : forwarded;
      return first?.split(',')[0]?.trim() ?? 'unknown';
    }
    return request.ip ?? request.socket?.remoteAddress ?? 'unknown';
  }
}

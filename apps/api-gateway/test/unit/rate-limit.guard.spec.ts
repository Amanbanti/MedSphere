import {
  RATE_LIMIT_AUTH_MAX_REQUESTS,
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW_MS,
} from '@medsphere/shared';
import {
  RateLimitGuard,
  SlidingWindowRateLimiter,
} from '../../src/guards/rate-limit.guard';

describe('SlidingWindowRateLimiter', () => {
  let limiter: SlidingWindowRateLimiter;

  beforeEach(() => {
    limiter = new SlidingWindowRateLimiter();
  });

  it('allows requests under the limit', () => {
    const windowMs = RATE_LIMIT_WINDOW_MS;
    const limit = 5;

    for (let i = 0; i < limit; i += 1) {
      const decision = limiter.consume('client-a', limit, windowMs);
      expect(decision.allowed).toBe(true);
      expect(decision.remaining).toBe(limit - i - 1);
    }
  });

  it('blocks requests once the sliding window is full', () => {
    const windowMs = RATE_LIMIT_WINDOW_MS;
    const limit = 3;

    limiter.consume('client-b', limit, windowMs);
    limiter.consume('client-b', limit, windowMs);
    limiter.consume('client-b', limit, windowMs);

    const blocked = limiter.consume('client-b', limit, windowMs);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetMs).toBeGreaterThan(0);
  });

  it('tracks independent keys separately', () => {
    const limit = 2;
    const windowMs = 1_000;

    limiter.consume('key-1', limit, windowMs);
    limiter.consume('key-1', limit, windowMs);
    const blockedFirst = limiter.consume('key-1', limit, windowMs);

    const allowedSecond = limiter.consume('key-2', limit, windowMs);

    expect(blockedFirst.allowed).toBe(false);
    expect(allowedSecond.allowed).toBe(true);
  });

  it('expires timestamps outside the window', () => {
    jest.useFakeTimers();
    const limit = 2;
    const windowMs = 1_000;

    limiter.consume('client-c', limit, windowMs);
    jest.advanceTimersByTime(windowMs + 1);

    const decision = limiter.consume('client-c', limit, windowMs);
    expect(decision.allowed).toBe(true);
    expect(decision.remaining).toBe(limit - 1);

    jest.useRealTimers();
  });

  it('purges stale buckets', () => {
    jest.useFakeTimers();
    const windowMs = 500;

    limiter.consume('stale-key', 5, windowMs);
    expect(limiter.size()).toBe(1);

    jest.advanceTimersByTime(windowMs + 1);
    const removed = limiter.purgeStale(windowMs);

    expect(removed).toBe(1);
    expect(limiter.size()).toBe(0);

    jest.useRealTimers();
  });
});

describe('RateLimitGuard', () => {
  const configService = {
    get: jest.fn().mockReturnValue({
      windowMs: RATE_LIMIT_WINDOW_MS,
      maxRequests: RATE_LIMIT_MAX_REQUESTS,
      authMaxRequests: RATE_LIMIT_AUTH_MAX_REQUESTS,
      cleanupIntervalMs: 60_000,
    }),
  };

  const reflector = {
    getAllAndOverride: jest.fn().mockReturnValue(false),
  };

  it('sets rate limit headers on allowed requests', () => {
    const guard = new RateLimitGuard(configService as never, reflector as never);
    guard.onModuleInit();

    const setHeader = jest.fn();
    const request = {
      originalUrl: '/api/v1/patients',
      headers: {},
      ip: '127.0.0.1',
    };
    const response = { setHeader };

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
        getResponse: () => response,
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    };

    const allowed = guard.canActivate(context as never);
    expect(allowed).toBe(true);
    expect(setHeader).toHaveBeenCalledWith(
      'X-RateLimit-Limit',
      String(RATE_LIMIT_MAX_REQUESTS),
    );
    expect(setHeader).toHaveBeenCalledWith('X-RateLimit-Remaining', expect.any(String));
  });

  it('uses auth rate limit constants for auth routes', () => {
    reflector.getAllAndOverride.mockImplementation((key: string) => {
      if (key === 'medsphere:rateLimitAuth') {
        return true;
      }
      return false;
    });

    const guard = new RateLimitGuard(configService as never, reflector as never);
    guard.onModuleInit();

    const decisions: number[] = [];
    for (let i = 0; i < RATE_LIMIT_AUTH_MAX_REQUESTS; i += 1) {
      const decision = guard.evaluate(
        'auth-route',
        RATE_LIMIT_AUTH_MAX_REQUESTS,
        RATE_LIMIT_WINDOW_MS,
      );
      decisions.push(decision.remaining);
    }

    expect(decisions[0]).toBe(RATE_LIMIT_AUTH_MAX_REQUESTS - 1);
    expect(decisions[decisions.length - 1]).toBe(0);

    const blocked = guard.evaluate(
      'auth-route',
      RATE_LIMIT_AUTH_MAX_REQUESTS,
      RATE_LIMIT_WINDOW_MS,
    );
    expect(blocked.allowed).toBe(false);
  });
});

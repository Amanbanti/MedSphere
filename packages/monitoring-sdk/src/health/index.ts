export type HealthStatus = 'up' | 'down';

export interface HealthIndicatorResult {
  name: string;
  status: HealthStatus;
  latencyMs?: number;
  message?: string;
  details?: Record<string, unknown>;
}

export type HealthIndicator = () => Promise<HealthIndicatorResult>;

export interface AggregatedHealth {
  status: 'ok' | 'degraded' | 'down';
  service: string;
  version: string;
  uptimeSeconds: number;
  checks: Record<
    string,
    {
      status: HealthStatus;
      latencyMs?: number;
      message?: string;
    }
  >;
}

export class HealthRegistry {
  private readonly indicators = new Map<string, HealthIndicator>();
  private readonly startedAt = Date.now();

  constructor(
    private readonly service: string,
    private readonly version: string,
  ) {}

  register(name: string, indicator: HealthIndicator): void {
    this.indicators.set(name, indicator);
  }

  async check(): Promise<AggregatedHealth> {
    const checks: AggregatedHealth['checks'] = {};
    let downCount = 0;

    for (const [name, indicator] of this.indicators.entries()) {
      const started = Date.now();
      try {
        const result = await indicator();
        checks[name] = {
          status: result.status,
          latencyMs: result.latencyMs ?? Date.now() - started,
          message: result.message,
        };
        if (result.status === 'down') {
          downCount += 1;
        }
      } catch (error) {
        downCount += 1;
        checks[name] = {
          status: 'down',
          latencyMs: Date.now() - started,
          message: error instanceof Error ? error.message : 'Health check failed',
        };
      }
    }

    const status =
      downCount === 0
        ? 'ok'
        : downCount === this.indicators.size
          ? 'down'
          : 'degraded';

    return {
      status,
      service: this.service,
      version: this.version,
      uptimeSeconds: Math.floor((Date.now() - this.startedAt) / 1000),
      checks,
    };
  }
}

export function createPostgresHealthIndicator(
  ping: () => Promise<void>,
): HealthIndicator {
  return async () => {
    const started = Date.now();
    try {
      await ping();
      return { name: 'postgres', status: 'up', latencyMs: Date.now() - started };
    } catch (error) {
      return {
        name: 'postgres',
        status: 'down',
        latencyMs: Date.now() - started,
        message: error instanceof Error ? error.message : 'postgres down',
      };
    }
  };
}

export function createRedisHealthIndicator(
  ping: () => Promise<string>,
): HealthIndicator {
  return async () => {
    const started = Date.now();
    try {
      const pong = await ping();
      return {
        name: 'redis',
        status: pong.toLowerCase() === 'pong' ? 'up' : 'down',
        latencyMs: Date.now() - started,
      };
    } catch (error) {
      return {
        name: 'redis',
        status: 'down',
        latencyMs: Date.now() - started,
        message: error instanceof Error ? error.message : 'redis down',
      };
    }
  };
}

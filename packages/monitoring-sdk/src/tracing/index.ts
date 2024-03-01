/**
 * OpenTelemetry tracing bootstrap helpers.
 */

export interface TracingOptions {
  serviceName: string;
  otlpEndpoint?: string;
  enabled?: boolean;
}

export interface SpanHandle {
  setAttribute(key: string, value: string | number | boolean): void;
  recordException(error: unknown): void;
  end(): void;
}

class NoopSpan implements SpanHandle {
  setAttribute(): void {}
  recordException(): void {}
  end(): void {}
}

export class TracingFacade {
  private readonly enabled: boolean;
  private readonly serviceName: string;

  constructor(options: TracingOptions) {
    this.serviceName = options.serviceName;
    this.enabled = options.enabled ?? Boolean(options.otlpEndpoint);
  }

  startSpan(name: string, attributes?: Record<string, string>): SpanHandle {
    if (!this.enabled) {
      return new NoopSpan();
    }

    const startedAt = Date.now();
    const attrs = { ...attributes, 'service.name': this.serviceName };

    return {
      setAttribute: (key, value) => {
        attrs[key] = String(value);
      },
      recordException: (error) => {
        attrs['exception.message'] =
          error instanceof Error ? error.message : String(error);
      },
      end: () => {
        attrs['duration.ms'] = String(Date.now() - startedAt);
        if (process.env.OTEL_LOG_SPANS === 'true') {
          console.log(
            JSON.stringify({
              type: 'span',
              name,
              attributes: attrs,
            }),
          );
        }
      },
    };
  }

  async withSpan<T>(
    name: string,
    fn: (span: SpanHandle) => Promise<T>,
    attributes?: Record<string, string>,
  ): Promise<T> {
    const span = this.startSpan(name, attributes);
    try {
      return await fn(span);
    } catch (error) {
      span.recordException(error);
      throw error;
    } finally {
      span.end();
    }
  }
}

export function createTracing(options: TracingOptions): TracingFacade {
  return new TracingFacade(options);
}

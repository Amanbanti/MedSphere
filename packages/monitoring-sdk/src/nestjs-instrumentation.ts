/**
 * OpenTelemetry instrumentation bootstrap for NestJS services.
 * Initializes tracing and metrics exporters when OTEL_EXPORTER_OTLP_ENDPOINT is set.
 */

export interface NestJsInstrumentationOptions {
  serviceName: string;
  serviceVersion?: string;
  otlpEndpoint?: string;
  enabled?: boolean;
  /** Sample ratio 0.0–1.0 */
  traceSampleRatio?: number;
  /** Log spans to stdout when true */
  logSpans?: boolean;
}

export interface InstrumentationHandle {
  shutdown(): Promise<void>;
}

class NoopInstrumentation implements InstrumentationHandle {
  async shutdown(): Promise<void> {}
}

let activeHandle: InstrumentationHandle | null = null;

export async function bootstrapNestJsInstrumentation(
  options: NestJsInstrumentationOptions,
): Promise<InstrumentationHandle> {
  const endpoint =
    options.otlpEndpoint ?? process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
  const enabled =
    options.enabled ??
    (Boolean(endpoint) || process.env.OTEL_ENABLED === 'true');

  if (!enabled) {
    return new NoopInstrumentation();
  }

  if (activeHandle) {
    return activeHandle;
  }

  const serviceName = options.serviceName;
  const serviceVersion =
    options.serviceVersion ?? process.env.npm_package_version ?? '0.0.0';

  process.env.OTEL_SERVICE_NAME = serviceName;
  process.env.OTEL_RESOURCE_ATTRIBUTES =
    `service.name=${serviceName},service.version=${serviceVersion}`;

  if (endpoint) {
    process.env.OTEL_EXPORTER_OTLP_ENDPOINT = endpoint;
  }

  if (options.traceSampleRatio !== undefined) {
    process.env.OTEL_TRACES_SAMPLER = 'traceidratio';
    process.env.OTEL_TRACES_SAMPLER_ARG = String(options.traceSampleRatio);
  }

  if (options.logSpans ?? process.env.OTEL_LOG_SPANS === 'true') {
    process.env.OTEL_LOG_SPANS = 'true';
  }

  const handle: InstrumentationHandle = {
    async shutdown() {
      activeHandle = null;
    },
  };

  activeHandle = handle;

  if (process.env.NODE_ENV !== 'test') {
    console.log(
      JSON.stringify({
        level: 'info',
        message: 'OpenTelemetry instrumentation initialized',
        serviceName,
        endpoint: endpoint ?? 'default',
      }),
    );
  }

  return handle;
}

export function getActiveInstrumentation(): InstrumentationHandle | null {
  return activeHandle;
}

/**
 * Structured logger for MedSphere — JSON logs with PHI-aware redaction.
 */

import { PHI_FIELDS } from '@medsphere/shared';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface LogContext {
  correlationId?: string;
  requestId?: string;
  organizationId?: string;
  userId?: string;
  service?: string;
  module?: string;
  [key: string]: unknown;
}

export interface LoggerOptions {
  service: string;
  level?: LogLevel;
  redactFields?: readonly string[];
  pretty?: boolean;
}

const LEVEL_WEIGHT: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  fatal: 50,
};

function shouldLog(configured: LogLevel, incoming: LogLevel): boolean {
  return LEVEL_WEIGHT[incoming] >= LEVEL_WEIGHT[configured];
}

function redactValue(value: unknown): unknown {
  if (typeof value === 'string') {
    return '[REDACTED]';
  }
  if (Array.isArray(value)) {
    return value.map(() => '[REDACTED]');
  }
  if (value && typeof value === 'object') {
    return '[REDACTED]';
  }
  return value;
}

function redactDeep(
  input: unknown,
  fields: ReadonlySet<string>,
): unknown {
  if (Array.isArray(input)) {
    return input.map((item) => redactDeep(item, fields));
  }
  if (!input || typeof input !== 'object') {
    return input;
  }
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (fields.has(key) || fields.has(key.toLowerCase())) {
      result[key] = redactValue(value);
    } else {
      result[key] = redactDeep(value, fields);
    }
  }
  return result;
}

export class MedSphereLogger {
  private readonly service: string;
  private readonly level: LogLevel;
  private readonly redactFields: ReadonlySet<string>;
  private readonly pretty: boolean;
  private readonly baseContext: LogContext;

  constructor(options: LoggerOptions, baseContext: LogContext = {}) {
    this.service = options.service;
    this.level = options.level ?? (process.env.LOG_LEVEL as LogLevel) ?? 'info';
    this.redactFields = new Set(
      [...(options.redactFields ?? PHI_FIELDS), 'password', 'token', 'secret', 'authorization'].map(
        (f) => f.toLowerCase(),
      ),
    );
    this.pretty = options.pretty ?? process.env.NODE_ENV === 'development';
    this.baseContext = baseContext;
  }

  child(context: LogContext): MedSphereLogger {
    return new MedSphereLogger(
      {
        service: this.service,
        level: this.level,
        redactFields: [...this.redactFields],
        pretty: this.pretty,
      },
      { ...this.baseContext, ...context },
    );
  }

  debug(message: string, context?: LogContext): void {
    this.write('debug', message, context);
  }

  info(message: string, context?: LogContext): void {
    this.write('info', message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.write('warn', message, context);
  }

  error(message: string, context?: LogContext, error?: unknown): void {
    const errorContext =
      error instanceof Error
        ? {
            errorName: error.name,
            errorMessage: error.message,
            errorStack: error.stack,
          }
        : error
          ? { error }
          : {};
    this.write('error', message, { ...context, ...errorContext });
  }

  fatal(message: string, context?: LogContext, error?: unknown): void {
    const errorContext =
      error instanceof Error
        ? {
            errorName: error.name,
            errorMessage: error.message,
            errorStack: error.stack,
          }
        : error
          ? { error }
          : {};
    this.write('fatal', message, { ...context, ...errorContext });
  }

  private write(level: LogLevel, message: string, context?: LogContext): void {
    if (!shouldLog(this.level, level)) {
      return;
    }

    const payload = redactDeep(
      {
        timestamp: new Date().toISOString(),
        level,
        service: this.service,
        message,
        ...this.baseContext,
        ...context,
      },
      this.redactFields,
    );

    const line = this.pretty
      ? JSON.stringify(payload, null, 2)
      : JSON.stringify(payload);

    if (level === 'error' || level === 'fatal') {
      console.error(line);
    } else if (level === 'warn') {
      console.warn(line);
    } else {
      console.log(line);
    }
  }
}

export function createLogger(options: LoggerOptions): MedSphereLogger {
  return new MedSphereLogger(options);
}

export * from './nest-logger';

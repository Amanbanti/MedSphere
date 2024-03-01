/**
 * NestJS-compatible logger adapter wrapping MedSphereLogger.
 */

import { LoggerService } from '@nestjs/common';
import { MedSphereLogger } from './index';

export class NestMedSphereLogger implements LoggerService {
  constructor(private readonly logger: MedSphereLogger) {}

  log(message: unknown, ...optionalParams: unknown[]): void {
    this.logger.info(String(message), this.contextFrom(optionalParams));
  }

  error(message: unknown, ...optionalParams: unknown[]): void {
    const [trace, ...rest] = optionalParams;
    this.logger.error(String(message), this.contextFrom(rest), trace);
  }

  warn(message: unknown, ...optionalParams: unknown[]): void {
    this.logger.warn(String(message), this.contextFrom(optionalParams));
  }

  debug?(message: unknown, ...optionalParams: unknown[]): void {
    this.logger.debug(String(message), this.contextFrom(optionalParams));
  }

  verbose?(message: unknown, ...optionalParams: unknown[]): void {
    this.logger.debug(String(message), this.contextFrom(optionalParams));
  }

  private contextFrom(params: unknown[]): Record<string, unknown> {
    if (params.length === 0) {
      return {};
    }
    if (typeof params[0] === 'string') {
      return { context: params[0] };
    }
    if (params[0] && typeof params[0] === 'object') {
      return params[0] as Record<string, unknown>;
    }
    return { meta: params };
  }
}

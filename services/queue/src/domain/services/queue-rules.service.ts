import { ValidationError } from '../errors/queue.errors';

export class QueueDomainRules {
  validateQueueName(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('queueName is required');
    }
  }

  validateJobType(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('jobType is required');
    }
  }

  validateAttempts(value: number): void {
    if (!Number.isFinite(value)) {
      throw new ValidationError('attempts must be a finite number');
    }
  }

  validateOrganizationScope(organizationId: string, resourceOrganizationId: string): void {
    if (organizationId !== resourceOrganizationId) {
      throw new ValidationError('Organization scope mismatch');
    }
  }

  validateVersion(expected: number, actual: number): void {
    if (expected !== actual) {
      throw new ValidationError(`Optimistic lock failure: expected version ${expected}, got ${actual}`);
    }
  }

  sanitizePayload(payload: Record<string, unknown>): Record<string, unknown> {
    const allowed = new Set(["queueName","jobType","payload","status","attempts","scheduledFor"]);
    return Object.fromEntries(
      Object.entries(payload).filter(([key]) => allowed.has(key)),
    );
  }
}

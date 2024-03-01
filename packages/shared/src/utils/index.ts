/**
 * Shared utility functions for MedSphere platform services and apps.
 */

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../constants';
import type {
  ApiErrorBody,
  ApiSuccessBody,
  ISODateString,
  ListQuery,
  PaginatedResult,
  PaginationMeta,
  Result,
  UUID,
} from '../types';

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${String(value)}`);
}

export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function nowIso(): ISODateString {
  return new Date().toISOString() as ISODateString;
}

export function toIso(date: Date): ISODateString {
  return date.toISOString() as ISODateString;
}

export function parseIso(value: string): Date {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid ISO date: ${value}`);
  }
  return parsed;
}

export function createPaginationMeta(
  page: number,
  pageSize: number,
  totalItems: number,
): PaginationMeta {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
}

export function normalizeListQuery(query: ListQuery = {}): Required<
  Pick<ListQuery, 'page' | 'pageSize'>
> &
  ListQuery {
  const page = Math.max(1, query.page ?? DEFAULT_PAGE);
  const pageSize = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, query.pageSize ?? DEFAULT_PAGE_SIZE),
  );
  return { ...query, page, pageSize };
}

export function paginateArray<T>(
  items: T[],
  page: number,
  pageSize: number,
): PaginatedResult<T> {
  const start = (page - 1) * pageSize;
  const data = items.slice(start, start + pageSize);
  return {
    data,
    meta: createPaginationMeta(page, pageSize, items.length),
  };
}

export function successBody<T>(
  data: T,
  correlationId: string,
): ApiSuccessBody<T> {
  return {
    data,
    correlationId,
    timestamp: nowIso(),
  };
}

export function errorBody(
  statusCode: number,
  errorCode: string,
  message: string,
  correlationId: string,
  details?: Record<string, unknown>,
  path?: string,
): ApiErrorBody {
  return {
    statusCode,
    errorCode,
    message,
    details,
    correlationId,
    timestamp: nowIso(),
    path,
  };
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain) {
    return '***';
  }
  const visible = local.slice(0, 2);
  return `${visible}***@${domain}`;
}

export function maskPhone(phone: string): string {
  if (phone.length < 4) {
    return '****';
  }
  return `${'*'.repeat(Math.max(0, phone.length - 4))}${phone.slice(-4)}`;
}

export function redactPhi<T extends Record<string, unknown>>(
  payload: T,
  fields: readonly string[],
): T {
  const clone = { ...payload };
  for (const field of fields) {
    if (field in clone && clone[field] != null) {
      (clone as Record<string, unknown>)[field] = '[REDACTED]';
    }
  }
  return clone;
}

export function buildPermission(
  resource: string,
  action: string,
): `${string}:${string}` {
  return `${resource}:${action}`;
}

export function hasPermission(
  granted: readonly string[],
  required: string,
): boolean {
  if (granted.includes('*:*') || granted.includes(required)) {
    return true;
  }
  const [resource] = required.split(':');
  return granted.includes(`${resource}:*`);
}

export function hasAllPermissions(
  granted: readonly string[],
  required: readonly string[],
): boolean {
  return required.every((permission) => hasPermission(granted, permission));
}

export function hasAnyPermission(
  granted: readonly string[],
  required: readonly string[],
): boolean {
  return required.some((permission) => hasPermission(granted, permission));
}

export function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(',')}]`;
  }
  const keys = Object.keys(value as Record<string, unknown>).sort();
  const entries = keys.map(
    (key) =>
      `${JSON.stringify(key)}:${stableStringify((value as Record<string, unknown>)[key])}`,
  );
  return `{${entries.join(',')}}`;
}

export function chunkArray<T>(items: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error('Chunk size must be greater than zero');
  }
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

export function uniqueBy<T, K>(items: T[], keyFn: (item: T) => K): T[] {
  const seen = new Set<K>();
  const result: T[] = [];
  for (const item of items) {
    const key = keyFn(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}

export function groupBy<T, K extends string | number>(
  items: T[],
  keyFn: (item: T) => K,
): Record<K, T[]> {
  return items.reduce(
    (acc, item) => {
      const key = keyFn(item);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<K, T[]>,
  );
}

export function pickDefined<T extends Record<string, unknown>>(
  input: T,
): Partial<T> {
  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined) {
      (result as Record<string, unknown>)[key] = value;
    }
  }
  return result;
}

export function ensureUuidFormat(value: string): UUID {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(value)) {
    throw new Error(`Invalid UUID: ${value}`);
  }
  return value as UUID;
}

export function calculateAge(dateOfBirth: Date, asOf: Date = new Date()): number {
  let age = asOf.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = asOf.getMonth() - dateOfBirth.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && asOf.getDate() < dateOfBirth.getDate())
  ) {
    age -= 1;
  }
  return Math.max(0, age);
}

export function retryWithBackoff<T>(
  operation: () => Promise<T>,
  options: {
    retries?: number;
    baseDelayMs?: number;
    maxDelayMs?: number;
    shouldRetry?: (error: unknown) => boolean;
  } = {},
): Promise<T> {
  const {
    retries = 3,
    baseDelayMs = 100,
    maxDelayMs = 5_000,
    shouldRetry = () => true,
  } = options;

  const attempt = async (remaining: number): Promise<T> => {
    try {
      return await operation();
    } catch (error) {
      if (remaining <= 0 || !shouldRetry(error)) {
        throw error;
      }
      const delay = Math.min(
        maxDelayMs,
        baseDelayMs * 2 ** (retries - remaining),
      );
      await sleep(delay);
      return attempt(remaining - 1);
    }
  };

  return attempt(retries);
}

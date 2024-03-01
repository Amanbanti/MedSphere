/**
 * Generic repository helpers for soft-delete and optimistic concurrency.
 */

export interface SoftDeleteFields {
  deletedAt: Date | null;
}

export interface Versioned {
  version: number;
}

export function notDeleted<T extends SoftDeleteFields>(): { deletedAt: null } {
  return { deletedAt: null };
}

export function softDeleteData(actorId?: string): {
  deletedAt: Date;
  deletedBy?: string;
  version: { increment: number };
} {
  return {
    deletedAt: new Date(),
    ...(actorId ? { deletedBy: actorId } : {}),
    version: { increment: 1 },
  };
}

export function assertVersionMatch(
  current: number,
  expected: number,
  resource = 'record',
): void {
  if (current !== expected) {
    throw new Error(
      `Optimistic lock failure on ${resource}: expected version ${expected}, found ${current}`,
    );
  }
}

export function withUpdatedBy<T extends Record<string, unknown>>(
  data: T,
  actorId?: string,
): T & { updatedBy?: string; version: { increment: number } } {
  return {
    ...data,
    ...(actorId ? { updatedBy: actorId } : {}),
    version: { increment: 1 },
  };
}

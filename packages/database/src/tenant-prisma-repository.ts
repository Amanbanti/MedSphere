/**
 * Tenant-scoped Prisma repository base with soft-delete and optimistic versioning.
 */

import {
  assertVersionMatch,
  notDeleted,
  softDeleteData,
  withUpdatedBy,
} from './base-repository';

export interface TenantScope {
  organizationId: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginatedRows<T> {
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function normalizePagination(params: PaginationParams = {}): {
  page: number;
  pageSize: number;
  skip: number;
  take: number;
} {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, params.pageSize ?? 20));
  return { page, pageSize, skip: (page - 1) * pageSize, take: pageSize };
}

export function buildPaginatedResult<T>(
  items: T[],
  totalItems: number,
  page: number,
  pageSize: number,
): PaginatedRows<T> {
  return {
    items,
    totalItems,
    page,
    pageSize,
    totalPages: Math.ceil(totalItems / pageSize) || 1,
  };
}

export function tenantWhere(scope: TenantScope): { organizationId: string; deletedAt: null } {
  return { organizationId: scope.organizationId, ...notDeleted() };
}

export function prepareSoftDelete(actorId?: string) {
  return softDeleteData(actorId);
}

export function prepareUpdate<T extends Record<string, unknown>>(data: T, actorId?: string) {
  return withUpdatedBy(data, actorId);
}

export function checkVersion(current: number, expected: number, resource: string): void {
  assertVersionMatch(current, expected, resource);
}

export type PrismaDelegate = {
  findFirst?: (args: unknown) => Promise<unknown>;
  findMany?: (args: unknown) => Promise<unknown[]>;
  count?: (args: unknown) => Promise<number>;
  create?: (args: unknown) => Promise<unknown>;
  update?: (args: unknown) => Promise<unknown>;
  upsert?: (args: unknown) => Promise<unknown>;
};

export async function tenantFindById<T>(
  delegate: PrismaDelegate | undefined,
  scope: TenantScope,
  id: string,
): Promise<T | null> {
  if (!delegate?.findFirst) return null;
  const row = await delegate.findFirst({
    where: { id, ...tenantWhere(scope) },
  });
  return (row as T) ?? null;
}

export async function tenantList<T>(
  delegate: PrismaDelegate | undefined,
  scope: TenantScope,
  pagination: PaginationParams = {},
  extraWhere: Record<string, unknown> = {},
): Promise<PaginatedRows<T>> {
  if (!delegate?.findMany || !delegate?.count) {
    return buildPaginatedResult([], 0, 1, 20);
  }
  const { page, pageSize, skip, take } = normalizePagination(pagination);
  const where = { ...tenantWhere(scope), ...extraWhere };
  const [rows, totalItems] = await Promise.all([
    delegate.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } }),
    delegate.count({ where }),
  ]);
  return buildPaginatedResult(rows as T[], totalItems, page, pageSize);
}

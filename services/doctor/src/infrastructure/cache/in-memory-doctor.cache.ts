import { Injectable } from '@nestjs/common';
import type { ListQuery, PaginatedResult, UUID } from '@medsphere/shared';
import type { Doctor } from '../../domain/entities/doctor.entity';

export interface DoctorCacheAdapter {
  getListKey(organizationId: UUID, query: ListQuery): string;
  get(organizationId: UUID, id: UUID): Promise<Doctor | null>;
  set(organizationId: UUID, entity: Doctor, ttlSeconds?: number): Promise<void>;
  getList(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<Doctor> | null>;
  setList(organizationId: UUID, query: ListQuery, result: PaginatedResult<Doctor>, ttlSeconds?: number): Promise<void>;
  invalidate(organizationId: UUID, id?: UUID): Promise<void>;
}

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

@Injectable()
export class InMemoryDoctorCacheAdapter implements DoctorCacheAdapter {
  private readonly store = new Map<string, CacheEntry<unknown>>();
  private readonly defaultTtlMs = 60_000;

  getListKey(organizationId: UUID, query: ListQuery): string {
    return `list:${organizationId}:${JSON.stringify(query)}`;
  }

  async get(organizationId: UUID, id: UUID): Promise<Doctor | null> {
    const entry = this.store.get(`entity:${organizationId}:${id}`) as CacheEntry<Doctor> | undefined;
    if (!entry || entry.expiresAt < Date.now()) return null;
    return entry.value;
  }

  async set(organizationId: UUID, entity: Doctor, ttlSeconds = 60): Promise<void> {
    this.store.set(`entity:${organizationId}:${entity.id}`, {
      value: entity,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  async getList(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<Doctor> | null> {
    const entry = this.store.get(this.getListKey(organizationId, query)) as CacheEntry<PaginatedResult<Doctor>> | undefined;
    if (!entry || entry.expiresAt < Date.now()) return null;
    return entry.value;
  }

  async setList(organizationId: UUID, query: ListQuery, result: PaginatedResult<Doctor>, ttlSeconds = 30): Promise<void> {
    this.store.set(this.getListKey(organizationId, query), {
      value: result,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  async invalidate(organizationId: UUID, id?: UUID): Promise<void> {
    if (id) this.store.delete(`entity:${organizationId}:${id}`);
    for (const key of this.store.keys()) {
      if (key.startsWith(`list:${organizationId}:`)) this.store.delete(key);
    }
  }
}

@Injectable()
export class RedisDoctorCacheAdapter extends InMemoryDoctorCacheAdapter {
  constructor(private readonly redisUrl?: string) {
    super();
  }

  override async get(organizationId: UUID, id: UUID): Promise<Doctor | null> {
    if (!this.redisUrl) return super.get(organizationId, id);
    return super.get(organizationId, id);
  }
}

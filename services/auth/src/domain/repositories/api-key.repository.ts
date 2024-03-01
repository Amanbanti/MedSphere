import type { ISODateString, UUID } from '@medsphere/shared';

export interface ApiKeyRecord {
  id: UUID;
  organizationId: UUID;
  userId: UUID;
  name: string;
  keyPrefix: string;
  keyHash: string;
  scopes: string[];
  expiresAt: ISODateString | null;
  lastUsedAt: ISODateString | null;
  revokedAt: ISODateString | null;
  createdAt: ISODateString;
}

export interface ApiKeyRepository {
  save(record: ApiKeyRecord): Promise<void>;
  findByPrefix(keyPrefix: string): Promise<ApiKeyRecord | null>;
  revoke(id: UUID, now: ISODateString): Promise<void>;
  listByUserId(userId: UUID): Promise<ApiKeyRecord[]>;
}

export const API_KEY_REPOSITORY = Symbol('API_KEY_REPOSITORY');

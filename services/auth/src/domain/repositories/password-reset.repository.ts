import type { ISODateString, UUID } from '@medsphere/shared';

export interface PasswordResetTokenRecord {
  id: UUID;
  userId: UUID;
  tokenHash: string;
  expiresAt: ISODateString;
  usedAt: ISODateString | null;
}

export interface PasswordResetRepository {
  create(userId: UUID, tokenHash: string, expiresAt: ISODateString): Promise<void>;
  findByTokenHash(tokenHash: string): Promise<PasswordResetTokenRecord | null>;
  markUsed(id: UUID, now: ISODateString): Promise<void>;
  invalidateAllForUser(userId: UUID): Promise<void>;
}

export const PASSWORD_RESET_REPOSITORY = Symbol('PASSWORD_RESET_REPOSITORY');

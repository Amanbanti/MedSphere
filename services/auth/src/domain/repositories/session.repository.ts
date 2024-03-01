import type { UUID } from '@medsphere/shared';
import type { Session } from '../entities/session.entity';

export interface SessionRepository {
  findById(id: UUID): Promise<Session | null>;
  findByTokenFamily(tokenFamily: UUID): Promise<Session[]>;
  findActiveByUserId(userId: UUID): Promise<Session[]>;
  save(session: Session): Promise<void>;
  revokeAllForUser(userId: UUID, reason: string, now: string): Promise<number>;
}

export const SESSION_REPOSITORY = Symbol('SESSION_REPOSITORY');

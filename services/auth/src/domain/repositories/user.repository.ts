import type { UUID } from '@medsphere/shared';
import type { User } from '../entities/user.entity';
import type { Email } from '../value-objects/email.vo';

export interface UserRepository {
  findById(id: UUID): Promise<User | null>;
  findByEmail(organizationId: UUID, email: Email): Promise<User | null>;
  findByEmailGlobal(email: Email): Promise<User | null>;
  save(user: User): Promise<void>;
  existsByEmail(organizationId: UUID, email: Email): Promise<boolean>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

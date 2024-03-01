import type { UserDto } from '@medsphere/shared';
import { toIso } from '@medsphere/shared';
import type { User } from '../../domain/entities/user.entity';

export class UserMapper {
  static toDto(user: User): UserDto {
    const props = user.toProps();
    return {
      id: user.id,
      email: props.email.normalized,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      status: user.status,
      organizationId: user.organizationId,
      phone: user.phone ?? undefined,
      mfaEnabled: user.mfaEnabled,
      emailVerified: user.emailVerifiedAt !== null,
      lastLoginAt: user.lastLoginAt ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toIso(date: Date): string {
    return toIso(date);
  }
}

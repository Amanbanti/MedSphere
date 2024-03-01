import { Injectable } from '@nestjs/common';
import { notDeleted, withUpdatedBy } from '@medsphere/database';
import type { UUID } from '@medsphere/shared';
import { toIso } from '@medsphere/shared';
import { User } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import type { UserRepository } from '../../domain/repositories/user.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: UUID): Promise<User | null> {
    const row = await this.prisma.client.user.findFirst({
      where: { id, ...notDeleted() },
    });
    return row ? this.toDomain(row) : null;
  }

  async findByEmail(organizationId: UUID, email: Email): Promise<User | null> {
    const row = await this.prisma.client.user.findFirst({
      where: {
        organizationId,
        emailNormalized: email.normalized,
        ...notDeleted(),
      },
    });
    return row ? this.toDomain(row) : null;
  }

  async findByEmailGlobal(email: Email): Promise<User | null> {
    const row = await this.prisma.client.user.findFirst({
      where: {
        emailNormalized: email.normalized,
        ...notDeleted(),
      },
    });
    return row ? this.toDomain(row) : null;
  }

  async existsByEmail(organizationId: UUID, email: Email): Promise<boolean> {
    const count = await this.prisma.client.user.count({
      where: {
        organizationId,
        emailNormalized: email.normalized,
        ...notDeleted(),
      },
    });
    return count > 0;
  }

  async save(user: User): Promise<void> {
    const props = user.toProps();
    await this.prisma.client.user.upsert({
      where: { id: user.id },
      create: {
        id: user.id,
        organizationId: user.organizationId,
        email: props.email.normalized,
        emailNormalized: props.email.normalized,
        passwordHash: props.passwordHash,
        firstName: props.firstName,
        lastName: props.lastName,
        displayName: props.displayName,
        phone: props.phone,
        status: props.status,
        emailVerifiedAt: props.emailVerifiedAt
          ? new Date(props.emailVerifiedAt)
          : null,
        mfaEnabled: props.mfaEnabled,
        failedLoginCount: props.failedLoginCount,
        lockedUntil: props.lockedUntil ? new Date(props.lockedUntil) : null,
        lastLoginAt: props.lastLoginAt ? new Date(props.lastLoginAt) : null,
        passwordChangedAt: props.passwordChangedAt
          ? new Date(props.passwordChangedAt)
          : null,
        version: props.version,
      },
      update: withUpdatedBy(
        {
          email: props.email.normalized,
          emailNormalized: props.email.normalized,
          passwordHash: props.passwordHash,
          firstName: props.firstName,
          lastName: props.lastName,
          displayName: props.displayName,
          phone: props.phone,
          status: props.status,
          emailVerifiedAt: props.emailVerifiedAt
            ? new Date(props.emailVerifiedAt)
            : null,
          mfaEnabled: props.mfaEnabled,
          failedLoginCount: props.failedLoginCount,
          lockedUntil: props.lockedUntil ? new Date(props.lockedUntil) : null,
          lastLoginAt: props.lastLoginAt ? new Date(props.lastLoginAt) : null,
          passwordChangedAt: props.passwordChangedAt
            ? new Date(props.passwordChangedAt)
            : null,
        },
        user.id,
      ),
    });
  }

  private toDomain(row: {
    id: string;
    organizationId: string;
    email: string;
    passwordHash: string | null;
    firstName: string;
    lastName: string;
    displayName: string;
    phone: string | null;
    status: import('@prisma/client').UserStatus;
    emailVerifiedAt: Date | null;
    mfaEnabled: boolean;
    failedLoginCount: number;
    lockedUntil: Date | null;
    lastLoginAt: Date | null;
    passwordChangedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    version: number;
  }): User {
    return User.create({
      id: row.id as UUID,
      organizationId: row.organizationId as UUID,
      email: Email.create(row.email),
      passwordHash: row.passwordHash,
      firstName: row.firstName,
      lastName: row.lastName,
      displayName: row.displayName,
      phone: row.phone,
      status: row.status as import('@medsphere/shared').UserStatus,
      emailVerifiedAt: row.emailVerifiedAt
        ? (toIso(row.emailVerifiedAt) as import('@medsphere/shared').ISODateString)
        : null,
      mfaEnabled: row.mfaEnabled,
      failedLoginCount: row.failedLoginCount,
      lockedUntil: row.lockedUntil
        ? (toIso(row.lockedUntil) as import('@medsphere/shared').ISODateString)
        : null,
      lastLoginAt: row.lastLoginAt
        ? (toIso(row.lastLoginAt) as import('@medsphere/shared').ISODateString)
        : null,
      passwordChangedAt: row.passwordChangedAt
        ? (toIso(row.passwordChangedAt) as import('@medsphere/shared').ISODateString)
        : null,
      createdAt: toIso(row.createdAt) as import('@medsphere/shared').ISODateString,
      updatedAt: toIso(row.updatedAt) as import('@medsphere/shared').ISODateString,
      deletedAt: row.deletedAt
        ? (toIso(row.deletedAt) as import('@medsphere/shared').ISODateString)
        : null,
      version: row.version,
    });
  }
}

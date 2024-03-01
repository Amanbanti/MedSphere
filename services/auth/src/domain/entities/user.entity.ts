import {
  ACCOUNT_LOCKOUT_MINUTES,
  MAX_FAILED_LOGIN_ATTEMPTS,
} from '@medsphere/shared';
import type { ISODateString, UUID } from '@medsphere/shared';
import { UserStatus } from '@medsphere/shared';
import { AccountInactiveError, AccountLockedError } from '../errors/auth.errors';
import type { Email } from '../value-objects/email.vo';

export interface UserProps {
  id: UUID;
  organizationId: UUID;
  email: Email;
  passwordHash: string | null;
  firstName: string;
  lastName: string;
  displayName: string;
  phone: string | null;
  status: UserStatus;
  emailVerifiedAt: ISODateString | null;
  mfaEnabled: boolean;
  failedLoginCount: number;
  lockedUntil: ISODateString | null;
  lastLoginAt: ISODateString | null;
  passwordChangedAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class User {
  private readonly props: UserProps;
  private readonly domainEvents: unknown[] = [];

  private constructor(props: UserProps) {
    this.props = { ...props };
  }

  static create(props: UserProps): User {
    return new User(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    email: Email;
    passwordHash: string;
    firstName: string;
    lastName: string;
    phone?: string;
    now: ISODateString;
  }): User {
    const displayName = `${input.firstName} ${input.lastName}`.trim();
    return new User({
      id: input.id,
      organizationId: input.organizationId,
      email: input.email,
      passwordHash: input.passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
      displayName,
      phone: input.phone ?? null,
      status: UserStatus.PENDING_VERIFICATION,
      emailVerifiedAt: null,
      mfaEnabled: false,
      failedLoginCount: 0,
      lockedUntil: null,
      lastLoginAt: null,
      passwordChangedAt: input.now,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get id(): UUID {
    return this.props.id;
  }

  get organizationId(): UUID {
    return this.props.organizationId;
  }

  get email(): Email {
    return this.props.email;
  }

  get passwordHash(): string | null {
    return this.props.passwordHash;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get displayName(): string {
    return this.props.displayName;
  }

  get phone(): string | null {
    return this.props.phone;
  }

  get status(): UserStatus {
    return this.props.status;
  }

  get emailVerifiedAt(): ISODateString | null {
    return this.props.emailVerifiedAt;
  }

  get mfaEnabled(): boolean {
    return this.props.mfaEnabled;
  }

  get failedLoginCount(): number {
    return this.props.failedLoginCount;
  }

  get lockedUntil(): ISODateString | null {
    return this.props.lockedUntil;
  }

  get lastLoginAt(): ISODateString | null {
    return this.props.lastLoginAt;
  }

  get passwordChangedAt(): ISODateString | null {
    return this.props.passwordChangedAt;
  }

  get createdAt(): ISODateString {
    return this.props.createdAt;
  }

  get updatedAt(): ISODateString {
    return this.props.updatedAt;
  }

  get deletedAt(): ISODateString | null {
    return this.props.deletedAt;
  }

  get version(): number {
    return this.props.version;
  }

  isDeleted(): boolean {
    return this.props.deletedAt !== null;
  }

  isLocked(now: Date = new Date()): boolean {
    if (this.props.status === UserStatus.LOCKED) {
      return true;
    }
    if (this.props.lockedUntil) {
      return new Date(this.props.lockedUntil) > now;
    }
    return false;
  }

  assertCanAuthenticate(now: Date = new Date()): void {
    if (this.isDeleted()) {
      throw new AccountInactiveError(this.props.status);
    }
    if (this.isLocked(now)) {
      throw new AccountLockedError(this.props.lockedUntil ?? undefined);
    }
    if (
      this.props.status !== UserStatus.ACTIVE &&
      this.props.status !== UserStatus.PENDING_VERIFICATION
    ) {
      throw new AccountInactiveError(this.props.status);
    }
  }

  recordFailedLogin(now: ISODateString): void {
    const count = this.props.failedLoginCount + 1;
    this.props.failedLoginCount = count;
    this.props.updatedAt = now;

    if (count >= MAX_FAILED_LOGIN_ATTEMPTS) {
      const lockUntil = new Date();
      lockUntil.setMinutes(lockUntil.getMinutes() + ACCOUNT_LOCKOUT_MINUTES);
      this.props.lockedUntil = lockUntil.toISOString() as ISODateString;
      this.props.status = UserStatus.LOCKED;
    }
  }

  recordSuccessfulLogin(now: ISODateString): void {
    this.props.failedLoginCount = 0;
    this.props.lockedUntil = null;
    this.props.lastLoginAt = now;
    this.props.updatedAt = now;
    if (this.props.status === UserStatus.LOCKED) {
      this.props.status = UserStatus.ACTIVE;
    }
  }

  enableMfa(now: ISODateString): void {
    this.props.mfaEnabled = true;
    this.props.updatedAt = now;
  }

  disableMfa(now: ISODateString): void {
    this.props.mfaEnabled = false;
    this.props.updatedAt = now;
  }

  updatePassword(hash: string, now: ISODateString): void {
    this.props.passwordHash = hash;
    this.props.passwordChangedAt = now;
    this.props.updatedAt = now;
    this.props.failedLoginCount = 0;
    this.props.lockedUntil = null;
    if (this.props.status === UserStatus.LOCKED) {
      this.props.status = UserStatus.ACTIVE;
    }
  }

  activate(now: ISODateString): void {
    this.props.status = UserStatus.ACTIVE;
    this.props.emailVerifiedAt = now;
    this.props.updatedAt = now;
  }

  toProps(): UserProps {
    return { ...this.props };
  }
}

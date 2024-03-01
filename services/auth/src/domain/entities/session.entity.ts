import type { ISODateString, UUID } from '@medsphere/shared';
import { SessionExpiredError, TokenRevokedError } from '../errors/auth.errors';

export interface SessionProps {
  id: UUID;
  userId: UUID;
  tokenFamily: UUID;
  refreshTokenHash: string;
  ipAddress: string | null;
  userAgent: string | null;
  mfaVerified: boolean;
  createdAt: ISODateString;
  expiresAt: ISODateString;
  lastSeenAt: ISODateString;
  revokedAt: ISODateString | null;
  revokeReason: string | null;
}

export class Session {
  private readonly props: SessionProps;

  private constructor(props: SessionProps) {
    this.props = { ...props };
  }

  static create(props: SessionProps): Session {
    return new Session(props);
  }

  static open(input: {
    id: UUID;
    userId: UUID;
    tokenFamily: UUID;
    refreshTokenHash: string;
    ipAddress?: string;
    userAgent?: string;
    mfaVerified?: boolean;
    now: ISODateString;
    expiresAt: ISODateString;
  }): Session {
    return new Session({
      id: input.id,
      userId: input.userId,
      tokenFamily: input.tokenFamily,
      refreshTokenHash: input.refreshTokenHash,
      ipAddress: input.ipAddress ?? null,
      userAgent: input.userAgent ?? null,
      mfaVerified: input.mfaVerified ?? false,
      createdAt: input.now,
      expiresAt: input.expiresAt,
      lastSeenAt: input.now,
      revokedAt: null,
      revokeReason: null,
    });
  }

  get id(): UUID {
    return this.props.id;
  }

  get userId(): UUID {
    return this.props.userId;
  }

  get tokenFamily(): UUID {
    return this.props.tokenFamily;
  }

  get refreshTokenHash(): string {
    return this.props.refreshTokenHash;
  }

  get ipAddress(): string | null {
    return this.props.ipAddress;
  }

  get userAgent(): string | null {
    return this.props.userAgent;
  }

  get mfaVerified(): boolean {
    return this.props.mfaVerified;
  }

  get createdAt(): ISODateString {
    return this.props.createdAt;
  }

  get expiresAt(): ISODateString {
    return this.props.expiresAt;
  }

  get lastSeenAt(): ISODateString {
    return this.props.lastSeenAt;
  }

  get revokedAt(): ISODateString | null {
    return this.props.revokedAt;
  }

  get revokeReason(): string | null {
    return this.props.revokeReason;
  }

  isRevoked(): boolean {
    return this.props.revokedAt !== null;
  }

  isExpired(now: Date = new Date()): boolean {
    return new Date(this.props.expiresAt) <= now;
  }

  assertActive(now: Date = new Date()): void {
    if (this.isRevoked()) {
      throw new TokenRevokedError('Session has been revoked');
    }
    if (this.isExpired(now)) {
      throw new SessionExpiredError('Session has expired');
    }
  }

  markMfaVerified(now: ISODateString): void {
    this.props.mfaVerified = true;
    this.props.lastSeenAt = now;
  }

  rotateRefreshToken(newHash: string, now: ISODateString): void {
    this.props.refreshTokenHash = newHash;
    this.props.lastSeenAt = now;
  }

  revoke(reason: string, now: ISODateString): void {
    this.props.revokedAt = now;
    this.props.revokeReason = reason;
  }

  touch(now: ISODateString): void {
    this.props.lastSeenAt = now;
  }

  toProps(): SessionProps {
    return { ...this.props };
  }
}

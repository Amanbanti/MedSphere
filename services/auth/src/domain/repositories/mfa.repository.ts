import type { ISODateString, UUID } from '@medsphere/shared';
import { MfaMethod } from '@medsphere/shared';

export interface MfaEnrollment {
  id: UUID;
  userId: UUID;
  method: MfaMethod;
  secretEncrypted: string | null;
  isPrimary: boolean;
  verifiedAt: ISODateString | null;
  disabledAt: ISODateString | null;
}

export interface MfaChallenge {
  id: UUID;
  userId: UUID;
  method: MfaMethod;
  codeHash: string | null;
  expiresAt: ISODateString;
  consumedAt: ISODateString | null;
  ipAddress: string | null;
}

export interface MfaRepository {
  findActiveByUserId(userId: UUID): Promise<MfaEnrollment[]>;
  findByUserAndMethod(userId: UUID, method: MfaMethod): Promise<MfaEnrollment | null>;
  saveEnrollment(enrollment: MfaEnrollment): Promise<void>;
  saveRecoveryCodes(mfaMethodId: UUID, codeHashes: string[]): Promise<void>;
  consumeRecoveryCode(mfaMethodId: UUID, codeHash: string): Promise<boolean>;
  createChallenge(challenge: MfaChallenge): Promise<void>;
  findChallengeById(id: UUID): Promise<MfaChallenge | null>;
  consumeChallenge(id: UUID, now: ISODateString): Promise<void>;
}

export const MFA_REPOSITORY = Symbol('MFA_REPOSITORY');

import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '@medsphere/shared';
import { ValidationError } from '../errors/auth.errors';

export class PasswordPolicyService {
  validateLength(password: string): void {
    if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH) {
      throw new ValidationError(
        `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters`,
      );
    }
  }

  validateNotReused(newPassword: string, previousHashes: string[], verifyFn: (plain: string, hash: string) => Promise<boolean>): Promise<void> {
    return this.assertNotInHistory(newPassword, previousHashes, verifyFn);
  }

  private async assertNotInHistory(
    newPassword: string,
    previousHashes: string[],
    verifyFn: (plain: string, hash: string) => Promise<boolean>,
  ): Promise<void> {
    for (const hash of previousHashes) {
      if (await verifyFn(newPassword, hash)) {
        throw new ValidationError('Password was recently used and cannot be reused');
      }
    }
  }
}

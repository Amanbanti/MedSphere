import { passwordSchema } from '@medsphere/shared';
import { ValidationError } from '../errors/auth.errors';

export class Password {
  private constructor(private readonly plainText: string) {}

  static create(raw: string): Password {
    const parsed = passwordSchema.safeParse(raw);
    if (!parsed.success) {
      throw new ValidationError('Password does not meet policy requirements', {
        issues: parsed.error.issues,
      });
    }
    return new Password(parsed.data);
  }

  static fromTrusted(raw: string): Password {
    return new Password(raw);
  }

  get value(): string {
    return this.plainText;
  }
}

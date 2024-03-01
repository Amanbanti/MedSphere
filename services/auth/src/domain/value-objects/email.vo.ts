import { emailSchema } from '@medsphere/shared';
import { ValidationError } from '../errors/auth.errors';

export class Email {
  private constructor(private readonly value: string) {}

  static create(raw: string): Email {
    const parsed = emailSchema.safeParse(raw);
    if (!parsed.success) {
      throw new ValidationError('Invalid email address', {
        issues: parsed.error.issues,
      });
    }
    return new Email(parsed.data);
  }

  get normalized(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}

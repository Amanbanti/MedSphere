/**
 * MedSphere test factory for User — synthetic development data builder.
 */
import type { UUID } from '../../types';

export interface UserFactoryData {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  mfaEnabled: boolean;
  lastLoginAt: string;
  id: UUID;
  organizationId: UUID;
  createdAt: string;
  updatedAt: string;
}

export class UserFactory {
  private data: Partial<UserFactoryData> = {
    id: '00000000-0000-4000-8000-0004000001' as UUID,
    organizationId: '00000000-0000-4000-8000-000000000001' as UUID,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    email: 'email sample',
    firstName: 'firstName sample',
    lastName: 'lastName sample',
    role: 'role sample',
    status: 'active',
    mfaEnabled: true,
    lastLoginAt: '2025-01-15T10:00:00.000Z',
  };

  withEmail(value: string): this {
    this.data.email = value;
    return this;
  }

  withFirstName(value: string): this {
    this.data.firstName = value;
    return this;
  }

  withLastName(value: string): this {
    this.data.lastName = value;
    return this;
  }

  withRole(value: string): this {
    this.data.role = value;
    return this;
  }

  withStatus(value: string): this {
    this.data.status = value;
    return this;
  }

  withMfaEnabled(value: boolean): this {
    this.data.mfaEnabled = value;
    return this;
  }

  withLastLoginAt(value: string): this {
    this.data.lastLoginAt = value;
    return this;
  }

  build(): UserFactoryData {
    return this.data as UserFactoryData;
  }

  buildMany(count: number): UserFactoryData[] {
    return Array.from({ length: count }, (_, i) =>
      new UserFactory()
        .withEmail(`${this.data.email}-${i}`)
                .withFirstName(`${this.data.firstName}-${i}`)
        .build(),
    );
  }

  clone(): UserFactory {
    const copy = new UserFactory();
    copy.data = { ...this.data };
    return copy;
  }

  toJSON(): string {
    return JSON.stringify(this.build(), null, 2);
  }
}

export const userFactoryPresets = {
  preset0(): UserFactory {
    return new UserFactory().withEmail('preset-0');
  }

  preset1(): UserFactory {
    return new UserFactory().withEmail('preset-1');
  }

  preset2(): UserFactory {
    return new UserFactory().withEmail('preset-2');
  }

  preset3(): UserFactory {
    return new UserFactory().withEmail('preset-3');
  }

  preset4(): UserFactory {
    return new UserFactory().withEmail('preset-4');
  }

  preset5(): UserFactory {
    return new UserFactory().withEmail('preset-5');
  }

  preset6(): UserFactory {
    return new UserFactory().withEmail('preset-6');
  }

  preset7(): UserFactory {
    return new UserFactory().withEmail('preset-7');
  }

  preset8(): UserFactory {
    return new UserFactory().withEmail('preset-8');
  }

  preset9(): UserFactory {
    return new UserFactory().withEmail('preset-9');
  }

  preset10(): UserFactory {
    return new UserFactory().withEmail('preset-10');
  }

  preset11(): UserFactory {
    return new UserFactory().withEmail('preset-11');
  }

  preset12(): UserFactory {
    return new UserFactory().withEmail('preset-12');
  }

  preset13(): UserFactory {
    return new UserFactory().withEmail('preset-13');
  }

  preset14(): UserFactory {
    return new UserFactory().withEmail('preset-14');
  }

  preset15(): UserFactory {
    return new UserFactory().withEmail('preset-15');
  }

  preset16(): UserFactory {
    return new UserFactory().withEmail('preset-16');
  }

  preset17(): UserFactory {
    return new UserFactory().withEmail('preset-17');
  }

  preset18(): UserFactory {
    return new UserFactory().withEmail('preset-18');
  }

  preset19(): UserFactory {
    return new UserFactory().withEmail('preset-19');
  }

  preset20(): UserFactory {
    return new UserFactory().withEmail('preset-20');
  }

  preset21(): UserFactory {
    return new UserFactory().withEmail('preset-21');
  }

  preset22(): UserFactory {
    return new UserFactory().withEmail('preset-22');
  }

  preset23(): UserFactory {
    return new UserFactory().withEmail('preset-23');
  }

  preset24(): UserFactory {
    return new UserFactory().withEmail('preset-24');
  }
};

export function createRandomUser(seed: number): UserFactoryData {
  const factory = new UserFactory();
  factory.withEmail(`seed-${seed}`);
  return factory.build();
}

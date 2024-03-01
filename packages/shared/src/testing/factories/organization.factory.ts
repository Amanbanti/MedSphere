/**
 * MedSphere test factory for Organization — synthetic development data builder.
 */
import type { UUID } from '../../types';

export interface OrganizationFactoryData {
  name: string;
  taxId: string;
  npi: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  timezone: string;
  id: UUID;
  organizationId: UUID;
  createdAt: string;
  updatedAt: string;
}

export class OrganizationFactory {
  private data: Partial<OrganizationFactoryData> = {
    id: '00000000-0000-4000-8000-0012000001' as UUID,
    organizationId: '00000000-0000-4000-8000-000000000001' as UUID,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    name: 'name sample',
    taxId: 'organization-taxId-001' as UUID,
    npi: 'npi sample',
    addressLine1: 'addressLine1 sample',
    city: 'city sample',
    state: 'state sample',
    postalCode: 'postalCode sample',
    timezone: 'timezone sample',
  };

  withName(value: string): this {
    this.data.name = value;
    return this;
  }

  withTaxId(value: string): this {
    this.data.taxId = value;
    return this;
  }

  withNpi(value: string): this {
    this.data.npi = value;
    return this;
  }

  withAddressLine1(value: string): this {
    this.data.addressLine1 = value;
    return this;
  }

  withCity(value: string): this {
    this.data.city = value;
    return this;
  }

  withState(value: string): this {
    this.data.state = value;
    return this;
  }

  withPostalCode(value: string): this {
    this.data.postalCode = value;
    return this;
  }

  withTimezone(value: string): this {
    this.data.timezone = value;
    return this;
  }

  build(): OrganizationFactoryData {
    return this.data as OrganizationFactoryData;
  }

  buildMany(count: number): OrganizationFactoryData[] {
    return Array.from({ length: count }, (_, i) =>
      new OrganizationFactory()
        .withName(`${this.data.name}-${i}`)
                .withTaxId(`${this.data.taxId}-${i}`)
        .build(),
    );
  }

  clone(): OrganizationFactory {
    const copy = new OrganizationFactory();
    copy.data = { ...this.data };
    return copy;
  }

  toJSON(): string {
    return JSON.stringify(this.build(), null, 2);
  }
}

export const organizationFactoryPresets = {
  preset0(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-0');
  }

  preset1(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-1');
  }

  preset2(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-2');
  }

  preset3(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-3');
  }

  preset4(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-4');
  }

  preset5(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-5');
  }

  preset6(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-6');
  }

  preset7(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-7');
  }

  preset8(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-8');
  }

  preset9(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-9');
  }

  preset10(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-10');
  }

  preset11(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-11');
  }

  preset12(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-12');
  }

  preset13(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-13');
  }

  preset14(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-14');
  }

  preset15(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-15');
  }

  preset16(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-16');
  }

  preset17(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-17');
  }

  preset18(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-18');
  }

  preset19(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-19');
  }

  preset20(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-20');
  }

  preset21(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-21');
  }

  preset22(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-22');
  }

  preset23(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-23');
  }

  preset24(): OrganizationFactory {
    return new OrganizationFactory().withName('preset-24');
  }
};

export function createRandomOrganization(seed: number): OrganizationFactoryData {
  const factory = new OrganizationFactory();
  factory.withName(`seed-${seed}`);
  return factory.build();
}

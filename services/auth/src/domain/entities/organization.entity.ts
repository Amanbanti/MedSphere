import type { ISODateString, UUID } from '@medsphere/shared';
import { OrganizationType } from '@medsphere/shared';
import { NotFoundError } from '../errors/auth.errors';

export interface OrganizationProps {
  id: UUID;
  name: string;
  slug: string;
  type: OrganizationType;
  isActive: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class Organization {
  private readonly props: OrganizationProps;

  private constructor(props: OrganizationProps) {
    this.props = { ...props };
  }

  static create(props: OrganizationProps): Organization {
    return new Organization(props);
  }

  get id(): UUID {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get slug(): string {
    return this.props.slug;
  }

  get type(): OrganizationType {
    return this.props.type;
  }

  get isActive(): boolean {
    return this.props.isActive;
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

  assertActive(): void {
    if (this.isDeleted() || !this.props.isActive) {
      throw new NotFoundError('Organization not found or inactive');
    }
  }

  toProps(): OrganizationProps {
    return { ...this.props };
  }
}

import type { UUID } from '@medsphere/shared';
import type { Organization } from '../entities/organization.entity';

export interface OrganizationRepository {
  findById(id: UUID): Promise<Organization | null>;
  findBySlug(slug: string): Promise<Organization | null>;
}

export const ORGANIZATION_REPOSITORY = Symbol('ORGANIZATION_REPOSITORY');

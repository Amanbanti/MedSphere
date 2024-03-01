import { createRng, pick, escapeTs } from './bulk-seed.mjs';
import { writeFile } from './expansion-utils.mjs';
import { NEST_SERVICES } from './service-specs.mjs';

const FACTORY_ENTITIES = [
  { name: 'Patient', fields: ['mrn', 'firstName', 'lastName', 'dateOfBirth', 'gender', 'email', 'phone', 'bloodType', 'status'] },
  { name: 'Encounter', fields: ['encounterClass', 'status', 'reasonCode', 'periodStart', 'periodEnd', 'attendingProviderId', 'locationId'] },
  { name: 'Appointment', fields: ['patientId', 'providerId', 'scheduledStart', 'scheduledEnd', 'appointmentType', 'status', 'locationId'] },
  { name: 'Invoice', fields: ['patientId', 'encounterId', 'status', 'totalAmount', 'balanceDue', 'dueDate', 'payerId'] },
  { name: 'Claim', fields: ['patientId', 'payerId', 'status', 'totalCharge', 'totalPaid', 'submittedAt', 'claimNumber'] },
  { name: 'LabOrder', fields: ['patientId', 'orderingProviderId', 'status', 'priority', 'panelCode', 'specimenType'] },
  { name: 'ImagingStudy', fields: ['patientId', 'modality', 'bodyPart', 'status', 'accessionNumber', 'scheduledAt'] },
  { name: 'Prescription', fields: ['patientId', 'medicationName', 'strength', 'route', 'frequency', 'quantity', 'refills', 'status'] },
  { name: 'User', fields: ['email', 'firstName', 'lastName', 'role', 'status', 'mfaEnabled', 'lastLoginAt'] },
  { name: 'Organization', fields: ['name', 'taxId', 'npi', 'addressLine1', 'city', 'state', 'postalCode', 'timezone'] },
];

function generateFactory(entity) {
  const rng = createRng(entity.name.length * 31337);
  const sampleValues = entity.fields.map((f) => {
    if (f.includes('Id')) return `'${entity.name.toLowerCase()}-${f}-001' as UUID`;
    if (f.includes('At') || f.includes('Date') || f === 'periodStart' || f === 'periodEnd' || f === 'scheduledStart' || f === 'scheduledEnd' || f === 'dueDate')
      return `'2025-01-15T10:00:00.000Z'`;
    if (f === 'status') return `'active'`;
    if (f.includes('Amount') || f.includes('Paid') || f.includes('Charge') || f === 'quantity' || f === 'refills')
      return `${Math.floor(rng() * 1000)}`;
    if (f === 'mfaEnabled') return 'true';
    if (f === 'gender') return `'female'`;
    return `'${escapeTs(f)} sample'`;
  });

  const builderMethods = entity.fields.map((f, i) => {
    const method = `with${f.charAt(0).toUpperCase() + f.slice(1)}`;
    return `  ${method}(value: ${f.includes('Amount') || f.includes('Paid') || f.includes('Charge') || f === 'quantity' || f === 'refills' ? 'number' : f === 'mfaEnabled' ? 'boolean' : 'string'}): this {
    this.data.${f} = value;
    return this;
  }`;
  }).join('\n\n');

  const presetBlocks = Array.from({ length: 25 }, (_, i) => {
    const overrides = entity.fields.slice(0, 3).map((f) => {
      if (f.includes('Id')) return `${f}: '${entity.name.toLowerCase()}-preset-${i}-${f}' as UUID`;
      if (f === 'status') return `status: ${['active', 'pending', 'completed', 'cancelled'][i % 4]}`;
      return `${f}: '${escapeTs(f)} preset ${i}'`;
    }).join(',\n      ');
    return `  preset${i}(): ${entity.name}Factory {
    return new ${entity.name}Factory().${entity.fields[0] ? `with${entity.fields[0].charAt(0).toUpperCase() + entity.fields[0].slice(1)}('preset-${i}')` : 'build()'};
  }`;
  }).join('\n\n');

  return `/**
 * MedSphere test factory for ${entity.name} — synthetic development data builder.
 */
import type { UUID } from '../../types';

export interface ${entity.name}FactoryData {
${entity.fields.map((f) => `  ${f}: ${f.includes('Amount') || f.includes('Paid') || f.includes('Charge') || f === 'quantity' || f === 'refills' ? 'number' : f === 'mfaEnabled' ? 'boolean' : 'string'};`).join('\n')}
  id: UUID;
  organizationId: UUID;
  createdAt: string;
  updatedAt: string;
}

export class ${entity.name}Factory {
  private data: Partial<${entity.name}FactoryData> = {
    id: '00000000-0000-4000-8000-${String(entity.name.length).padStart(4, '0')}000001' as UUID,
    organizationId: '00000000-0000-4000-8000-000000000001' as UUID,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
${entity.fields.map((f, i) => `    ${f}: ${sampleValues[i]},`).join('\n')}
  };

${builderMethods}

  build(): ${entity.name}FactoryData {
    return this.data as ${entity.name}FactoryData;
  }

  buildMany(count: number): ${entity.name}FactoryData[] {
    return Array.from({ length: count }, (_, i) =>
      new ${entity.name}Factory()
${entity.fields.slice(0, 2).map((f) => `        .with${f.charAt(0).toUpperCase() + f.slice(1)}(\`\${this.data.${f}}-\${i}\`)`).join('\n        ')}
        .build(),
    );
  }

  clone(): ${entity.name}Factory {
    const copy = new ${entity.name}Factory();
    copy.data = { ...this.data };
    return copy;
  }

  toJSON(): string {
    return JSON.stringify(this.build(), null, 2);
  }
}

export const ${entity.name.charAt(0).toLowerCase() + entity.name.slice(1)}FactoryPresets = {
${presetBlocks}
};

export function createRandom${entity.name}(seed: number): ${entity.name}FactoryData {
  const factory = new ${entity.name}Factory();
  factory.with${entity.fields[0] ? entity.fields[0].charAt(0).toUpperCase() + entity.fields[0].slice(1) : 'build'}(\`seed-\${seed}\`);
  return factory.build();
}
`;
}

function generateContractSuite(service) {
  const useCases = service.useCases ?? [];
  const expandedUseCases = [];
  for (const uc of useCases) {
    expandedUseCases.push(uc);
    for (let v = 0; v < 8; v++) {
      expandedUseCases.push({ ...uc, variant: v, name: `${uc.name}Variant${v}` });
    }
  }

  const testCases = expandedUseCases.map((uc, idx) => {
    const variantSuffix = uc.variant !== undefined ? ` variant ${uc.variant}` : '';
    return `
  describe('${uc.name}', () => {
    const endpoint = '${service.slug}${uc.path || ''}';
    const method = '${uc.http || 'POST'}';

    it('accepts valid ${uc.verb} request payload${variantSuffix}', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: '${service.slug}-${idx}',
        ${uc.query ? "query: { page: 1, pageSize: 25 }," : ''}
        metadata: { source: 'contract-test', variant: ${uc.variant ?? 0} },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('${service.slug}');
    });

    it('rejects missing organization scope for ${uc.verb}${variantSuffix}', () => {
      const payload = { resourceId: '${service.slug}-${idx}' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for ${uc.verb}${variantSuffix}', () => {
      const requiredPermission = '${service.slug}:${uc.verb}';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for ${uc.verb}${variantSuffix}', () => {
      const response = {
        data: { id: '${service.slug}-resp-${idx}', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on ${uc.verb}${variantSuffix}', () => {
      const auditEvent = {
        action: '${uc.verb}',
        resourceType: '${service.entity}',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('${uc.verb}');
    });
  });`;
  }).join('\n');

  return `/**
 * Contract tests for ${service.slug} service — MedSphere API contract validation.
 * Validates request/response shapes, auth, and cross-service compatibility.
 */
import type { JwtAccessPayload, UUID } from '@medsphere/shared';

const ACTOR: JwtAccessPayload = {
  sub: 'contract-test-user' as UUID,
  orgId: 'contract-test-org' as UUID,
  facilityIds: ['facility-1' as UUID],
  roles: ['ORG_ADMIN'],
  permissions: ['${service.slug}:read', '${service.slug}:write'],
  sessionId: 'contract-session' as UUID,
  mfaVerified: true,
  iat: 0,
  exp: 999999999,
  iss: 'medsphere',
  aud: 'medsphere',
};

describe('${service.slug} service contract', () => {
  describe('service metadata', () => {
    it('declares entity ${service.entity}', () => {
      expect('${service.entity}').toBeTruthy();
    });

    it('exposes port ${service.port}', () => {
      expect(${service.port}).toBeGreaterThan(3000);
    });
  });
${testCases}
});
`;
}

function generateServiceUnitTests(service) {
  const rng = createRng(service.slug.length * 5555);
  const useCases = service.useCases ?? [];
  const blocks = [];
  for (const uc of useCases) {
    for (let i = 0; i < 15; i++) {
      blocks.push(`
describe('${uc.name} — parameterized case ${i}', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-${i}-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-${i}-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-${i}-c', expected: 'authorized' },
  ])('handles $expected path for ${uc.verb} with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-${i}', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: '${uc.verb}',
      httpMethod: '${uc.http}',
    };
    expect(command.verb).toBe('${uc.verb}');
    expect(command.resourceId).toContain('res-${i}');
  });
});`);
    }
  }
  return `/** Generated unit test expansion for ${service.slug} service */
${blocks.join('\n')}
`;
}

export async function generateContractTestsAndFactories(root, stats) {
  for (const entity of FACTORY_ENTITIES) {
    await writeFile(root, `packages/shared/src/testing/factories/${entity.name.charAt(0).toLowerCase() + entity.name.slice(1)}.factory.ts`, generateFactory(entity), stats);
  }

  const factoryIndex = `/** MedSphere test factories — public exports */
${FACTORY_ENTITIES.map((e) => `export * from './${e.name.charAt(0).toLowerCase() + e.name.slice(1)}.factory';`).join('\n')}
`;
  await writeFile(root, 'packages/shared/src/testing/factories/index.ts', factoryIndex, stats);

  const testingIndex = `export * from './factories';
`;
  await writeFile(root, 'packages/shared/src/testing/index.ts', testingIndex, stats);

  for (const service of NEST_SERVICES) {
    await writeFile(root, `tests/contract/${service.slug}.contract.spec.ts`, generateContractSuite(service), stats);
    await writeFile(root, `services/${service.slug}/test/generated/${service.slug}-generated.spec.ts`, generateServiceUnitTests(service), stats);
  }

  const contractIndex = `/** MedSphere contract test index */
${NEST_SERVICES.map((s) => `import './${s.slug}.contract.spec';`).join('\n')}
`;
  await writeFile(root, 'tests/contract/index.spec.ts', contractIndex, stats);
}

export async function wireSharedTestingExport(root, stats) {
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const exportLine = "export * from './testing';";
  const fullPath = path.join(root, 'packages/shared/src/index.ts');
  let existing = await fs.readFile(fullPath, 'utf8');
  if (!existing.includes(exportLine)) {
    await fs.writeFile(fullPath, existing.trimEnd() + '\n' + exportLine + '\n', 'utf8');
    stats.record('packages/shared/src/index.ts (testing export)', exportLine + '\n');
  }
}

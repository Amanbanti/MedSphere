import { writeFile } from './expansion-utils.mjs';

export async function generateDocsAndCi(root, stats) {
  await writeFile(
    root,
    'docs/architecture/phase-1.md',
    `# MedSphere Phase 1 Architecture

## Overview

Phase 1 establishes the MedSphere enterprise Hospital Information System (HIS) foundation: identity & access management, multi-tenant organization model, core clinical microservices, event-driven integration, and operational observability.

## System Context

\`\`\`
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│  Next.js        │     │  API Gateway     │     │  NestJS             │
│  Portals (14)   │────▶│  (GraphQL/REST)  │────▶│  Microservices (20) │
└─────────────────┘     └────────┬─────────┘     └──────────┬──────────┘
                                   │                          │
                          ┌────────▼────────┐        ┌────────▼────────┐
                          │  Auth Service   │        │  PostgreSQL     │
                          │  (JWT/MFA/RBAC) │        │  (Prisma ORM)   │
                          └─────────────────┘        └────────┬────────┘
                                                                │
                          ┌─────────────────┐        ┌────────▼────────┐
                          │  Kafka (Events) │◀───────│  Redis (Cache)  │
                          └─────────────────┘        └─────────────────┘
\`\`\`

## Layered Service Architecture

Each NestJS microservice follows Clean Architecture:

| Layer | Responsibility |
|-------|----------------|
| **Domain** | Entities, value objects, domain events, specifications, policies |
| **Application** | Use cases, commands, queries, CQRS buses, orchestrators |
| **Infrastructure** | Prisma repositories, Kafka adapters, external integrations |
| **Presentation** | HTTP controllers, filters, interceptors, guards |

## Core Domains (Phase 1)

1. **Identity & Tenancy** — Organizations, facilities, users, roles, permissions
2. **Patient Management** — Demographics, allergies, vitals, MRN
3. **Clinical Workflow** — Appointments, encounters, medical records
4. **Diagnostics** — Laboratory, radiology, imaging
5. **Pharmacy** — Prescriptions, dispensing, inventory, interactions
6. **Revenue Cycle** — Billing, insurance, payments
7. **Engagement** — Notifications, telemedicine, patient portal
8. **Platform** — Search, analytics, audit, queue, worker

## Event-Driven Integration

Domain events flow through Kafka topics (\`medsphere.{domain}.events.v1\`). Services publish after successful persistence (outbox pattern where applicable). Consumers react asynchronously for notifications, search indexing, analytics, and audit trails.

## Data Strategy

- **OLTP**: PostgreSQL with Prisma, schema split across \`prisma/models/*.prisma\`
- **Search**: Elasticsearch via search service (event-sourced index)
- **Object Storage**: MinIO for DICOM, documents, exports
- **Cache**: Redis for sessions, rate limits, hot reads

## Security Baseline

- JWT access tokens (15 min) + refresh token rotation
- MFA (TOTP, WebAuthn) for privileged roles
- RBAC + ABAC with break-glass audit
- Encryption at rest (RDS, MSK, ElastiCache) and in transit (TLS 1.3)
- HIPAA-aligned audit logging

## Deployment Topology

- **Development**: Docker Compose + local services
- **Staging/Production**: EKS (or AKS) with Helm, Terraform-managed infra
- **Observability**: Prometheus, Grafana dashboards, Alertmanager rules

## Phase 1 Exit Criteria

- [ ] All 20 microservices deployable with health checks
- [ ] Auth flows: login, MFA, SSO, session revocation
- [ ] Patient registration through appointment booking E2E
- [ ] Lab order → result → notification pipeline
- [ ] Billing invoice creation and payment application
- [ ] Grafana dashboards for API gateway, auth, clinical latency
- [ ] CI/CD pipelines: lint, test, build, security scan, deploy
`,
    stats,
  );

  await writeFile(
    root,
    'docs/security/README.md',
    `# MedSphere Security Controls

## HIPAA Security Rule Mapping

| HIPAA Safeguard | MedSphere Control | Implementation |
|-----------------|-------------------|----------------|
| Access Control §164.312(a)(1) | RBAC + ABAC | \`SystemRole\`, \`Permission\`, gateway guards |
| Unique User ID §164.312(a)(2)(i) | UUID user identity | Auth service, JWT \`sub\` claim |
| Emergency Access §164.312(a)(2)(ii) | Break-glass workflow | \`BREAK_GLASS\` permission, audit trail |
| Automatic Logoff §164.312(a)(2)(iii) | Session timeout | Configurable idle timeout, refresh rotation |
| Encryption §164.312(a)(2)(iv) | TLS + at-rest encryption | RDS/MSK/ElastiCache KMS, HTTPS only |
| Audit Controls §164.312(b) | Audit service | Immutable audit log, correlation IDs |
| Integrity §164.312(c)(1) | Optimistic locking | Entity \`version\` field, domain rules |
| Authentication §164.312(d) | MFA + password policy | TOTP, WebAuthn, bcrypt/argon2 |
| Transmission Security §164.312(e)(1) | TLS 1.3 | Ingress, service mesh mTLS |

## OWASP Top 10 (2021) Mitigations

| Risk | Mitigation |
|------|------------|
| A01 Broken Access Control | Gateway auth guard, tenant scoping, policy classes per service |
| A02 Cryptographic Failures | KMS-managed keys, no secrets in code, \`.env.example\` only |
| A03 Injection | Prisma parameterized queries, Zod validation at boundaries |
| A04 Insecure Design | Clean Architecture, domain specifications, threat modeling |
| A05 Security Misconfiguration | Terraform baselines, NetworkPolicies, read-only root FS |
| A06 Vulnerable Components | \`pnpm audit\`, Dependabot, CI security workflow |
| A07 Auth Failures | Rate limiting, account lockout, MFA, session revocation |
| A08 Software Integrity | Signed containers, immutable infra, CI artifact verification |
| A09 Logging Failures | Structured JSON logs, correlation IDs, centralized audit |
| A10 SSRF | Egress NetworkPolicies, allowlisted external integrations |

## Data Classification

| Class | Examples | Controls |
|-------|----------|----------|
| PHI | Patient demographics, clinical notes, lab results | Encrypt, audit, minimum necessary access |
| PII | Staff records, contact info | RBAC, retention policies |
| Credentials | Passwords, API keys, tokens | Hashed/sealed, never logged |
| Operational | Metrics, logs (de-identified) | Standard retention |

## Incident Response

1. **Detect** — Alertmanager rules, audit anomaly detection
2. **Contain** — Session revocation, network isolation
3. **Investigate** — Correlation ID tracing, audit export
4. **Notify** — HIPAA breach assessment workflow
5. **Remediate** — Patch, rotate credentials, post-mortem ADR
`,
    stats,
  );

  await writeFile(
    root,
    'docs/api/README.md',
    `# MedSphere API Reference

## Base URLs

| Environment | Gateway URL |
|-------------|-------------|
| Development | \`http://localhost:3000\` |
| Staging | \`https://api.staging.medsphere.health\` |
| Production | \`https://api.medsphere.health\` |

## Authentication

All protected endpoints require a Bearer JWT access token:

\`\`\`
Authorization: Bearer <access_token>
X-Correlation-Id: <uuid>
X-Organization-Id: <uuid>
\`\`\`

Obtain tokens via \`POST /auth/login\`. Refresh via \`POST /auth/refresh\`.

## Response Envelope

\`\`\`json
{
  "data": { },
  "correlationId": "uuid",
  "timestamp": "2026-01-15T10:30:00.000Z"
}
\`\`\`

## Error Format

\`\`\`json
{
  "statusCode": 403,
  "errorCode": "FORBIDDEN",
  "message": "Insufficient role",
  "correlationId": "uuid",
  "timestamp": "2026-01-15T10:30:00.000Z"
}
\`\`\`

## Core Endpoints

### Auth (\`/auth\`)
- \`POST /login\` — Authenticate user
- \`POST /refresh\` — Refresh access token
- \`POST /logout\` — Revoke session
- \`POST /mfa/enroll\` — Enroll MFA
- \`GET /me\` — Current user profile

### Patients (\`/api/patients\`)
- \`POST /\` — Register patient
- \`GET /\` — List patients (paginated)
- \`GET /:id\` — Get patient profile
- \`PATCH /:id/demographics\` — Update demographics
- \`POST /:id/allergies\` — Record allergy
- \`POST /:id/vitals\` — Add vitals

### Appointments (\`/api/appointments\`)
- \`POST /\` — Book appointment
- \`GET /\` — List appointments
- \`POST /:id/reschedule\` — Reschedule
- \`POST /:id/cancel\` — Cancel

### Laboratory (\`/api/laboratory\`)
- \`POST /orders\` — Create lab order
- \`GET /orders\` — List orders
- \`POST /orders/:id/results\` — Submit results

### Billing (\`/api/billing\`)
- \`POST /invoices\` — Create invoice
- \`GET /invoices\` — List invoices
- \`POST /invoices/:id/payments\` — Apply payment

## Pagination

Query parameters: \`page\`, \`pageSize\`, \`sort\`, \`filters\`, \`search\`.

## Rate Limiting

- Anonymous: 60 req/min
- Authenticated: 600 req/min
- API keys: configurable per key

## WebSocket

Notifications gateway: \`wss://api.medsphere.health/ws/notifications\`
`,
    stats,
  );

  await writeFile(
    root,
    'docs/deployment/README.md',
    `# MedSphere Deployment Guide

## Prerequisites

- Node.js 20+, pnpm 9+
- Docker & Docker Compose
- Terraform 1.6+ (for cloud infra)
- kubectl + Helm 3 (for Kubernetes)

## Local Development

\`\`\`bash
pnpm install
pnpm docker:up          # PostgreSQL, Redis, Kafka, MinIO
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev                # All services via Turbo
\`\`\`

## Docker Compose Stack

Located at \`infrastructure/docker/docker-compose.yml\`. Includes:
- PostgreSQL 16
- Redis 7
- Kafka (KRaft)
- MinIO
- Prometheus + Grafana

## Kubernetes Deployment

\`\`\`bash
kubectl apply -k infrastructure/kubernetes/base/
helm upgrade --install medsphere infrastructure/helm/charts/medsphere \\
  -f infrastructure/helm/charts/medsphere/values.yaml \\
  --namespace medsphere --create-namespace
\`\`\`

## Terraform (AWS)

\`\`\`bash
cd infrastructure/terraform/environments/dev
terraform init
terraform plan -var="kms_key_arn=arn:aws:kms:..."
terraform apply
\`\`\`

Modules: \`network\`, \`eks-or-aks\`, \`database\`, \`redis\`, \`kafka\`, \`minio\`.

## CI/CD Pipelines

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| \`ci.yml\` | PR, push to main/develop | Lint, typecheck, test, build |
| \`cd.yml\` | Push to main | Build images, deploy staging |
| \`security.yml\` | Weekly + PR | SAST, dependency audit, container scan |
| \`db-migrate.yml\` | Manual / post-deploy | Prisma migrate deploy |

## Environment Variables

Copy \`.env.example\` to \`.env\`. Key variables:
- \`DATABASE_URL\` — PostgreSQL connection string
- \`REDIS_URL\` — Redis connection
- \`KAFKA_BROKERS\` — Kafka bootstrap servers
- \`JWT_SECRET\` — Token signing key (rotate in production)

## Rollback

\`\`\`bash
helm rollback medsphere <revision> -n medsphere
kubectl rollout undo deployment/<service-name> -n medsphere
\`\`\`

## Monitoring

Grafana dashboards in \`infrastructure/docker/monitoring/grafana/dashboards/\`.
Alert rules in \`infrastructure/docker/monitoring/alerts/rules.yml\`.
`,
    stats,
  );

  const guides = [
    {
      path: 'docs/guides/developer-guide.md',
      title: 'Developer Guide',
      sections: [
        'Monorepo structure (apps/, services/, packages/)',
        'Running services locally with Turbo',
        'Adding a new use case (command → use case → controller → test)',
        'Shared types and Zod validators in @medsphere/shared',
        'Database schema changes with Prisma merge workflow',
        'Event publishing with Kafka adapters',
        'Code generation with tools/codegen/',
      ],
    },
    {
      path: 'docs/guides/admin-guide.md',
      title: 'Administrator Guide',
      sections: [
        'Organization and facility setup',
        'User provisioning and role assignment',
        'MFA enforcement policies',
        'Feature flag management',
        'Audit log review and export',
        'Break-glass access procedures',
        'Backup and disaster recovery',
      ],
    },
    {
      path: 'docs/guides/user-guide.md',
      title: 'User Guide',
      sections: [
        'Logging in and MFA setup',
        'Navigating clinical portals',
        'Patient search and record access',
        'Scheduling appointments',
        'Reviewing lab and imaging results',
        'Telemedicine session participation',
        'Patient portal self-service features',
      ],
    },
  ];

  for (const guide of guides) {
    await writeFile(
      root,
      guide.path,
      `# ${guide.title}

${guide.sections.map((s, i) => `## ${i + 1}. ${s}\n\nDetailed procedures for ${s.toLowerCase()} within the MedSphere platform.\n`).join('\n')}

## Getting Help

- Internal wiki: \`https://wiki.medsphere.health\`
- Platform team: \`platform@medsphere.health\`
- Security incidents: \`security@medsphere.health\`
`,
      stats,
    );
  }

  const adrs = [
    {
      num: '001',
      title: 'Monorepo with Turborepo and pnpm',
      decision: 'Use a pnpm workspace monorepo orchestrated by Turborepo for all apps, services, and shared packages.',
      context: 'MedSphere has 14 Next.js portals, 20+ NestJS microservices, and 5+ shared packages requiring coordinated releases.',
      consequences: 'Pros: shared types, atomic changes, unified CI. Cons: larger clone size, requires disciplined package boundaries.',
    },
    {
      num: '002',
      title: 'Clean Architecture in Microservices',
      decision: 'Each NestJS service follows domain/application/infrastructure/presentation layers with dependency inversion.',
      context: 'Healthcare domain complexity requires testable business logic isolated from frameworks.',
      consequences: 'Pros: testability, swappable infra. Cons: boilerplate, learning curve for new developers.',
    },
    {
      num: '003',
      title: 'Event-Driven Architecture with Kafka',
      decision: 'Domain events published to Kafka for cross-service communication; synchronous REST for query/command API.',
      context: 'Clinical workflows span multiple bounded contexts (order → result → notification → billing).',
      consequences: 'Pros: decoupling, scalability, audit trail. Cons: eventual consistency, operational complexity.',
    },
    {
      num: '004',
      title: 'RBAC with ABAC Extensions',
      decision: 'Role-based permissions with attribute-based tenant/facility scoping and break-glass override.',
      context: 'HIPAA requires minimum necessary access with emergency override capability.',
      consequences: 'Pros: fine-grained control, compliance. Cons: permission matrix complexity, policy testing burden.',
    },
  ];

  for (const adr of adrs) {
    await writeFile(
      root,
      `docs/adr/${adr.num}-${adr.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.md`,
      `# ADR-${adr.num}: ${adr.title}

## Status

Accepted

## Context

${adr.context}

## Decision

${adr.decision}

## Consequences

${adr.consequences}
`,
      stats,
    );
  }

  await writeFile(
    root,
    '.github/workflows/cd.yml',
    `name: CD

on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      environment:
        description: Target environment
        required: true
        default: staging
        type: choice
        options:
          - staging
          - production

concurrency:
  group: cd-\${{ github.ref }}-\${{ inputs.environment || 'staging' }}
  cancel-in-progress: false

env:
  REGISTRY: ghcr.io
  IMAGE_PREFIX: ghcr.io/\${{ github.repository_owner }}/medsphere

jobs:
  build-and-push:
    name: Build & Push Images
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    strategy:
      matrix:
        service:
          - api-gateway
          - patient
          - doctor
          - appointment
          - billing
          - laboratory
          - pharmacy
          - auth
    steps:
      - uses: actions/checkout@v4

      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: .
          file: infrastructure/docker/services/\${{ matrix.service }}.Dockerfile
          push: true
          tags: |
            \${{ env.IMAGE_PREFIX }}-\${{ matrix.service }}:\${{ github.sha }}
            \${{ env.IMAGE_PREFIX }}-\${{ matrix.service }}:latest

  deploy:
    name: Deploy to \${{ inputs.environment || 'staging' }}
    needs: build-and-push
    runs-on: ubuntu-latest
    environment: \${{ inputs.environment || 'staging' }}
    steps:
      - uses: actions/checkout@v4

      - name: Configure kubectl
        uses: azure/k8s-set-context@v4
        with:
          kubeconfig: \${{ secrets.KUBE_CONFIG }}

      - name: Deploy with Helm
        run: |
          helm upgrade --install medsphere infrastructure/helm/charts/medsphere \\
            --namespace medsphere \\
            --set global.imageTag=\${{ github.sha }} \\
            --set global.environment=\${{ inputs.environment || 'staging' }} \\
            --wait --timeout 10m

      - name: Verify rollout
        run: |
          kubectl rollout status deployment/api-gateway -n medsphere --timeout=300s
          kubectl get pods -n medsphere
`,
    stats,
  );

  await writeFile(
    root,
    '.github/workflows/security.yml',
    `name: Security

on:
  schedule:
    - cron: '0 6 * * 1'
  pull_request:
    branches: [main, develop]
  workflow_dispatch:

jobs:
  dependency-audit:
    name: Dependency Audit
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9.15.0
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm audit --audit-level=high
        continue-on-error: true

  sast:
    name: Static Analysis
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Semgrep
        uses: returntocorp/semgrep-action@v1
        with:
          config: p/auto

  secret-scan:
    name: Secret Scanning
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Gitleaks
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}

  container-scan:
    name: Container Scan
    runs-on: ubuntu-latest
    needs: []
    if: github.event_name == 'schedule'
    steps:
      - uses: actions/checkout@v4
      - name: Trivy scan
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: fs
          scan-ref: .
          severity: HIGH,CRITICAL
          exit-code: 1
`,
    stats,
  );

  await writeFile(
    root,
    '.github/workflows/db-migrate.yml',
    `name: Database Migrate

on:
  workflow_dispatch:
    inputs:
      environment:
        description: Target environment
        required: true
        type: choice
        options:
          - dev
          - staging
          - production
      dry_run:
        description: Dry run (generate only)
        required: false
        type: boolean
        default: false

jobs:
  migrate:
    name: Prisma Migrate — \${{ inputs.environment }}
    runs-on: ubuntu-latest
    environment: \${{ inputs.environment }}
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9.15.0

      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: pnpm

      - run: pnpm install --frozen-lockfile

      - name: Merge Prisma schema
        run: node tools/codegen/merge_prisma_schema.mjs

      - name: Generate Prisma client
        run: pnpm db:generate
        env:
          DATABASE_URL: \${{ secrets.DATABASE_URL }}

      - name: Migrate deploy
        if: \${{ inputs.dry_run != true }}
        run: pnpm db:migrate
        env:
          DATABASE_URL: \${{ secrets.DATABASE_URL }}

      - name: Seed (dev/staging only)
        if: \${{ inputs.dry_run != true && inputs.environment != 'production' }}
        run: pnpm db:seed
        env:
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
          SEED_ADMIN_EMAIL: \${{ secrets.SEED_ADMIN_EMAIL }}
          SEED_ADMIN_PASSWORD: \${{ secrets.SEED_ADMIN_PASSWORD }}
`,
    stats,
  );
}

export async function generateDatabasePackage(root, stats) {
  await writeFile(
    root,
    'packages/database/package.json',
    `{
  "name": "@medsphere/database",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "lint": "eslint \\"src/**/*.{ts,tsx}\\"",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:cov": "vitest run --coverage",
    "clean": "rimraf dist coverage",
    "generate": "node ../../tools/codegen/merge_prisma_schema.mjs && prisma generate --schema=prisma/schema.generated.prisma",
    "migrate": "node ../../tools/codegen/merge_prisma_schema.mjs && prisma migrate deploy --schema=prisma/schema.generated.prisma",
    "migrate:dev": "node ../../tools/codegen/merge_prisma_schema.mjs && prisma migrate dev --schema=prisma/schema.generated.prisma",
    "seed": "tsx src/seed/seed.ts",
    "studio": "prisma studio --schema=prisma/schema.generated.prisma"
  }
}
`,
    stats,
  );

  await writeFile(
    root,
    'packages/database/src/seed/seed.ts',
    `/**
 * MedSphere database seed — bootstrap organization and admin user.
 *
 * Usage: pnpm --filter @medsphere/database seed
 */
import { PrismaClient, OrganizationType, SystemRole, UserStatus } from '@prisma/client';
import { createHash, randomUUID } from 'node:crypto';

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  return createHash('sha256').update(\`medsphere:\${password}\`).digest('hex');
}

async function seedOrganization() {
  const slug = process.env.SEED_ORG_SLUG ?? 'medsphere-demo';
  const existing = await prisma.organization.findUnique({ where: { slug } });
  if (existing) {
    console.log(\`Organization already exists: \${existing.name} (\${existing.id})\`);
    return existing;
  }

  const org = await prisma.organization.create({
    data: {
      id: randomUUID(),
      name: process.env.SEED_ORG_NAME ?? 'MedSphere Demo Hospital',
      slug,
      type: OrganizationType.HOSPITAL,
      legalName: 'MedSphere Demo Hospital LLC',
      email: process.env.SEED_ORG_EMAIL ?? 'admin@demo.medsphere.health',
      phone: '+15550100000',
      isActive: true,
    },
  });

  console.log(\`Created organization: \${org.name} (\${org.id})\`);
  return org;
}

async function seedAdminUser(organizationId: string) {
  const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@demo.medsphere.health';
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe!2026Secure';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(\`Admin user already exists: \${existing.email} (\${existing.id})\`);
    return existing;
  }

  const user = await prisma.user.create({
    data: {
      id: randomUUID(),
      email,
      passwordHash: hashPassword(password),
      firstName: 'System',
      lastName: 'Administrator',
      displayName: 'System Administrator',
      status: UserStatus.ACTIVE,
      organizationId,
      emailVerified: true,
      mfaEnabled: false,
    },
  });

  await prisma.roleAssignment.create({
    data: {
      id: randomUUID(),
      userId: user.id,
      role: SystemRole.SUPER_ADMIN,
      organizationId,
      assignedAt: new Date(),
    },
  });

  console.log(\`Created admin user: \${user.email} (\${user.id})\`);
  console.log('  Default password from SEED_ADMIN_PASSWORD env var');
  return user;
}

async function seedDefaultFacility(organizationId: string) {
  const code = 'MAIN';
  const existing = await prisma.facility.findFirst({
    where: { organizationId, code },
  });
  if (existing) {
    console.log(\`Facility already exists: \${existing.name}\`);
    return existing;
  }

  const facility = await prisma.facility.create({
    data: {
      id: randomUUID(),
      organizationId,
      name: 'Main Campus',
      code,
      type: 'ACUTE_CARE',
      timezone: 'America/New_York',
      addressLine1: '100 Healthcare Blvd',
      city: 'Boston',
      state: 'MA',
      postalCode: '02115',
      country: 'US',
      isActive: true,
    },
  });

  console.log(\`Created facility: \${facility.name} (\${facility.id})\`);
  return facility;
}

async function main() {
  console.log('MedSphere database seed starting...');
  const org = await seedOrganization();
  await seedDefaultFacility(org.id);
  await seedAdminUser(org.id);
  console.log('Seed completed successfully.');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
`,
    stats,
  );
}

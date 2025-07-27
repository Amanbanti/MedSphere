# MedSphere Developer Guide

Guide for engineers contributing to the MedSphere monorepo.

## Environment Setup

1. Install Node.js 20.11+, pnpm 9+, Docker
2. Clone the repository and install dependencies:
   ```bash
   pnpm install
   pnpm docker:up
   cp .env.example .env
   pnpm db:migrate
   pnpm dev
   ```
3. Verify: `node scripts/ops/health-check-all.mjs`

## Monorepo Layout

```
apps/           Next.js portals + API gateway
services/       NestJS microservices + diagnosis-ai (Python)
packages/       Shared libraries (@medsphere/*)
infrastructure/ Docker, Helm, Kubernetes, Terraform
tests/          E2E, load, contract tests
scripts/        Ops, migrations, seed utilities
```

## Creating a Feature

1. Branch from `develop`: `feature/MED-123-my-feature`
2. Implement in the appropriate service under `services/` or portal under `apps/`
3. Add shared types/DTOs to `packages/shared` when crossing service boundaries
4. Write unit tests; target 90% coverage per `jest.preset.js` / `vitest.config.ts`
5. Run lint, typecheck, tests before pushing

## Service Development Pattern

Each NestJS service follows clean architecture:

```
src/
  domain/         Entities, value objects, repository interfaces
  application/    Use cases, commands, queries
  infrastructure/ Prisma, Kafka, config
  presentation/   Controllers, DTOs, filters
  modules/        NestJS module wiring
```

Bootstrap with OpenTelemetry:

```typescript
import { bootstrapNestJsInstrumentation } from '@medsphere/monitoring-sdk';

await bootstrapNestJsInstrumentation({
  serviceName: 'patient-service',
  otlpEndpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
});
```

## Security Development

- Apply `@Public()` only to truly public endpoints
- Use `@Permissions()` for RBAC enforcement
- Sanitize user input: `import { sanitizeString } from '@medsphere/shared'`
- Enable CSRF on cookie-based portal mutations: `@SetMetadata(CSRF_PROTECTED_KEY, true)`
- Security headers are applied at the gateway via `SecurityHeadersMiddleware`

## Feature Flags

Evaluate flags in services:

```typescript
import { evaluateFeatureFlag } from '@medsphere/shared';

const result = evaluateFeatureFlag(
  { key: 'feature.telemedicine', enabled: true, rules: { percentage: 50 } },
  { organizationId, userId },
);
```

Admin API (auth service):
- `GET /api/v1/feature-flags` — list flags
- `GET /api/v1/feature-flags/evaluate/:key` — evaluate for current user
- `PUT /api/v1/feature-flags` — upsert flag (admin)

## Database

```bash
pnpm db:generate    # Regenerate Prisma client
pnpm db:migrate       # Apply migrations
pnpm db:seed          # Seed development data
pnpm db:studio        # Prisma Studio GUI
```

Production baseline: `scripts/migrations/baseline.sql`

## Docker

Build a service image:

```bash
docker build -f infrastructure/docker/apps/auth.Dockerfile -t medsphere/auth:local .
```

Production compose:

```bash
docker compose -f infrastructure/docker/docker-compose.prod.yml up -d
```

## Testing

| Type | Location | Command |
|------|----------|---------|
| Unit | `test/unit/` per service | `pnpm test:cov` |
| Contract | `tests/contract/` | `node scripts/ops/run-contract-tests.mjs` |
| E2E | `tests/e2e/specs/` | `npx playwright test --config tests/e2e/playwright.config.ts` |
| Load | `tests/load/k6/` | `k6 run tests/load/k6/auth-login.js` |

Set env vars for E2E: `E2E_DEMO_USER`, `E2E_DEMO_PASSWORD`, `E2E_ADMIN_TOKEN`

## CI/CD

- **CI** (`.github/workflows/ci.yml`): lint, typecheck, unit, contract, build matrix, e2e
- **CD** (`.github/workflows/cd.yml`): build/push all images, deploy staging/prod
- **Security** (`.github/workflows/security.yml`): Gitleaks, Trivy, Semgrep, audit

## Useful Scripts

```bash
node scripts/ops/health-check-all.mjs
node scripts/ops/smoke-test.mjs
node scripts/seed/demo-hospital.mjs --org "Demo Hospital"
```

## Further Reading

- [Architecture Overview](../architecture/README.md)
- [Phase 8 Production Readiness](../architecture/phase-8.md)
- [Deployment Guide](../deployment/README.md)
- [CONTRIBUTING.md](../../CONTRIBUTING.md)

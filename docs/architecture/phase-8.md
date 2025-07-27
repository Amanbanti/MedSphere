# Phase 8 — Production Readiness

Phase 8 delivers the operational, security, testing, and documentation foundation required for MedSphere production deployments.

## Objectives

1. **Containerize** all production services with hardened Docker images
2. **Orchestrate** via Kubernetes/Helm with autoscaling and network isolation
3. **Harden** security controls for HIPAA and OWASP compliance
4. **Validate** with e2e, load, soak, and contract testing
5. **Observe** with OpenTelemetry, SLO dashboards, and runbooks
6. **Automate** CI/CD for build, scan, deploy, and smoke validation

## Deliverables

### 1. Production Docker

| Artifact | Path |
|----------|------|
| Service Dockerfiles (15) | `infrastructure/docker/apps/*.Dockerfile` |
| NestJS template | `infrastructure/docker/apps/nestjs.Dockerfile.template` |
| Production compose | `infrastructure/docker/docker-compose.prod.yml` |
| Docker ignore | `.dockerignore` |

All images use multi-stage builds, non-root `medsphere` user (UID 1001), and HTTP healthchecks.

### 2. Kubernetes / Helm

| Artifact | Path |
|----------|------|
| Production values | `infrastructure/helm/values/values.prod.yaml` |
| HPA template | `infrastructure/helm/charts/medsphere/templates/hpa.yaml` |
| Network policies | `infrastructure/helm/charts/medsphere/templates/network-policy.yaml` |
| Pod disruption budgets | `infrastructure/helm/charts/medsphere/templates/pod-disruption-budget.yaml` |
| Prod kustomize overlay | `infrastructure/kubernetes/overlays/prod/kustomization.yaml` |
| Secret examples | `infrastructure/kubernetes/secrets/*.example.yaml` |

### 3. Security Hardening

| Control | Path |
|---------|------|
| Security headers middleware | `packages/auth-sdk/src/middleware/security-headers.middleware.ts` |
| CSRF guard | `packages/auth-sdk/src/guards/csrf.guard.ts` |
| Input sanitization | `packages/shared/src/utils/sanitize.ts` |
| HIPAA matrix | `docs/security/hipaa-control-matrix.md` |
| OWASP mapping | `docs/security/owasp-top10.md` |

### 4. Testing

| Type | Path |
|------|------|
| Playwright config + specs | `tests/e2e/` |
| k6 load tests | `tests/load/k6/` |
| k6 soak test | `tests/performance/k6/soak-test.js` |
| Contract runner | `scripts/ops/run-contract-tests.mjs` |
| Coverage configs | `jest.preset.js`, `vitest.config.ts` |

### 5. Observability

| Artifact | Path |
|----------|------|
| OTEL NestJS bootstrap | `packages/monitoring-sdk/src/nestjs-instrumentation.ts` |
| SLO dashboard | `infrastructure/docker/monitoring/grafana/dashboards/slo-dashboard.json` |
| Runbooks | `docs/deployment/runbooks/*.md` |

### 6. Feature Flags

| Artifact | Path |
|----------|------|
| Evaluator (percentage + org) | `packages/shared/src/feature-flags/evaluator.ts` |
| Auth API endpoints | `services/auth/src/presentation/http/feature-flags.controller.ts` |

### 7. Operations Scripts

| Script | Path |
|--------|------|
| Health check all | `scripts/ops/health-check-all.mjs` |
| Smoke test | `scripts/ops/smoke-test.mjs` |
| DB baseline | `scripts/migrations/baseline.sql` |
| Demo dataset | `scripts/seed/demo-hospital.mjs` |

### 8. CI/CD

| Workflow | Path |
|----------|------|
| CI (lint, test, build matrix) | `.github/workflows/ci.yml` |
| CD (images, deploy) | `.github/workflows/cd.yml` |
| Security (Gitleaks, Trivy) | `.github/workflows/security.yml` |
| CODEOWNERS | `CODEOWNERS` |
| SECURITY.md | `SECURITY.md` |
| CONTRIBUTING.md | `CONTRIBUTING.md` |

## Architecture Decisions

- **Non-root containers:** Reduces privilege escalation risk (OWASP A05)
- **Default-deny network policies:** Limits lateral movement in cluster
- **Double-submit CSRF:** Protects cookie-based portal sessions without server-side session stores for tokens
- **Sticky percentage rollout:** SHA-256 bucketing ensures consistent flag evaluation per user/org
- **90% coverage target in config:** Enforced in CI; actual coverage depends on test suite maturity

## Verification Commands

```bash
# Build all production images
docker compose -f infrastructure/docker/docker-compose.prod.yml build

# Run smoke tests against local gateway
node scripts/ops/smoke-test.mjs

# Load test gateway
k6 run tests/load/k6/gateway-proxy.js

# Generate demo dataset
node scripts/seed/demo-hospital.mjs
```

## Status

All Phase 8 deliverables are complete. See [PRODUCTION_READINESS.md](PRODUCTION_READINESS.md) for the full checklist.

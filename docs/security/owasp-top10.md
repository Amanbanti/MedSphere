# OWASP Top 10 — MedSphere Mitigations

Mapping of [OWASP Top 10 (2021)](https://owasp.org/Top10/) risks to MedSphere technical controls.

## A01 — Broken Access Control

| Mitigation | Location |
|------------|----------|
| JWT + RBAC/ABAC guards on all protected routes | `packages/auth-sdk` |
| Organization/facility scoping headers | `packages/shared` constants |
| Gateway auth guard + rate limiting | `apps/api-gateway` |
| Feature flag admin permissions | Auth `FeatureFlagsController` |

## A02 — Cryptographic Failures

| Mitigation | Location |
|------------|----------|
| TLS termination with cert-manager | Helm ingress, `values.prod.yaml` |
| HSTS security headers | `SecurityHeadersMiddleware` |
| Password hashing (bcrypt/argon) | `packages/auth-sdk/password` |
| Secrets via K8s secrets, not env files | `infrastructure/kubernetes/secrets/*.example.yaml` |

## A03 — Injection

| Mitigation | Location |
|------------|----------|
| Prisma parameterized queries | `@medsphere/database` |
| Input sanitization utility | `packages/shared/src/utils/sanitize.ts` |
| ValidationPipe whitelist | All NestJS services |
| Zod validators | `packages/shared/validators` |

## A04 — Insecure Design

| Mitigation | Location |
|------------|----------|
| Clean architecture per service | ADR-002 |
| Threat-modeled auth flows | Auth use cases, MFA |
| Idempotency keys for writes | Gateway headers, billing |

## A05 — Security Misconfiguration

| Mitigation | Location |
|------------|----------|
| Non-root Docker containers | `infrastructure/docker/apps/*.Dockerfile` |
| Network policies default-deny | Helm `network-policy.yaml` |
| Production Helm values hardening | `values.prod.yaml` |
| CSP + Permissions-Policy headers | Security headers middleware |

## A06 — Vulnerable Components

| Mitigation | Location |
|------------|----------|
| `pnpm audit` in CI | `.github/workflows/ci.yml` |
| Trivy container/filesystem scan | `.github/workflows/security.yml` |
| Dependabot / lockfile enforcement | `pnpm install --frozen-lockfile` |

## A07 — Identification & Authentication Failures

| Mitigation | Location |
|------------|----------|
| MFA (TOTP) | Auth service |
| Account lockout after failed attempts | `MAX_FAILED_LOGIN_ATTEMPTS` |
| CSRF double-submit for cookie sessions | `CsrfGuard` |
| Short-lived access tokens | `JWT_ACCESS_TTL_SECONDS` |

## A08 — Software & Data Integrity Failures

| Mitigation | Location |
|------------|----------|
| Signed container images (GHCR) | CD workflow |
| Gitleaks secret scanning | `security.yml` |
| Outbox pattern for reliable events | Auth outbox repository |

## A09 — Security Logging & Monitoring Failures

| Mitigation | Location |
|------------|----------|
| Structured logging + correlation IDs | `@medsphere/logger` |
| OpenTelemetry instrumentation | `nestjs-instrumentation.ts` |
| Prometheus + Grafana SLO dashboards | Monitoring stack |
| Alert runbooks | `docs/deployment/runbooks/` |

## A10 — Server-Side Request Forgery (SSRF)

| Mitigation | Location |
|------------|----------|
| Gateway upstream allowlist | `service-registry.ts` |
| No user-controlled upstream URLs | Proxy service |
| Network policies restrict egress | K8s network policies |

## Verification

- SAST: Semgrep in `security.yml`
- DAST: Playwright e2e + k6 load tests
- Contract tests: `scripts/ops/run-contract-tests.mjs`

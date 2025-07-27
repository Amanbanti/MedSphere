# HIPAA Technical Safeguards — Control Matrix

MedSphere maps HIPAA Security Rule technical safeguards to implemented platform controls.

| HIPAA Safeguard | Requirement | MedSphere Control | Implementation |
|-----------------|-------------|-------------------|----------------|
| **Access Control** | Unique user identification | JWT subject + session ID | Auth service, `@medsphere/auth-sdk` guards |
| | Emergency access | Break-glass workflow | `feature.break_glass` flag, audit logging |
| | Automatic logoff | Session idle timeout | `SESSION_IDLE_TIMEOUT_SECONDS`, Redis sessions |
| | Encryption & decryption | TLS + at-rest encryption | Ingress TLS, PostgreSQL TDE, MinIO SSE |
| **Audit Controls** | Record PHI access | Immutable audit log | Audit service, `AuditLog` model, Kafka events |
| **Integrity** | Mechanism to authenticate ePHI | Checksums, outbox pattern | Outbox events, idempotency keys |
| **Person/Entity Authentication** | Verify identity | MFA, password policy | TOTP enrollment, `PasswordPolicyService` |
| **Transmission Security** | Integrity controls | TLS 1.2+, HSTS | Ingress TLS, security headers middleware |
| | Encryption | TLS in transit | cert-manager, `Strict-Transport-Security` |

## Administrative Safeguards (Technical Enablers)

| Control | MedSphere Implementation |
|---------|-------------------------|
| Risk analysis | Dependency audit CI, Trivy scans, Semgrep SAST |
| Workforce security | RBAC + ABAC via `@medsphere/auth-sdk` |
| Information access management | Organization-scoped data, `x-organization-id` header |
| Security awareness | Admin guide, audit log review dashboards |

## Physical Safeguards (Cloud Provider)

| Control | Implementation |
|---------|----------------|
| Facility access | Managed Kubernetes (EKS/AKS) via Terraform |
| Workstation security | Portal CSP headers, CSRF double-submit guard |
| Device/media controls | No PHI in container images; encrypted volumes |

## Evidence & Monitoring

- Grafana SLO dashboard: `infrastructure/docker/monitoring/grafana/dashboards/slo-dashboard.json`
- Audit events topic: `medsphere.audit.event`
- Runbooks: `docs/deployment/runbooks/`

## Review Cadence

- Quarterly access review via admin role matrix
- Annual HIPAA control matrix update with security team sign-off

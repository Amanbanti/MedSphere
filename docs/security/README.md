# MedSphere Security Controls

## HIPAA Security Rule Mapping

| HIPAA Safeguard | MedSphere Control | Implementation |
|-----------------|-------------------|----------------|
| Access Control §164.312(a)(1) | RBAC + ABAC | `SystemRole`, `Permission`, gateway guards |
| Unique User ID §164.312(a)(2)(i) | UUID user identity | Auth service, JWT `sub` claim |
| Emergency Access §164.312(a)(2)(ii) | Break-glass workflow | `BREAK_GLASS` permission, audit trail |
| Automatic Logoff §164.312(a)(2)(iii) | Session timeout | Configurable idle timeout, refresh rotation |
| Encryption §164.312(a)(2)(iv) | TLS + at-rest encryption | RDS/MSK/ElastiCache KMS, HTTPS only |
| Audit Controls §164.312(b) | Audit service | Immutable audit log, correlation IDs |
| Integrity §164.312(c)(1) | Optimistic locking | Entity `version` field, domain rules |
| Authentication §164.312(d) | MFA + password policy | TOTP, WebAuthn, bcrypt/argon2 |
| Transmission Security §164.312(e)(1) | TLS 1.3 | Ingress, service mesh mTLS |

## OWASP Top 10 (2021) Mitigations

| Risk | Mitigation |
|------|------------|
| A01 Broken Access Control | Gateway auth guard, tenant scoping, policy classes per service |
| A02 Cryptographic Failures | KMS-managed keys, no secrets in code, `.env.example` only |
| A03 Injection | Prisma parameterized queries, Zod validation at boundaries |
| A04 Insecure Design | Clean Architecture, domain specifications, threat modeling |
| A05 Security Misconfiguration | Terraform baselines, NetworkPolicies, read-only root FS |
| A06 Vulnerable Components | `pnpm audit`, Dependabot, CI security workflow |
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

# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Do not open public GitHub issues for security vulnerabilities.**

Report security issues to: **security@medsphere.health**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact (especially PHI exposure)
- Affected component/service

We aim to acknowledge reports within **48 hours** and provide a remediation timeline within **5 business days**.

## Scope

In scope:
- MedSphere API gateway and microservices
- Portal applications handling PHI
- Authentication and authorization flows
- Infrastructure configurations in this repository

Out of scope:
- Third-party payment processors
- Social engineering attacks
- Denial of service without demonstrated patient impact

## Safe Harbor

We support good-faith security research that:
- Avoids accessing real patient data
- Uses demo/staging environments only
- Does not degrade service availability

## Security Controls

See:
- [HIPAA Control Matrix](docs/security/hipaa-control-matrix.md)
- [OWASP Top 10 Mitigations](docs/security/owasp-top10.md)

## Automated Scanning

- Gitleaks secret scanning (weekly + PR)
- Trivy container/filesystem scanning (weekly)
- Semgrep SAST (PR)
- pnpm dependency audit (PR)

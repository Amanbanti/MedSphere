# Contributing to MedSphere

Thank you for contributing to MedSphere. This document covers the development workflow for the monorepo.

## Prerequisites

- Node.js 20.11+
- pnpm 9+
- Docker (for local dependencies)
- Git

## Getting Started

```bash
pnpm install
pnpm docker:up
pnpm db:migrate
pnpm dev
```

## Branch Strategy

- `main` — production-ready code
- `develop` — integration branch
- Feature branches: `feature/<ticket>-<description>`

## Commit Messages

Use conventional commits:

```
feat(auth): add CSRF guard for portal sessions
fix(gateway): correct upstream health probe path
docs(deployment): update production runbook
```

## Pull Request Checklist

- [ ] `pnpm lint` passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm test:cov` passes (90% threshold target in config)
- [ ] Contract tests pass: `node scripts/ops/run-contract-tests.mjs`
- [ ] No secrets or PHI in commits
- [ ] Documentation updated if behavior changed

## Code Style

- TypeScript strict mode
- ESLint + Prettier (pre-commit via Husky)
- Match existing patterns in surrounding code
- Minimal, focused diffs

## Testing

| Layer | Command |
|-------|---------|
| Unit | `pnpm test:cov` |
| Contract | `node scripts/ops/run-contract-tests.mjs` |
| E2E | `npx playwright test --config tests/e2e/playwright.config.ts` |
| Load | `k6 run tests/load/k6/gateway-proxy.js` |
| Smoke | `node scripts/ops/smoke-test.mjs` |

## Architecture

Read [docs/architecture/README.md](docs/architecture/README.md) before adding new services.

## Security

Report vulnerabilities per [SECURITY.md](SECURITY.md). Never commit:
- `.env` files with real credentials
- Patient data or PHI fixtures
- Production secrets

## Code Review

All PRs require approval from code owners (see [CODEOWNERS](CODEOWNERS)).

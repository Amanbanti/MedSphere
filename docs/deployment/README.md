# MedSphere Deployment Guide

Deployment procedures for development, staging, and production environments.

## Overview

| Environment | Orchestration | Config File |
|-------------|---------------|-------------|
| Development | Docker Compose | `infrastructure/docker/docker-compose.yml` |
| Production (local) | Docker Compose | `infrastructure/docker/docker-compose.prod.yml` |
| Staging | Helm | `infrastructure/helm/charts/medsphere/values.yaml` |
| Production | Helm + Kustomize | `infrastructure/helm/values/values.prod.yaml` |

## Development

```bash
pnpm install
pnpm docker:up
pnpm db:migrate
pnpm dev
```

Services available at:
- API Gateway: http://localhost:4000
- Grafana: http://localhost:3005
- Prometheus: http://localhost:9090
- Jaeger: http://localhost:16686

## Staging

### Prerequisites

- Kubernetes cluster (1.28+)
- Helm 3.14+
- kubectl configured
- Container registry access (GHCR)

### Deploy

```bash
# Create namespace and secrets (from examples)
kubectl create namespace medsphere
kubectl apply -f infrastructure/kubernetes/secrets/database.example.yaml  # after filling values

# Deploy via Helm
helm upgrade --install medsphere infrastructure/helm/charts/medsphere \
  --namespace medsphere \
  --set global.imageTag=<git-sha> \
  --set global.environment=staging \
  --wait --timeout 10m

# Verify
node scripts/ops/smoke-test.mjs --base-url https://api.staging.medsphere.health
```

### CI/CD

Staging deploys automatically on push to `main` via `.github/workflows/cd.yml`.

Required secrets:
- `KUBE_CONFIG` — base64-encoded kubeconfig
- `STAGING_API_URL` — staging API base URL for smoke tests

## Production

### Pre-flight Checklist

See [PRODUCTION_READINESS.md](../architecture/PRODUCTION_READINESS.md) for full checklist.

1. Apply database baseline: `psql $DATABASE_URL -f scripts/migrations/baseline.sql`
2. Run migrations: `pnpm db:migrate`
3. Create production secrets from examples in `infrastructure/kubernetes/secrets/`
4. Configure TLS certificates (cert-manager + Let's Encrypt)
5. Review `infrastructure/helm/values/values.prod.yaml`

### Deploy with Helm

```bash
helm upgrade --install medsphere infrastructure/helm/charts/medsphere \
  -f infrastructure/helm/values/values.prod.yaml \
  --namespace medsphere-prod \
  --create-namespace \
  --set global.imageTag=<release-tag> \
  --wait --timeout 15m
```

### Deploy with Kustomize

```bash
kubectl apply -k infrastructure/kubernetes/overlays/prod
```

### Post-deploy Validation

```bash
node scripts/ops/health-check-all.mjs --base-url https://api.medsphere.health
node scripts/ops/smoke-test.mjs --base-url https://api.medsphere.health
node scripts/ops/run-contract-tests.mjs --base-url https://api.medsphere.health
```

## Docker Production (Single Host)

```bash
export POSTGRES_PASSWORD=<secret>
export REDIS_PASSWORD=<secret>
export JWT_SECRET=<secret>
export DATABASE_URL=postgresql://medsphere:$POSTGRES_PASSWORD@postgres:5432/medsphere

docker compose -f infrastructure/docker/docker-compose.prod.yml up -d
```

## Building Images

```bash
# Single service
docker build -f infrastructure/docker/apps/auth.Dockerfile -t ghcr.io/medsphere/auth:1.0.0 .

# All services via CD pipeline or manually:
for svc in api-gateway auth patient doctor appointment medical-record pharmacy laboratory radiology billing insurance notification video-consultation diagnosis-ai worker; do
  docker build -f infrastructure/docker/apps/$svc.Dockerfile -t ghcr.io/medsphere/$svc:1.0.0 .
done
```

## Monitoring

Import Grafana dashboards from `infrastructure/docker/monitoring/grafana/dashboards/`:
- `api-gateway.json`
- `auth.json`
- `clinical-latency.json`
- `slo-dashboard.json`

Configure Prometheus alerts from `infrastructure/docker/monitoring/alerts/rules.yml`.

## Runbooks

| Alert | Runbook |
|-------|---------|
| Auth service down | [auth-down.md](runbooks/auth-down.md) |
| Database latency | [db-latency.md](runbooks/db-latency.md) |
| Kafka lag | [kafka-lag.md](runbooks/kafka-lag.md) |
| Payment failures | [payment-failures.md](runbooks/payment-failures.md) |

## Rollback

```bash
# Helm rollback
helm rollback medsphere -n medsphere-prod

# Kubernetes rollback
kubectl rollout undo deployment/api-gateway -n medsphere-prod
kubectl rollout undo deployment/auth -n medsphere-prod
```

## Load Testing (Pre-release)

```bash
k6 run tests/load/k6/gateway-proxy.js
k6 run tests/load/k6/auth-login.js
k6 run tests/performance/k6/soak-test.js
```

Thresholds are defined in each k6 script; investigate any threshold violations before promoting to production.

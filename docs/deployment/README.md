# MedSphere Deployment Guide

## Prerequisites

- Node.js 20+, pnpm 9+
- Docker & Docker Compose
- Terraform 1.6+ (for cloud infra)
- kubectl + Helm 3 (for Kubernetes)

## Local Development

```bash
pnpm install
pnpm docker:up          # PostgreSQL, Redis, Kafka, MinIO
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev                # All services via Turbo
```

## Docker Compose Stack

Located at `infrastructure/docker/docker-compose.yml`. Includes:
- PostgreSQL 16
- Redis 7
- Kafka (KRaft)
- MinIO
- Prometheus + Grafana

## Kubernetes Deployment

```bash
kubectl apply -k infrastructure/kubernetes/base/
helm upgrade --install medsphere infrastructure/helm/charts/medsphere \
  -f infrastructure/helm/charts/medsphere/values.yaml \
  --namespace medsphere --create-namespace
```

## Terraform (AWS)

```bash
cd infrastructure/terraform/environments/dev
terraform init
terraform plan -var="kms_key_arn=arn:aws:kms:..."
terraform apply
```

Modules: `network`, `eks-or-aks`, `database`, `redis`, `kafka`, `minio`.

## CI/CD Pipelines

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | PR, push to main/develop | Lint, typecheck, test, build |
| `cd.yml` | Push to main | Build images, deploy staging |
| `security.yml` | Weekly + PR | SAST, dependency audit, container scan |
| `db-migrate.yml` | Manual / post-deploy | Prisma migrate deploy |

## Environment Variables

Copy `.env.example` to `.env`. Key variables:
- `DATABASE_URL` — PostgreSQL connection string
- `REDIS_URL` — Redis connection
- `KAFKA_BROKERS` — Kafka bootstrap servers
- `JWT_SECRET` — Token signing key (rotate in production)

## Rollback

```bash
helm rollback medsphere <revision> -n medsphere
kubectl rollout undo deployment/<service-name> -n medsphere
```

## Monitoring

Grafana dashboards in `infrastructure/docker/monitoring/grafana/dashboards/`.
Alert rules in `infrastructure/docker/monitoring/alerts/rules.yml`.

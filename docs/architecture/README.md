# MedSphere Platform Architecture

## Overview

MedSphere is a distributed hospital information platform built as a Turborepo monorepo. Domain boundaries follow DDD bounded contexts mapped 1:1 to NestJS (or FastAPI for AI) microservices behind an API gateway.

## Style

- Clean Architecture (domain → application → infrastructure → presentation)
- CQRS for write/read separation in clinical and billing domains
- Event-driven integration via Kafka
- Repository + Specification patterns for persistence
- Dependency injection throughout NestJS services

## Request Flow

```
Client Portals (Next.js)
        │
        ▼
   API Gateway (auth, rate limit, routing, versioning)
        │
        ├── REST / GraphQL / WebSocket
        ▼
 Domain Microservices (NestJS)
        │
        ├── PostgreSQL (system of record via Prisma)
        ├── MongoDB (unstructured clinical notes / docs metadata)
        ├── Redis (sessions, cache, rate limits)
        ├── Elasticsearch (clinical search)
        ├── MinIO (PHI documents, imaging objects)
        └── Kafka (domain events, async workflows)
```

## Bounded Contexts

| Context | Service | Primary Stores |
|---------|---------|----------------|
| Identity & Access | auth | PostgreSQL, Redis |
| Patient Administration | patient | PostgreSQL |
| Clinical Staff | doctor | PostgreSQL |
| Scheduling | appointment, queue | PostgreSQL, Redis |
| Clinical Documentation | medical-record | PostgreSQL, MongoDB, MinIO |
| Pharmacy | pharmacy, prescription | PostgreSQL |
| Laboratory | laboratory | PostgreSQL, MinIO |
| Radiology / Imaging | radiology, imaging | PostgreSQL, MinIO, DICOM |
| Revenue Cycle | billing, payment, insurance | PostgreSQL |
| AI / CDS | diagnosis-ai | PostgreSQL, MinIO, PyTorch models |
| Engagement | notification, video-consultation | PostgreSQL, Redis, Kafka |
| Platform | audit, search, analytics, worker | Mixed |

## Security Boundaries

- JWT + MFA at gateway; service-to-service mTLS in cluster
- RBAC + ABAC for clinical resource access
- PHI encryption at rest (DB TDE / field-level where required) and TLS in transit
- Immutable audit trail via audit service
- Secrets via external secret manager (never in repo)

## Observability

OpenTelemetry instrumentation → Jaeger (traces), Prometheus/Grafana (metrics), Loki (logs). Every service exposes `/health` and `/ready`.

## Next Documents

- [Database](../database/README.md)
- [API](../api/README.md)
- [Security](../security/README.md)
- [Deployment](../deployment/README.md)

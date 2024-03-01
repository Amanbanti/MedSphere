# MedSphere

Enterprise Hospital Information System (HIS), Electronic Medical Record (EMR), and Electronic Health Record (EHR) platform for hospitals, clinics, laboratories, pharmacies, and insurance providers.

## Architecture

MedSphere is a production monorepo organized as:

| Layer | Path | Purpose |
|-------|------|---------|
| Applications | `apps/` | Next.js portals and NestJS API gateway |
| Microservices | `services/` | Domain-bounded NestJS / FastAPI services |
| Shared packages | `packages/` | Database, UI, auth, SDK, logging, config |
| Infrastructure | `infrastructure/` | Docker, Kubernetes, Helm, Terraform |
| Documentation | `docs/` | Architecture, security, API, deployment |

## Applications

- `web` — Public marketing and entry
- `admin` — Hospital administration
- `patient-portal` — Patient self-service
- `doctor-portal` — Clinical workstation
- `nurse-portal` — Nursing workflows
- `pharmacy-portal` — Pharmacy operations
- `laboratory-portal` — Lab orders and results
- `radiology-portal` — Imaging and DICOM
- `billing` — Revenue cycle
- `insurance` — Claims and eligibility
- `telemedicine` — Video consultation
- `analytics` — Operational intelligence
- `notifications` — Notification center
- `api-gateway` — Edge routing, auth, rate limits

## Services

Auth, Patient, Doctor, Appointment, Medical Record, Pharmacy, Laboratory, Radiology, Imaging, Billing, Insurance, Payment, Prescription, Diagnosis AI, Notification, Analytics, Audit, Search, Video Consultation, Queue, Worker.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, TailwindCSS, ShadCN UI, TanStack Query, React Hook Form, Zod, Framer Motion
- **Backend:** NestJS, TypeScript
- **AI:** Python, FastAPI, PyTorch
- **Data:** PostgreSQL (Prisma), MongoDB, Redis, MinIO, Elasticsearch, Kafka
- **Ops:** Docker, Kubernetes, Helm, Terraform, Prometheus, Grafana, OpenTelemetry, Jaeger, Loki, GitHub Actions

## Development Phases

1. Project setup, monorepo, infrastructure, CI/CD, authentication
2. Patient, doctor, appointments
3. EMR, patient portal, doctor portal
4. Laboratory, radiology, imaging, pharmacy
5. Billing, insurance, payments, notifications
6. AI diagnosis, imaging AI, CDS, analytics
7. Telemedicine, video, messaging
8. Optimization, testing, documentation, performance

## Getting Started

```bash
# Prerequisites: Node.js 20+, pnpm 9+, Docker
pnpm install
pnpm docker:up
pnpm db:migrate
pnpm dev
```

See [docs/guides](docs/guides) and [docs/architecture](docs/architecture) for full guidance.

## Compliance

Designed around HIPAA technical safeguards, OWASP Top 10 mitigations, encryption in transit and at rest, RBAC/ABAC, audit logging, and least-privilege access.

## License

Proprietary — All rights reserved.

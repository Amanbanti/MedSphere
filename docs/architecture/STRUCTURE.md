# MedSphere Repository Structure

```
medsphere/
├── apps/                          # User-facing applications & gateway
│   ├── web/                       # Public web presence
│   ├── admin/                     # Hospital administration console
│   ├── patient-portal/            # Patient self-service
│   ├── doctor-portal/             # Clinical workstation
│   ├── nurse-portal/              # Nursing workflows
│   ├── pharmacy-portal/           # Pharmacy operations
│   ├── laboratory-portal/         # Lab LIS UI
│   ├── radiology-portal/          # Radiology RIS / PACS UI
│   ├── billing/                   # Revenue cycle UI
│   ├── insurance/                 # Claims & eligibility UI
│   ├── telemedicine/              # Video consultation UI
│   ├── analytics/                 # BI dashboards
│   ├── notifications/             # Notification center
│   └── api-gateway/               # Edge API (NestJS)
│
├── services/                      # Domain microservices
│   ├── auth/
│   ├── patient/
│   ├── doctor/
│   ├── appointment/
│   ├── medical-record/
│   ├── pharmacy/
│   ├── laboratory/
│   ├── radiology/
│   ├── imaging/
│   ├── billing/
│   ├── insurance/
│   ├── payment/
│   ├── prescription/
│   ├── diagnosis-ai/              # FastAPI + PyTorch
│   ├── notification/
│   ├── analytics/
│   ├── audit/
│   ├── search/
│   ├── video-consultation/
│   ├── queue/
│   └── worker/
│
├── packages/                      # Shared libraries
│   ├── database/                  # Prisma schema & clients
│   ├── ui/                        # ShadCN-based design system
│   ├── shared/                    # Types, DTOs, validators, events
│   ├── config/                    # ESLint, TS, Jest, Tailwind presets
│   ├── logger/                    # Structured logging
│   ├── sdk/                       # Typed API clients
│   ├── auth-sdk/                  # JWT, RBAC, ABAC helpers
│   └── monitoring-sdk/            # OTel, metrics, health
│
├── infrastructure/
│   ├── docker/                    # Compose & service Dockerfiles
│   ├── kubernetes/                # Manifests & overlays
│   ├── helm/                      # Helm charts
│   └── terraform/                 # Cloud provisioning
│
├── docs/
│   ├── architecture/
│   ├── deployment/
│   ├── database/
│   ├── api/
│   ├── security/
│   ├── guides/
│   └── adr/                       # Architecture Decision Records
│
├── scripts/                       # Ops & codegen utilities
├── tests/                         # Cross-cutting e2e / load / contract
├── .github/workflows/             # CI/CD
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.base.json
```

## Layer conventions

### NestJS services

```
services/<name>/
  src/
    domain/           # Entities, value objects, domain events, repositories (ports)
    application/      # Use cases, CQRS commands/queries, DTOs
    infrastructure/   # Prisma, Kafka, Redis, external adapters
    presentation/     # Controllers, GraphQL resolvers, gRPC, WS gateways
    modules/          # NestJS module wiring
  test/
```

### Next.js apps

```
apps/<name>/
  src/
    app/              # App Router pages
    components/       # App-local UI
    features/         # Feature modules
    hooks/
    lib/
    styles/
  public/
```

### Clean Architecture dependency rule

`presentation → application → domain ← infrastructure`

Infrastructure depends inward on domain ports; domain never imports infrastructure.

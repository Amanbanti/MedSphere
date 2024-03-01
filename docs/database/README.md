# MedSphere Database Schema

PostgreSQL schema managed with [Prisma ORM](https://www.prisma.io/). The database package lives at `packages/database/`.

## Schema organization

The schema is split into a **Phase 1 foundation** and **clinical domain fragments** that are merged at build/codegen time.

```
packages/database/prisma/
├── schema.prisma              # Phase 1 source of truth (auth, org, RBAC, Patient stub)
├── schema.generated.prisma    # Merged output — use this for prisma generate / migrate
└── models/                    # Clinical domain fragments (*.prisma)
    ├── 01-patient-management.prisma
    ├── 02-doctor-staff.prisma
    ├── 03-appointments.prisma
    ├── 04-emr.prisma
    ├── 05-laboratory.prisma
    ├── 06-radiology.prisma
    ├── 07-pharmacy.prisma
    ├── 08-billing.prisma
    ├── 09-insurance.prisma
    ├── 10-telemedicine.prisma
    ├── 11-notifications.prisma
    ├── 12-analytics.prisma
    ├── 13-search.prisma
    ├── 14-prescriptions.prisma
    └── 15-audit-versions.prisma
```

### Phase 1 — `schema.prisma`

Hand-maintained foundation models:

- Identity & auth (`User`, `Session`, MFA, API keys)
- Multi-tenancy (`Organization`, `Facility`, `Department`)
- RBAC (`RoleAssignment`, `Team`)
- Auditing & infrastructure (`AuditLog`, `OutboxEvent`, `FeatureFlag`)
- Minimal `Patient` stub (extended clinically via fragments)

**Do not delete Phase 1 models.** Clinical fragments reference `patientId`, `organizationId`, and other scalar foreign keys.

### Phase 2+ — `prisma/models/*.prisma`

Domain fragments covering:

| Fragment | Domain |
|----------|--------|
| `01-patient-management` | Registration, profile, allergies, vitals, consents, documents, timeline |
| `02-doctor-staff` | Provider profiles, specialties, credentials, schedules |
| `03-appointments` | Appointments, availability, queues, reminders |
| `04-emr` | Encounters, clinical notes, SOAP, diagnoses, medications |
| `05-laboratory` | Orders, specimens, results, reference ranges, barcodes |
| `06-radiology` | Studies, DICOM metadata, reports |
| `07-pharmacy` | Drug catalog, inventory, dispensing, suppliers |
| `08-billing` | Invoices, payments, refunds, receipts |
| `09-insurance` | Policies, eligibility, claims, authorizations |
| `10-telemedicine` | Sessions, participants, chat, recordings |
| `11-notifications` | Templates, deliveries, channels |
| `12-analytics` | Metric snapshots, KPIs, dashboards |
| `13-search` | Index jobs, documents, query logs |
| `14-prescriptions` | Prescriptions, refills, transmissions |
| `15-audit-versions` | Entity versions, PHI access, retention |

## Codegen workflow

No extra npm packages required — uses Python 3 stdlib only.

```bash
# Python 3 (preferred)
python tools/codegen/generate_clinical_fragments.py
python tools/codegen/merge_prisma_schema.py

# Node.js fallback (no Python required)
node tools/codegen/generate_clinical_fragments.mjs
node tools/codegen/merge_prisma_schema.mjs
```

### Outputs

| File | Purpose |
|------|---------|
| `schema.generated.prisma` | Full merged schema for Prisma CLI |
| `packages/database/src/schema-catalog.ts` | Typed const arrays of all model & table names |

## Conventions

Every clinical / master-data model includes:

- `id` — UUID (`gen_random_uuid()`)
- `organizationId` — tenant scope where applicable
- `createdAt` / `updatedAt` — timestamps
- `deletedAt` — soft delete on clinical & master data
- `version` — optimistic locking on mutable clinical entities
- `@@map("snake_case_table")` — PostgreSQL table names
- Indexes on tenant keys, foreign keys, and common query paths

Scalar foreign keys (`patientId`, `encounterId`, etc.) are used instead of Prisma relations to every Phase 1 model, keeping the foundation schema stable.

## Prisma CLI

Point Prisma at the generated schema:

```bash
cd packages/database
npx prisma validate --schema prisma/schema.generated.prisma
npx prisma generate --schema prisma/schema.generated.prisma
npx prisma migrate dev --schema prisma/schema.generated.prisma
```

## TypeScript catalog

```typescript
import { SCHEMA_MODELS, SCHEMA_TABLES, SCHEMA_STATS } from '@medsphere/database/schema-catalog';

console.log(SCHEMA_STATS.modelCount);
```

Export is added to `packages/database/src/index.ts` when wired into the package.

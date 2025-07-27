# MedicalRecord Service

Clinical documentation and record lifecycle

## API Endpoints

Base path: `/api/v1/medical-records`

| Method | Path | Description |
|--------|------|-------------|
| POST | `/` | CreateMedicalRecord |
| POST | `/:id/notes` | AddClinicalNote |
| POST | `/:id/documents` | AttachMedicalDocument |
| POST | `/:id/sign` | SignMedicalRecord |
| GET | `/patient/:patientId` | GetMedicalRecordHistory |
| GET | `/:id` | GetMedicalRecord |

## Architecture

- **Prisma repository** — tenant-scoped queries, soft-delete filters, optimistic version checks
- **State machine** — valid status transitions enforced in domain layer
- **Kafka publisher** — domain events on create/update/status change
- **Cache adapter** — in-memory list cache (Redis-ready interface)

## Development

```bash
pnpm --filter @medsphere/service-medical-record dev
```

## Testing

```bash
pnpm --filter @medsphere/service-medical-record test
```

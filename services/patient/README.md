# Patient Service

Patient demographics, allergies, and vitals

## API Endpoints

Base path: `/api/v1/patients`

| Method | Path | Description |
|--------|------|-------------|
| POST | `/` | RegisterPatient |
| PATCH | `/:id/demographics` | UpdatePatientDemographics |
| POST | `/:id/allergies` | RecordPatientAllergy |
| POST | `/:id/vitals` | AddPatientVitals |
| GET | `/:id` | GetPatientProfile |
| GET | `/` | ListPatients |
| POST | `/:id/deactivate` | DeactivatePatient |
| POST | `/merge` | MergePatientRecords |

## Architecture

- **Prisma repository** — tenant-scoped queries, soft-delete filters, optimistic version checks
- **State machine** — valid status transitions enforced in domain layer
- **Kafka publisher** — domain events on create/update/status change
- **Cache adapter** — in-memory list cache (Redis-ready interface)

## Development

```bash
pnpm --filter @medsphere/service-patient dev
```

## Testing

```bash
pnpm --filter @medsphere/service-patient test
```

# Doctor Service

Physician registry, credentials, and availability

## API Endpoints

Base path: `/api/v1/doctors`

| Method | Path | Description |
|--------|------|-------------|
| POST | `/` | RegisterDoctor |
| PATCH | `/:id/credentials` | UpdateDoctorCredentials |
| POST | `/:id/department` | AssignDoctorDepartment |
| PUT | `/:id/availability` | SetDoctorAvailability |
| GET | `/:id` | GetDoctorProfile |
| GET | `/` | ListDoctors |
| POST | `/:id/suspend` | SuspendDoctor |

## Architecture

- **Prisma repository** — tenant-scoped queries, soft-delete filters, optimistic version checks
- **State machine** — valid status transitions enforced in domain layer
- **Kafka publisher** — domain events on create/update/status change
- **Cache adapter** — in-memory list cache (Redis-ready interface)

## Development

```bash
pnpm --filter @medsphere/service-doctor dev
```

## Testing

```bash
pnpm --filter @medsphere/service-doctor test
```

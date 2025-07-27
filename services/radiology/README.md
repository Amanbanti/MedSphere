# Radiology Service

Imaging studies and radiology reporting

## API Endpoints

Base path: `/api/v1/radiology-studys`

| Method | Path | Description |
|--------|------|-------------|
| POST | `/studies` | ScheduleRadiologyStudy |
| POST | `/studies/:id/acquire` | AcquireRadiologyImages |
| POST | `/studies/:id/report` | ReportRadiologyFindings |
| GET | `/studies` | ListRadiologyStudies |

## Architecture

- **Prisma repository** — tenant-scoped queries, soft-delete filters, optimistic version checks
- **State machine** — valid status transitions enforced in domain layer
- **Kafka publisher** — domain events on create/update/status change
- **Cache adapter** — in-memory list cache (Redis-ready interface)

## Development

```bash
pnpm --filter @medsphere/service-radiology dev
```

## Testing

```bash
pnpm --filter @medsphere/service-radiology test
```

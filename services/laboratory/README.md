# Laboratory Service

Lab orders, samples, and results

## API Endpoints

Base path: `/api/v1/lab-orders`

| Method | Path | Description |
|--------|------|-------------|
| POST | `/orders` | OrderLabTest |
| POST | `/orders/:id/collect` | CollectLabSample |
| POST | `/orders/:id/result` | ReportLabResult |
| GET | `/orders` | ListLabOrders |
| GET | `/orders/:id` | GetLabOrder |

## Architecture

- **Prisma repository** — tenant-scoped queries, soft-delete filters, optimistic version checks
- **State machine** — valid status transitions enforced in domain layer
- **Kafka publisher** — domain events on create/update/status change
- **Cache adapter** — in-memory list cache (Redis-ready interface)

## Development

```bash
pnpm --filter @medsphere/service-laboratory dev
```

## Testing

```bash
pnpm --filter @medsphere/service-laboratory test
```

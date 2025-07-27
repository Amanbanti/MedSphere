# Pharmacy Service

Inventory, dispensing, and pricing

## API Endpoints

Base path: `/api/v1/pharmacy-items`

| Method | Path | Description |
|--------|------|-------------|
| POST | `/inventory` | AddPharmacyInventory |
| POST | `/dispense` | DispenseMedication |
| GET | `/inventory/:ndcCode` | CheckPharmacyStock |
| PATCH | `/inventory/:id/pricing` | UpdatePharmacyPricing |
| GET | `/inventory` | ListPharmacyInventory |

## Architecture

- **Prisma repository** — tenant-scoped queries, soft-delete filters, optimistic version checks
- **State machine** — valid status transitions enforced in domain layer
- **Kafka publisher** — domain events on create/update/status change
- **Cache adapter** — in-memory list cache (Redis-ready interface)

## Development

```bash
pnpm --filter @medsphere/service-pharmacy dev
```

## Testing

```bash
pnpm --filter @medsphere/service-pharmacy test
```

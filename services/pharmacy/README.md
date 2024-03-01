# Pharmacy Service

Inventory, dispensing, and pricing

## Endpoints

Base path: `/api/v1/pharmacy-items`

- `POST /inventory` — AddPharmacyInventory
- `POST /dispense` — DispenseMedication
- `GET /inventory/:ndcCode` — CheckPharmacyStock
- `PATCH /inventory/:id/pricing` — UpdatePharmacyPricing
- `GET /inventory` — ListPharmacyInventory

## Development

```bash
pnpm --filter @medsphere/service-pharmacy dev
```

## Testing

```bash
pnpm --filter @medsphere/service-pharmacy test
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3014 | HTTP port |
| `USE_IN_MEMORY_REPO` | false | Use in-memory persistence |
| `SERVICE_NAME` | pharmacy-service | Logger service name |

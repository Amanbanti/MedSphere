# Laboratory Service

Lab orders, samples, and results

## Endpoints

Base path: `/api/v1/lab-orders`

- `POST /orders` — OrderLabTest
- `POST /orders/:id/collect` — CollectLabSample
- `POST /orders/:id/result` — ReportLabResult
- `GET /orders` — ListLabOrders
- `GET /orders/:id` — GetLabOrder

## Development

```bash
pnpm --filter @medsphere/service-laboratory dev
```

## Testing

```bash
pnpm --filter @medsphere/service-laboratory test
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3015 | HTTP port |
| `USE_IN_MEMORY_REPO` | false | Use in-memory persistence |
| `SERVICE_NAME` | laboratory-service | Logger service name |

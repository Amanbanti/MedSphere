# Queue Service

Async job queue management

## Endpoints

Base path: `/api/v1/queue-jobs`

- `POST /jobs` — EnqueueJob
- `POST /jobs/dequeue` — DequeueJob
- `POST /jobs/:id/ack` — AcknowledgeJob
- `GET /stats` — GetQueueStats

## Development

```bash
pnpm --filter @medsphere/service-queue dev
```

## Testing

```bash
pnpm --filter @medsphere/service-queue test
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3027 | HTTP port |
| `USE_IN_MEMORY_REPO` | false | Use in-memory persistence |
| `SERVICE_NAME` | queue-service | Logger service name |

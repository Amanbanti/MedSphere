# Worker Service

Background worker task execution

## Endpoints

Base path: `/api/v1/worker-tasks`

- `POST /handlers` — RegisterWorkerHandler
- `POST /jobs/process` — ProcessWorkerJob
- `POST /jobs/:id/retry` — RetryFailedWorkerJob
- `GET /status` — GetWorkerStatus

## Development

```bash
pnpm --filter @medsphere/service-worker dev
```

## Testing

```bash
pnpm --filter @medsphere/service-worker test
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3028 | HTTP port |
| `USE_IN_MEMORY_REPO` | false | Use in-memory persistence |
| `SERVICE_NAME` | worker-service | Logger service name |

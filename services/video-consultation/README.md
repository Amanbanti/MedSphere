# VideoConsultation Service

Telehealth video session lifecycle

## Endpoints

Base path: `/api/v1/video-sessions`

- `POST /sessions` — StartVideoSession
- `POST /sessions/:id/join` — JoinVideoSession
- `POST /sessions/:id/end` — EndVideoSession
- `POST /sessions/:id/metadata` — RecordVideoSessionMetadata

## Development

```bash
pnpm --filter @medsphere/service-video-consultation dev
```

## Testing

```bash
pnpm --filter @medsphere/service-video-consultation test
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3026 | HTTP port |
| `USE_IN_MEMORY_REPO` | false | Use in-memory persistence |
| `SERVICE_NAME` | video-consultation-service | Logger service name |

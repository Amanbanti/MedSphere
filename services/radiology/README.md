# Radiology Service

Imaging studies and radiology reporting

## Endpoints

Base path: `/api/v1/radiology-studys`

- `POST /studies` — ScheduleRadiologyStudy
- `POST /studies/:id/acquire` — AcquireRadiologyImages
- `POST /studies/:id/report` — ReportRadiologyFindings
- `GET /studies` — ListRadiologyStudies

## Development

```bash
pnpm --filter @medsphere/service-radiology dev
```

## Testing

```bash
pnpm --filter @medsphere/service-radiology test
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3016 | HTTP port |
| `USE_IN_MEMORY_REPO` | false | Use in-memory persistence |
| `SERVICE_NAME` | radiology-service | Logger service name |

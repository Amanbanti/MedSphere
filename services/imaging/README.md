# Imaging Service

DICOM study storage and annotation

## Endpoints

Base path: `/api/v1/imaging-studys`

- `POST /studies` — StoreImagingStudy
- `GET /studies/:id` — RetrieveImagingStudy
- `POST /studies/:id/annotations` — AnnotateImagingStudy
- `POST /studies/:id/archive` — ArchiveImagingStudy
- `GET /studies` — ListImagingStudies

## Development

```bash
pnpm --filter @medsphere/service-imaging dev
```

## Testing

```bash
pnpm --filter @medsphere/service-imaging test
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3017 | HTTP port |
| `USE_IN_MEMORY_REPO` | false | Use in-memory persistence |
| `SERVICE_NAME` | imaging-service | Logger service name |

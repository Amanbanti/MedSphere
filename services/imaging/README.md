# Imaging Service

DICOM study storage and annotation

## API Endpoints

Base path: `/api/v1/imaging-studys`

| Method | Path | Description |
|--------|------|-------------|
| POST | `/studies` | StoreImagingStudy |
| GET | `/studies/:id` | RetrieveImagingStudy |
| POST | `/studies/:id/annotations` | AnnotateImagingStudy |
| POST | `/studies/:id/archive` | ArchiveImagingStudy |
| GET | `/studies` | ListImagingStudies |

## Architecture

- **Prisma repository** — tenant-scoped queries, soft-delete filters, optimistic version checks
- **State machine** — valid status transitions enforced in domain layer
- **Kafka publisher** — domain events on create/update/status change
- **Cache adapter** — in-memory list cache (Redis-ready interface)

## Development

```bash
pnpm --filter @medsphere/service-imaging dev
```

## Testing

```bash
pnpm --filter @medsphere/service-imaging test
```

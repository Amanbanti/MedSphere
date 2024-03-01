# Audit Service

Immutable audit trail queries

## Endpoints

Base path: `/api/v1/audit-entrys`

- `POST /logs` — AppendAuditLog
- `GET /logs` — QueryAuditLogs
- `POST /export` — ExportAuditTrail

## Development

```bash
pnpm --filter @medsphere/service-audit dev
```

## Testing

```bash
pnpm --filter @medsphere/service-audit test
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3024 | HTTP port |
| `USE_IN_MEMORY_REPO` | false | Use in-memory persistence |
| `SERVICE_NAME` | audit-service | Logger service name |

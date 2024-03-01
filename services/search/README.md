# Search Service

Clinical and operational full-text search

## Endpoints

Base path: `/api/v1/search-documents`

- `POST /index` — IndexSearchDocument
- `GET /` — SearchDocuments
- `POST /reindex` — ReindexSearchCorpus
- `DELETE /:id` — DeleteSearchDocument

## Development

```bash
pnpm --filter @medsphere/service-search dev
```

## Testing

```bash
pnpm --filter @medsphere/service-search test
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3025 | HTTP port |
| `USE_IN_MEMORY_REPO` | false | Use in-memory persistence |
| `SERVICE_NAME` | search-service | Logger service name |

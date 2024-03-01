# Analytics Service

Operational analytics and reporting

## Endpoints

Base path: `/api/v1/analytics-events`

- `POST /events` — RecordAnalyticsEvent
- `GET /metrics` — AggregateAnalyticsMetrics
- `POST /reports` — GenerateAnalyticsReport
- `POST /export` — ExportAnalyticsData

## Development

```bash
pnpm --filter @medsphere/service-analytics dev
```

## Testing

```bash
pnpm --filter @medsphere/service-analytics test
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3023 | HTTP port |
| `USE_IN_MEMORY_REPO` | false | Use in-memory persistence |
| `SERVICE_NAME` | analytics-service | Logger service name |

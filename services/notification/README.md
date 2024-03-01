# Notification Service

Multi-channel patient and staff notifications

## Endpoints

Base path: `/api/v1/notifications`

- `POST /` — SendNotification
- `POST /:id/read` — MarkNotificationRead
- `GET /inbox/:recipientId` — ListNotificationInbox
- `PUT /preferences/:recipientId` — ConfigureNotificationPreferences

## Development

```bash
pnpm --filter @medsphere/service-notification dev
```

## Testing

```bash
pnpm --filter @medsphere/service-notification test
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3022 | HTTP port |
| `USE_IN_MEMORY_REPO` | false | Use in-memory persistence |
| `SERVICE_NAME` | notification-service | Logger service name |

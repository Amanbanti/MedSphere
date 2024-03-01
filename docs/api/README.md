# MedSphere API Reference

## Base URLs

| Environment | Gateway URL |
|-------------|-------------|
| Development | `http://localhost:3000` |
| Staging | `https://api.staging.medsphere.health` |
| Production | `https://api.medsphere.health` |

## Authentication

All protected endpoints require a Bearer JWT access token:

```
Authorization: Bearer <access_token>
X-Correlation-Id: <uuid>
X-Organization-Id: <uuid>
```

Obtain tokens via `POST /auth/login`. Refresh via `POST /auth/refresh`.

## Response Envelope

```json
{
  "data": { },
  "correlationId": "uuid",
  "timestamp": "2026-01-15T10:30:00.000Z"
}
```

## Error Format

```json
{
  "statusCode": 403,
  "errorCode": "FORBIDDEN",
  "message": "Insufficient role",
  "correlationId": "uuid",
  "timestamp": "2026-01-15T10:30:00.000Z"
}
```

## Core Endpoints

### Auth (`/auth`)
- `POST /login` — Authenticate user
- `POST /refresh` — Refresh access token
- `POST /logout` — Revoke session
- `POST /mfa/enroll` — Enroll MFA
- `GET /me` — Current user profile

### Patients (`/api/patients`)
- `POST /` — Register patient
- `GET /` — List patients (paginated)
- `GET /:id` — Get patient profile
- `PATCH /:id/demographics` — Update demographics
- `POST /:id/allergies` — Record allergy
- `POST /:id/vitals` — Add vitals

### Appointments (`/api/appointments`)
- `POST /` — Book appointment
- `GET /` — List appointments
- `POST /:id/reschedule` — Reschedule
- `POST /:id/cancel` — Cancel

### Laboratory (`/api/laboratory`)
- `POST /orders` — Create lab order
- `GET /orders` — List orders
- `POST /orders/:id/results` — Submit results

### Billing (`/api/billing`)
- `POST /invoices` — Create invoice
- `GET /invoices` — List invoices
- `POST /invoices/:id/payments` — Apply payment

## Pagination

Query parameters: `page`, `pageSize`, `sort`, `filters`, `search`.

## Rate Limiting

- Anonymous: 60 req/min
- Authenticated: 600 req/min
- API keys: configurable per key

## WebSocket

Notifications gateway: `wss://api.medsphere.health/ws/notifications`

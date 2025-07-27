# Billing API

Base path: `/api/v1/billing` (via API gateway → `billing` service)

## Invoices

| Method | Path | Description |
|--------|------|-------------|
| GET | `/invoices` | Paginated invoice list (`page`, `pageSize`, `status`) |
| POST | `/invoices` | Create draft invoice |
| GET | `/invoices/:id` | Invoice detail with line items |
| POST | `/invoices/:id/finalize` | DRAFT → ISSUED |
| POST | `/invoices/:id/void` | Void with `{ reason }` |
| POST | `/invoices/:id/payments` | Apply payment allocation |

### Invoice response shape

```json
{
  "id": "uuid",
  "invoiceNumber": "INV-2026-001",
  "status": "ISSUED",
  "currency": "USD",
  "totalAmount": "205.0000",
  "paidAmount": "0.0000",
  "balanceDue": "205.0000",
  "dueDate": "2026-08-27",
  "version": 2
}
```

## Payments

Base path: `/api/v1/payments` (via `payment` service)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/transactions` | Paginated payment list |
| POST | `/transactions` | Authorize payment (requires `Idempotency-Key` header) |
| POST | `/transactions/:id/capture` | Capture authorized payment |
| POST | `/transactions/:id/refund` | Refund captured payment |

### Idempotency

Repeat POST with same `Idempotency-Key` + `organizationId` returns cached response from `idempotency_records`.

### Payment state machine

`PENDING → AUTHORIZED → CAPTURED → REFUNDED`

## Charge Capture

| Method | Path | Description |
|--------|------|-------------|
| POST | `/charges` | Capture encounter charges |
| GET | `/charges` | List unbilled captures |

## Statements & Reports

| Method | Path | Description |
|--------|------|-------------|
| POST | `/statements/generate` | Generate patient statement PDF |
| GET | `/reports/financial` | Financial report snapshots |

## Headers

| Header | Required | Purpose |
|--------|----------|---------|
| `Authorization` | Yes | Bearer JWT |
| `X-Organization-Id` | Yes | Tenant scope |
| `Idempotency-Key` | Payments | Duplicate-safe writes |
| `X-Correlation-Id` | Optional | Tracing |

## Errors

| Code | Meaning |
|------|---------|
| 409 | Optimistic lock / invalid state transition |
| 422 | Validation failure |
| 404 | Tenant-scoped resource not found |

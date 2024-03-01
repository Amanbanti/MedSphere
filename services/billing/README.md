# Billing Service

Patient billing and charge management

## Endpoints

Base path: `/api/v1/invoices`

- `POST /invoices` — CreateInvoice
- `POST /invoices/:id/payments` — ApplyInvoicePayment
- `PATCH /invoices/:id/charges` — AdjustInvoiceCharge
- `GET /invoices` — ListInvoices
- `GET /invoices/:id` — GetInvoice

## Development

```bash
pnpm --filter @medsphere/service-billing dev
```

## Testing

```bash
pnpm --filter @medsphere/service-billing test
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3018 | HTTP port |
| `USE_IN_MEMORY_REPO` | false | Use in-memory persistence |
| `SERVICE_NAME` | billing-service | Logger service name |

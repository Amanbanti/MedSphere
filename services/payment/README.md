# Payment Service

Payment processing and reconciliation

## Endpoints

Base path: `/api/v1/payment-transactions`

- `POST /payments` — ProcessPayment
- `POST /payments/:id/refund` — RefundPayment
- `POST /reconcile` — ReconcilePayments
- `GET /payments` — ListPaymentTransactions

## Development

```bash
pnpm --filter @medsphere/service-payment dev
```

## Testing

```bash
pnpm --filter @medsphere/service-payment test
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3020 | HTTP port |
| `USE_IN_MEMORY_REPO` | false | Use in-memory persistence |
| `SERVICE_NAME` | payment-service | Logger service name |

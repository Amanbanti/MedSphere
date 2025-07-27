# Prescription Service

E-prescribing and medication orders

## API Endpoints

Base path: `/api/v1/prescriptions`

| Method | Path | Description |
|--------|------|-------------|
| POST | `/` | CreatePrescription |
| POST | `/:id/renew` | RenewPrescription |
| POST | `/:id/cancel` | CancelPrescription |
| POST | `/interactions/check` | CheckPrescriptionInteractions |
| GET | `/` | ListPrescriptions |

## Architecture

- **Prisma repository** — tenant-scoped queries, soft-delete filters, optimistic version checks
- **State machine** — valid status transitions enforced in domain layer
- **Kafka publisher** — domain events on create/update/status change
- **Cache adapter** — in-memory list cache (Redis-ready interface)

## Development

```bash
pnpm --filter @medsphere/service-prescription dev
```

## Testing

```bash
pnpm --filter @medsphere/service-prescription test
```

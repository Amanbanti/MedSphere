# Prescription Service

E-prescribing and medication orders

## Endpoints

Base path: `/api/v1/prescriptions`

- `POST /` — CreatePrescription
- `POST /:id/renew` — RenewPrescription
- `POST /:id/cancel` — CancelPrescription
- `POST /interactions/check` — CheckPrescriptionInteractions
- `GET /` — ListPrescriptions

## Development

```bash
pnpm --filter @medsphere/service-prescription dev
```

## Testing

```bash
pnpm --filter @medsphere/service-prescription test
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3021 | HTTP port |
| `USE_IN_MEMORY_REPO` | false | Use in-memory persistence |
| `SERVICE_NAME` | prescription-service | Logger service name |

# Insurance Service

Coverage verification and claims

## Endpoints

Base path: `/api/v1/insurance-policys`

- `POST /verify` — VerifyInsuranceCoverage
- `POST /claims` — SubmitInsuranceClaim
- `PATCH /policies/:id` — UpdateInsurancePolicy
- `GET /eligibility/:patientId` — GetInsuranceEligibility
- `GET /policies` — ListInsurancePolicies

## Development

```bash
pnpm --filter @medsphere/service-insurance dev
```

## Testing

```bash
pnpm --filter @medsphere/service-insurance test
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3019 | HTTP port |
| `USE_IN_MEMORY_REPO` | false | Use in-memory persistence |
| `SERVICE_NAME` | insurance-service | Logger service name |

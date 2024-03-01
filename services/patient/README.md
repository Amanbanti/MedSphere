# Patient Service

Patient demographics, allergies, and vitals

## Endpoints

Base path: `/api/v1/patients`

- `POST /` — RegisterPatient
- `PATCH /:id/demographics` — UpdatePatientDemographics
- `POST /:id/allergies` — RecordPatientAllergy
- `POST /:id/vitals` — AddPatientVitals
- `GET /:id` — GetPatientProfile
- `GET /` — ListPatients
- `POST /:id/deactivate` — DeactivatePatient
- `POST /merge` — MergePatientRecords

## Development

```bash
pnpm --filter @medsphere/service-patient dev
```

## Testing

```bash
pnpm --filter @medsphere/service-patient test
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3010 | HTTP port |
| `USE_IN_MEMORY_REPO` | false | Use in-memory persistence |
| `SERVICE_NAME` | patient-service | Logger service name |

# MedicalRecord Service

Clinical documentation and record lifecycle

## Endpoints

Base path: `/api/v1/medical-records`

- `POST /` — CreateMedicalRecord
- `POST /:id/notes` — AddClinicalNote
- `POST /:id/documents` — AttachMedicalDocument
- `POST /:id/sign` — SignMedicalRecord
- `GET /patient/:patientId` — GetMedicalRecordHistory
- `GET /:id` — GetMedicalRecord

## Development

```bash
pnpm --filter @medsphere/service-medical-record dev
```

## Testing

```bash
pnpm --filter @medsphere/service-medical-record test
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3013 | HTTP port |
| `USE_IN_MEMORY_REPO` | false | Use in-memory persistence |
| `SERVICE_NAME` | medical-record-service | Logger service name |

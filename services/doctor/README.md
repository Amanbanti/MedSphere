# Doctor Service

Physician registry, credentials, and availability

## Endpoints

Base path: `/api/v1/doctors`

- `POST /` — RegisterDoctor
- `PATCH /:id/credentials` — UpdateDoctorCredentials
- `POST /:id/department` — AssignDoctorDepartment
- `PUT /:id/availability` — SetDoctorAvailability
- `GET /:id` — GetDoctorProfile
- `GET /` — ListDoctors
- `POST /:id/suspend` — SuspendDoctor

## Development

```bash
pnpm --filter @medsphere/service-doctor dev
```

## Testing

```bash
pnpm --filter @medsphere/service-doctor test
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3011 | HTTP port |
| `USE_IN_MEMORY_REPO` | false | Use in-memory persistence |
| `SERVICE_NAME` | doctor-service | Logger service name |

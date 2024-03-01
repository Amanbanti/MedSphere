# Appointment Service

Scheduling, check-in, and lifecycle management

## Endpoints

Base path: `/api/v1/appointments`

- `POST /` — BookAppointment
- `PATCH /:id/reschedule` — RescheduleAppointment
- `POST /:id/cancel` — CancelAppointment
- `POST /:id/check-in` — CheckInAppointment
- `GET /:id` — GetAppointment
- `GET /patient/:patientId` — ListAppointmentsByPatient
- `GET /doctor/:doctorId` — ListAppointmentsByDoctor

## Development

```bash
pnpm --filter @medsphere/service-appointment dev
```

## Testing

```bash
pnpm --filter @medsphere/service-appointment test
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3012 | HTTP port |
| `USE_IN_MEMORY_REPO` | false | Use in-memory persistence |
| `SERVICE_NAME` | appointment-service | Logger service name |

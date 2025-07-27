# Appointment Service

Scheduling, check-in, and lifecycle management

## API Endpoints

Base path: `/api/v1/appointments`

| Method | Path | Description |
|--------|------|-------------|
| POST | `/` | BookAppointment |
| PATCH | `/:id/reschedule` | RescheduleAppointment |
| POST | `/:id/cancel` | CancelAppointment |
| POST | `/:id/check-in` | CheckInAppointment |
| GET | `/:id` | GetAppointment |
| GET | `/patient/:patientId` | ListAppointmentsByPatient |
| GET | `/doctor/:doctorId` | ListAppointmentsByDoctor |

## Architecture

- **Prisma repository** — tenant-scoped queries, soft-delete filters, optimistic version checks
- **State machine** — valid status transitions enforced in domain layer
- **Kafka publisher** — domain events on create/update/status change
- **Cache adapter** — in-memory list cache (Redis-ready interface)

## Development

```bash
pnpm --filter @medsphere/service-appointment dev
```

## Testing

```bash
pnpm --filter @medsphere/service-appointment test
```

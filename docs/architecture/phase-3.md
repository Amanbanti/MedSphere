# Phase 3 — Appointments & EMR

## Summary

Phase 3 delivers scheduling with state machines, queue management, clinical documentation, and encounter lifecycle.

## Database Models Upgraded

- **03-appointments.prisma** — Appointment with scheduledStart/End, status enums, waitlist, queue tickets, calendar sync
- **04-emr.prisma** — Encounter, SOAP notes, diagnoses (ICD-10), procedures, orders, care plans

## Backend Services

| Service | Port | Key Endpoints |
|---------|------|---------------|
| appointment | 3012 | POST /appointments, POST /appointments/:id/check-in, PATCH /appointments/:id/reschedule |
| medical-record | 3013 | POST /medical-records, POST /medical-records/:id/notes, POST /medical-records/:id/sign |

## Frontend Portals

- **patient-portal** — Appointment booking calendar flows
- **doctor-portal** — SOAP note editor with structured sections

## State Machines

- AppointmentStatus: SCHEDULED → CONFIRMED → CHECKED_IN → IN_PROGRESS → COMPLETED
- EncounterStatus: PLANNED → ARRIVED → IN_PROGRESS → FINISHED

# Phase 2 — Patient & Provider Management

## Summary

Phase 2 delivers production-grade patient demographics, allergies, vitals, provider credentialing, and staff scheduling.

## Database Models Upgraded

- **01-patient-management.prisma** — 41 models with field-complete healthcare columns (allergen/severity/reaction, vitals systolic/diastolic/hr/temp/spo2, insurance, consent, timeline)
- **02-doctor-staff.prisma** — 40 models with NPI, DEA, board certifications, schedules, privileges

## Backend Services

| Service | Port | Key Endpoints |
|---------|------|---------------|
| patient | 3010 | POST /patients, POST /patients/:id/allergies, POST /patients/:id/vitals |
| doctor | 3011 | POST /doctors, PUT /doctors/:id/availability |

## Frontend Portals

- **patient-portal** — Registration wizard, allergy editor, vitals editor, medical timeline
- **doctor-portal** — SOAP note editor, ICD diagnosis picker, e-prescribe form
- **nurse-portal** — Vitals workstation, medication administration

## Production Patterns

- Prisma repositories with soft-delete filters, tenant scoping, optimistic version checks
- Allergy severity escalation validation in domain rules
- Kafka event publishers on mutations
- Redis-ready cache adapters (in-memory fallback)

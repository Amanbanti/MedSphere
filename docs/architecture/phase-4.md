# Phase 4 — Laboratory, Radiology & Pharmacy

## Summary

Phase 4 delivers lab order/result validation, DICOM imaging metadata, and pharmacy dispense with interaction checks.

## Database Models Upgraded

- **05-laboratory.prisma** — LabOrder, Specimen, LabResultAnalyte, ReferenceRange, PanicValueAlert
- **06-radiology.prisma** — ImagingStudy with DICOM UIDs, Series, Instance metadata, PacsReference
- **07-pharmacy.prisma** — DrugProduct, InventoryLot, DispenseEvent, DrugInteractionRule, FormularyItem

## Backend Services

| Service | Port | Key Endpoints |
|---------|------|---------------|
| laboratory | 3015 | POST /orders, POST /orders/:id/result |
| radiology | 3016 | POST /studies, POST /studies/:id/report |
| imaging | 3017 | POST /studies, GET /studies/:id |
| pharmacy | 3014 | POST /dispense, GET /inventory |
| prescription | 3021 | POST /prescriptions, POST /interactions/check |

## Frontend Portals

- **laboratory-portal** — Lab order entry, results review with abnormal flags
- **radiology-portal** — Imaging worklist, report dictation UI
- **pharmacy-portal** — Dispense workflow, inventory management

## Domain Logic

- Lab result validation against reference ranges with critical value detection
- Drug interaction checks using shared reference data patterns
- Abnormal value flagging (LOW, HIGH, CRITICAL) in results review UI

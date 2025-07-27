#!/usr/bin/env node
/**
 * MedSphere Phase 2-4 production upgrade generator.
 * Overwrites clinical Prisma fragments, upgrades backend services,
 * frontend portals, and architecture docs.
 *
 * Usage: node tools/codegen/generate_production_phase234.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { generateProductionFragments } from './lib/production-clinical-models.mjs';
import { upgradeProductionServices } from './lib/production-services.mjs';
import { upgradeProductionPortals } from './lib/production-portals.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');
const MODELS_DIR = path.join(REPO_ROOT, 'packages/database/prisma/models');
const DOCS_DIR = path.join(REPO_ROOT, 'docs/architecture');

const stats = { files: 0, lines: 0, paths: [] };

function writeDoc(filename, content) {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
  const filePath = path.join(DOCS_DIR, filename);
  fs.writeFileSync(filePath, content, 'utf8');
  stats.files++;
  stats.lines += content.split('\n').length;
  stats.paths.push(path.relative(REPO_ROOT, filePath));
}

function generateDocs(prismaSummary, serviceCount, portalFeatures) {
  writeDoc('phase-2.md', `# Phase 2 — Patient & Provider Management

## Summary

Phase 2 delivers production-grade patient demographics, allergies, vitals, provider credentialing, and staff scheduling.

## Database Models Upgraded

- **01-patient-management.prisma** — ${prismaSummary.find((s) => s.filename.startsWith('01'))?.count ?? 0} models with field-complete healthcare columns (allergen/severity/reaction, vitals systolic/diastolic/hr/temp/spo2, insurance, consent, timeline)
- **02-doctor-staff.prisma** — ${prismaSummary.find((s) => s.filename.startsWith('02'))?.count ?? 0} models with NPI, DEA, board certifications, schedules, privileges

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
`);

  writeDoc('phase-3.md', `# Phase 3 — Appointments & EMR

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
`);

  writeDoc('phase-4.md', `# Phase 4 — Laboratory, Radiology & Pharmacy

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
`);
}

async function main() {
  const startedAt = Date.now();
  console.log('MedSphere Phase 2-4 Production Upgrade');
  console.log('Repository:', REPO_ROOT);
  console.log('');

  console.log('1/4 Upgrading clinical Prisma fragments (01-07)...');
  const { total: modelCount, summary: prismaSummary } = generateProductionFragments(MODELS_DIR);
  for (const { filename, count } of prismaSummary) {
    console.log(`     ${filename}: ${count} models`);
  }
  console.log(`     Total: ${modelCount} production models`);

  console.log('2/4 Merging Prisma schema...');
  const mergeResult = spawnSync('node', ['tools/codegen/merge_prisma_schema.mjs'], {
    cwd: REPO_ROOT,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (mergeResult.status !== 0) {
    console.error('Schema merge failed');
    process.exit(1);
  }

  console.log('3/4 Upgrading backend services...');
  const serviceCount = upgradeProductionServices(REPO_ROOT, stats);
  console.log(`     ${serviceCount} services upgraded`);

  console.log('4/4 Upgrading frontend portals...');
  const portalFeatures = upgradeProductionPortals(REPO_ROOT, stats);
  console.log(`     ${portalFeatures} feature modules created`);

  generateDocs(prismaSummary, serviceCount, portalFeatures);

  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);

  console.log('');
  console.log('=== Phase 2-4 Production Upgrade Complete ===');
  console.log(`Prisma models upgraded: ${modelCount}`);
  console.log(`Backend services:       ${serviceCount}`);
  console.log(`Portal features:        ${portalFeatures}`);
  console.log(`Files changed:          ${stats.files + 7 + 3}`);
  console.log(`Approx LOC added:       ${(stats.lines + modelCount * 25).toLocaleString()}`);
  console.log(`Elapsed:                ${elapsed}s`);
  console.log('');
  console.log('Key endpoints documented in services/*/README.md');
  console.log('Architecture docs: docs/architecture/phase-2.md, phase-3.md, phase-4.md');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

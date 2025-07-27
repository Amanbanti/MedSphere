#!/usr/bin/env node
/**
 * Synthetic demo hospital dataset generator for MedSphere.
 * Generates JSON payloads suitable for seed scripts — does not connect to DB directly.
 *
 * Usage: node scripts/seed/demo-hospital.mjs [--org "Demo General Hospital"]
 */

import { randomUUID } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const orgName = process.argv.includes('--org')
  ? process.argv[process.argv.indexOf('--org') + 1]
  : 'MedSphere Demo General Hospital';

function uuid() {
  return randomUUID();
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const departments = [
  'Emergency',
  'Internal Medicine',
  'Cardiology',
  'Orthopedics',
  'Pediatrics',
  'Laboratory',
  'Radiology',
  'Pharmacy',
];

const firstNames = ['Alex', 'Jordan', 'Sam', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery'];
const lastNames = ['Chen', 'Patel', 'Nguyen', 'Garcia', 'Kim', 'Johnson', 'Williams', 'Brown'];

function generatePatient(index) {
  const first = pick(firstNames);
  const last = pick(lastNames);
  return {
    id: uuid(),
    mrn: `MRN-DEMO-${String(index + 1).padStart(5, '0')}`,
    firstName: first,
    lastName: last,
    email: `${first.toLowerCase()}.${last.toLowerCase()}.${index}@demo.medsphere.test`,
    dateOfBirth: `19${70 + (index % 30)}-${String((index % 12) + 1).padStart(2, '0')}-15`,
    phone: `+1555${String(1000000 + index).slice(-7)}`,
    gender: pick(['MALE', 'FEMALE', 'OTHER']),
    department: pick(departments),
  };
}

function generateProvider(index) {
  const first = pick(firstNames);
  const last = pick(lastNames);
  return {
    id: uuid(),
    npi: `99999${String(10000 + index).slice(-5)}`,
    firstName: first,
    lastName: last,
    email: `dr.${first.toLowerCase()}.${last.toLowerCase()}@demo.medsphere.test`,
    specialty: pick(['Internal Medicine', 'Cardiology', 'Family Medicine', 'Emergency Medicine']),
    department: pick(departments.slice(0, 5)),
  };
}

function generateAppointment(patientId, providerId, dayOffset) {
  const scheduled = new Date();
  scheduled.setDate(scheduled.getDate() + dayOffset);
  scheduled.setHours(9 + (dayOffset % 6), 0, 0, 0);
  return {
    id: uuid(),
    patientId,
    providerId,
    scheduledAt: scheduled.toISOString(),
    durationMinutes: pick([15, 30, 45, 60]),
    type: pick(['ROUTINE', 'FOLLOW_UP', 'URGENT']),
    status: pick(['SCHEDULED', 'CONFIRMED', 'COMPLETED']),
    reason: pick(['Annual physical', 'Follow-up visit', 'Lab review', 'Medication check']),
  };
}

function generateLabResult(patientId) {
  return {
    id: uuid(),
    patientId,
    testCode: pick(['CBC', 'BMP', 'LIPID', 'HBA1C', 'TSH']),
    testName: pick(['Complete Blood Count', 'Basic Metabolic Panel', 'Lipid Panel']),
    status: pick(['FINAL', 'PRELIMINARY']),
    collectedAt: new Date(Date.now() - 86_400_000 * 3).toISOString(),
    resultedAt: new Date(Date.now() - 86_400_000 * 2).toISOString(),
    value: String(80 + Math.floor(Math.random() * 40)),
    unit: pick(['mg/dL', 'g/dL', 'mmol/L', '%']),
    referenceRange: '70-100',
    abnormalFlag: pick([null, null, 'HIGH', 'LOW']),
  };
}

const organization = {
  id: uuid(),
  name: orgName,
  slug: orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  type: 'HOSPITAL',
  timezone: 'America/New_York',
};

const patients = Array.from({ length: 50 }, (_, i) => generatePatient(i));
const providers = Array.from({ length: 12 }, (_, i) => generateProvider(i));
const appointments = patients.slice(0, 20).map((p, i) =>
  generateAppointment(p.id, providers[i % providers.length].id, i + 1),
);
const labResults = patients.slice(0, 30).map((p) => generateLabResult(p.id));

const featureFlags = [
  {
    key: 'feature.telemedicine',
    enabled: true,
    rules: { percentage: 100, organizationIds: [organization.id] },
  },
  {
    key: 'feature.ai_diagnosis',
    enabled: true,
    rules: { percentage: 50, organizationIds: [organization.id] },
  },
  {
    key: 'feature.advanced_analytics',
    enabled: false,
    rules: { environments: ['production'] },
  },
];

const dataset = {
  generatedAt: new Date().toISOString(),
  version: '1.0.0',
  organization,
  counts: {
    patients: patients.length,
    providers: providers.length,
    appointments: appointments.length,
    labResults: labResults.length,
    featureFlags: featureFlags.length,
  },
  patients,
  providers,
  appointments,
  labResults,
  featureFlags,
};

const outPath = path.join(__dirname, 'demo-hospital.dataset.json');
writeFileSync(outPath, JSON.stringify(dataset, null, 2), 'utf8');

console.log(`Demo hospital dataset written to ${outPath}`);
console.log(`Organization: ${organization.name} (${organization.id})`);
console.log(
  `Records: ${patients.length} patients, ${providers.length} providers, ${appointments.length} appointments, ${labResults.length} lab results`,
);

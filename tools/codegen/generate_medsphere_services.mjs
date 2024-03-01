#!/usr/bin/env node
/**
 * MedSphere microservice scaffold generator.
 *
 * Usage (from repo root):
 *   node tools/codegen/generate_medsphere_services.mjs
 *
 * Skips auth when fully implemented. Emits NestJS Clean Architecture services,
 * FastAPI diagnosis-ai, and @medsphere/config presets.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NEST_SERVICES, SKIP_SERVICES } from './lib/service-specs.mjs';
import {
  authIsFullyImplemented,
  generateNestService,
} from './lib/nest-templates.mjs';
import {
  generateConfigPresets,
  generateDiagnosisAi,
} from './lib/support-templates.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');

async function main() {
  const stats = { files: 0, lines: 0, paths: [], skipped: [] };

  console.log('MedSphere service generator');
  console.log('Repository root:', REPO_ROOT);

  const authReady = await authIsFullyImplemented(REPO_ROOT);
  if (authReady) {
    console.log('Skipping auth — fully implemented use-cases detected.');
    stats.skipped.push('auth');
  } else {
    console.log('Auth service not fully implemented — would generate, but spec excludes auth by default.');
  }

  for (const slug of SKIP_SERVICES) {
    if (!stats.skipped.includes(slug)) stats.skipped.push(slug);
  }

  console.log(`Generating ${NEST_SERVICES.length} NestJS microservices...`);
  for (const spec of NEST_SERVICES) {
    if (stats.skipped.includes(spec.slug)) {
      console.log(`  skip ${spec.slug}`);
      continue;
    }
    process.stdout.write(`  ${spec.slug}...`);
    await generateNestService(REPO_ROOT, spec, stats);
    console.log(' done');
  }

  console.log('Generating config presets...');
  await generateConfigPresets(REPO_ROOT, stats);

  console.log('Generating diagnosis-ai FastAPI service...');
  await generateDiagnosisAi(REPO_ROOT, stats);

  console.log('\n=== Generation complete ===');
  console.log(`Files created/updated: ${stats.files}`);
  console.log(`Approximate LOC added: ${stats.lines.toLocaleString()}`);
  console.log(`Skipped services: ${stats.skipped.join(', ') || '(none)'}`);

  const byService = {};
  for (const p of stats.paths) {
    const match = p.match(/^services\/([^/]+)\//);
    const key = match ? match[1] : p.split('/')[0];
    byService[key] = (byService[key] ?? 0) + 1;
  }
  console.log('\nFiles per target:');
  for (const [name, count] of Object.entries(byService).sort()) {
    console.log(`  ${name}: ${count} files`);
  }
}

main().catch((error) => {
  console.error('Generator failed:', error);
  process.exit(1);
});

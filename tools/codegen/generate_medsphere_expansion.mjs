#!/usr/bin/env node
/**
 * MedSphere enterprise expansion generator.
 *
 * Usage (from repo root):
 *   node tools/codegen/generate_medsphere_expansion.mjs
 *
 * Generates shared types, infrastructure manifests, service depth,
 * portal features, documentation, CI workflows, and database seed.
 * Does NOT install packages. Does NOT emit TODO/NotImplemented stubs.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Stats } from './lib/expansion-utils.mjs';
import { generateSharedPackage } from './lib/expansion-shared.mjs';
import { generateInfrastructure } from './lib/expansion-infra.mjs';
import { generateServiceExpansion } from './lib/expansion-services.mjs';
import { generatePortalExpansion } from './lib/expansion-portals.mjs';
import { generateDocsAndCi, generateDatabasePackage } from './lib/expansion-docs.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');

async function main() {
  const stats = new Stats();
  const startedAt = Date.now();

  console.log('MedSphere enterprise expansion generator');
  console.log('Repository root:', REPO_ROOT);
  console.log('');

  const phases = [
    { name: 'Shared package (types, validators, events, dto, fhir)', fn: () => generateSharedPackage(REPO_ROOT, stats) },
    { name: 'Infrastructure (k8s, helm, terraform, monitoring)', fn: () => generateInfrastructure(REPO_ROOT, stats) },
    { name: 'Service expansion (specs, use-cases, CQRS, Kafka)', fn: () => generateServiceExpansion(REPO_ROOT, stats) },
    { name: 'Portal expansion (settings, reports, search, features)', fn: () => generatePortalExpansion(REPO_ROOT, stats) },
    { name: 'Documentation and CI workflows', fn: () => generateDocsAndCi(REPO_ROOT, stats) },
    { name: 'Database package scripts and seed', fn: () => generateDatabasePackage(REPO_ROOT, stats) },
  ];

  for (const phase of phases) {
    process.stdout.write(`  ${phase.name}...`);
    try {
      await phase.fn();
      console.log(' done');
    } catch (error) {
      console.log(' FAILED');
      stats.errors.push({ phase: phase.name, message: error.message, stack: error.stack });
    }
  }

  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);

  console.log('\n=== Expansion complete ===');
  console.log(`Files created/updated: ${stats.files}`);
  console.log(`Total lines generated: ${stats.lines.toLocaleString()}`);
  console.log(`Elapsed: ${elapsed}s`);

  if (stats.errors.length) {
    console.log(`\nErrors (${stats.errors.length}):`);
    for (const err of stats.errors) {
      console.log(`  [${err.phase}] ${err.message}`);
    }
    process.exit(1);
  }

  const byPrefix = {};
  for (const p of stats.paths) {
    const prefix = p.split('/')[0];
    byPrefix[prefix] = (byPrefix[prefix] ?? 0) + 1;
  }
  console.log('\nFiles by top-level directory:');
  for (const [name, count] of Object.entries(byPrefix).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${name}: ${count} files`);
  }
}

main().catch((error) => {
  console.error('Generator failed:', error);
  process.exit(1);
});

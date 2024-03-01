#!/usr/bin/env node
/**
 * MedSphere bulk enterprise codegen — high-volume production artifacts.
 *
 * Usage (from repo root):
 *   node tools/codegen/generate_medsphere_bulk.mjs
 *
 * Generates clinical reference datasets, OpenAPI specs, contract tests,
 * worker jobs, portal UI modules, CDS rules, and i18n catalogs.
 * No package installs. No TODO stubs.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Stats } from './lib/expansion-utils.mjs';
import { generateReferenceDatasets } from './lib/bulk-reference.mjs';
import { generateOpenApiSpecs } from './lib/bulk-openapi.mjs';
import { generateContractTestsAndFactories, wireSharedTestingExport } from './lib/bulk-contracts.mjs';
import { generateWorkerJobs } from './lib/bulk-workers.mjs';
import { generatePortalFeatures } from './lib/bulk-portals.mjs';
import { generateCdsRules, wireSharedCdsExport } from './lib/bulk-cds.mjs';
import { generateI18n, wireSharedI18nExport } from './lib/bulk-i18n.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');

async function main() {
  const stats = new Stats();
  const startedAt = Date.now();

  console.log('MedSphere bulk enterprise codegen');
  console.log('Repository root:', REPO_ROOT);
  console.log('');

  const phases = [
    { name: 'A) Clinical reference datasets (~80k+ LOC)', fn: () => generateReferenceDatasets(REPO_ROOT, stats) },
    { name: 'B) OpenAPI 3.1 specifications (~15k+ LOC)', fn: () => generateOpenApiSpecs(REPO_ROOT, stats) },
    { name: 'C) Contract tests & factories (~30k+ LOC)', fn: async () => {
      await generateContractTestsAndFactories(REPO_ROOT, stats);
      await wireSharedTestingExport(REPO_ROOT, stats);
    }},
    { name: 'D) Worker jobs & queue processors (~10k+ LOC)', fn: () => generateWorkerJobs(REPO_ROOT, stats) },
    { name: 'E) Portal UI clinical modules (~20k+ LOC)', fn: () => generatePortalFeatures(REPO_ROOT, stats) },
    { name: 'F) CDS rules engine data (~20k+ LOC)', fn: async () => {
      await generateCdsRules(REPO_ROOT, stats);
      await wireSharedCdsExport(REPO_ROOT, stats);
    }},
    { name: 'G) i18n medical UI catalogs', fn: async () => {
      await generateI18n(REPO_ROOT, stats);
      await wireSharedI18nExport(REPO_ROOT, stats);
    }},
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

  console.log('\n=== Bulk generation complete ===');
  console.log(`Files written: ${stats.files.toLocaleString()}`);
  console.log(`Lines written: ${stats.lines.toLocaleString()}`);
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
    const prefix = p.split('/')[0] + (p.includes('/') ? '/' + p.split('/')[1] : '');
    byPrefix[prefix] = (byPrefix[prefix] ?? 0) + 1;
  }
  console.log('\nFiles by area:');
  for (const [name, count] of Object.entries(byPrefix).sort((a, b) => b[1] - a[1]).slice(0, 15)) {
    console.log(`  ${name}: ${count.toLocaleString()} files`);
  }
}

main().catch((error) => {
  console.error('Bulk generator failed:', error);
  process.exit(1);
});

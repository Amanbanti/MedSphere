#!/usr/bin/env node
/**
 * Merge MedSphere Prisma schema fragments into a single generated schema file.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');
const PRISMA_DIR = path.join(REPO_ROOT, 'packages', 'database', 'prisma');
const SCHEMA_SOURCE = path.join(PRISMA_DIR, 'schema.prisma');
const MODELS_DIR = path.join(PRISMA_DIR, 'models');
const OUTPUT_SCHEMA = path.join(PRISMA_DIR, 'schema.generated.prisma');
const CATALOG_OUTPUT = path.join(REPO_ROOT, 'packages', 'database', 'src', 'schema-catalog.ts');

const HEADER_END_MARKERS = ['enum ', 'model '];

function extractHeader(source) {
  const lines = source.split(/\r?\n/);
  const headerLines = [];
  for (const line of lines) {
    const stripped = line.trim();
    if (HEADER_END_MARKERS.some((m) => stripped.startsWith(m))) break;
    headerLines.push(line);
  }
  return `${headerLines.join('\n').replace(/\s+$/, '')}\n`;
}

function extractFoundationModels(source) {
  const lines = source.split(/\r?\n/);
  const bodyLines = [];
  let started = false;
  for (const line of lines) {
    const stripped = line.trim();
    if (!started && HEADER_END_MARKERS.some((m) => stripped.startsWith(m))) started = true;
    if (started) bodyLines.push(line);
  }
  return bodyLines.join('\n').trim();
}

function readFragments() {
  if (!fs.existsSync(MODELS_DIR)) return [];
  const files = fs
    .readdirSync(MODELS_DIR)
    .filter((f) => f.endsWith('.prisma'))
    .sort();
  return files.map((name) => {
    const content = fs.readFileSync(path.join(MODELS_DIR, name), 'utf8').trim();
    return [name, content];
  });
}

function parseModelsAndTables(content) {
  const models = [...content.matchAll(/^model\s+(\w+)\s*\{/gm)].map((m) => m[1]);
  const tables = [...content.matchAll(/@@map\("([^"]+)"\)/g)].map((m) => m[1]);
  return [models, tables];
}

function generateCatalog(allModels, allTables, fragmentCount) {
  const ts = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  const modelEntries = [...new Set(allModels)].sort().map((m) => `"${m}"`).join(',\n  ');
  const tableEntries = [...new Set(allTables)].sort().map((t) => `"${t}"`).join(',\n  ');
  return `/**
 * Auto-generated schema catalog — DO NOT EDIT BY HAND.
 * Regenerate: node tools/codegen/merge_prisma_schema.mjs
 * Generated at: ${ts}
 */

export const SCHEMA_MODELS = [
  ${modelEntries},
] as const;

export type SchemaModel = (typeof SCHEMA_MODELS)[number];

export const SCHEMA_TABLES = [
  ${tableEntries},
] as const;

export type SchemaTable = (typeof SCHEMA_TABLES)[number];

export const SCHEMA_STATS = {
  modelCount: ${new Set(allModels).size},
  tableCount: ${new Set(allTables).size},
  fragmentCount: ${fragmentCount},
} as const;
`;
}

function merge() {
  if (!fs.existsSync(SCHEMA_SOURCE)) {
    console.error(`ERROR: Missing source schema: ${SCHEMA_SOURCE}`);
    process.exit(1);
  }

  const source = fs.readFileSync(SCHEMA_SOURCE, 'utf8');
  const header = extractHeader(source);
  const foundation = extractFoundationModels(source);
  const fragments = readFragments();

  const parts = [
    '// =============================================================================',
    '// AUTO-GENERATED — DO NOT EDIT DIRECTLY',
    '// Merge source: schema.prisma + prisma/models/*.prisma',
    '// Regenerate: node tools/codegen/merge_prisma_schema.mjs',
    '// =============================================================================',
    '',
    header.replace(/\s+$/, ''),
    '',
    '// --- Phase 1 foundation (from schema.prisma) ---',
    '',
    foundation,
    '',
  ];

  if (fragments.length) {
    parts.push('// --- Phase 2+ clinical domains (from prisma/models/) ---');
    parts.push('');
    for (const [filename, content] of fragments) {
      parts.push(`// >>> fragment: ${filename}`);
      parts.push(content);
      parts.push('');
    }
  }

  const merged = `${parts.join('\n').replace(/\s+$/, '')}\n`;
  fs.writeFileSync(OUTPUT_SCHEMA, merged, 'utf8');

  const [allModels, allTables] = parseModelsAndTables(merged);
  fs.mkdirSync(path.dirname(CATALOG_OUTPUT), { recursive: true });
  fs.writeFileSync(CATALOG_OUTPUT, generateCatalog(allModels, allTables, fragments.length));

  const fragmentNames = fragments.map(([name]) => name);
  return {
    model_count: allModels.length,
    table_count: allTables.length,
    fragment_count: fragments.length,
    fragments: fragmentNames,
    output_schema: path.relative(REPO_ROOT, OUTPUT_SCHEMA),
    output_catalog: path.relative(REPO_ROOT, CATALOG_OUTPUT),
  };
}

const stats = merge();
console.log('MedSphere Prisma schema merge complete.');
console.log(`  Models:    ${stats.model_count}`);
console.log(`  Tables:    ${stats.table_count}`);
console.log(`  Fragments: ${stats.fragment_count}`);
console.log(`  Output:    ${stats.output_schema}`);
console.log(`  Catalog:   ${stats.output_catalog}`);
if (stats.fragments.length) {
  console.log('  Fragment files:');
  for (const name of stats.fragments) console.log(`    - ${name}`);
}


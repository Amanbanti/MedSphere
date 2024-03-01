#!/usr/bin/env node
/**
 * Node.js fallback runner for MedSphere Prisma codegen (when Python 3 is unavailable).
 * Canonical scripts: tools/codegen/generate_clinical_fragments.py, merge_prisma_schema.py
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');

const pythonCandidates = ['python3', 'python', 'py'];

function findPython() {
  for (const cmd of pythonCandidates) {
    const r = spawnSync(cmd, ['--version'], { encoding: 'utf8' });
    if (r.status === 0 && !r.stderr?.includes('Microsoft Store') && !r.stdout?.includes('Microsoft Store')) {
      return cmd;
    }
  }
  return null;
}

function runScript(scriptName) {
  const python = findPython();
  if (!python) {
    console.error('Python 3 not found. Install Python 3 or run the .mjs fallback generators directly.');
    process.exit(1);
  }
  const script = path.join(__dirname, scriptName);
  const r = spawnSync(python, [script], { cwd: repoRoot, stdio: 'inherit', encoding: 'utf8' });
  process.exit(r.status ?? 1);
}

const cmd = process.argv[2] ?? 'all';
if (cmd === 'generate') runScript('generate_clinical_fragments.py');
else if (cmd === 'merge') runScript('merge_prisma_schema.py');
else {
  runScript('generate_clinical_fragments.py');
  runScript('merge_prisma_schema.py');
}

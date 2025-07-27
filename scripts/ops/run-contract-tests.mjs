#!/usr/bin/env node
/**
 * Contract test runner — executes OpenAPI contract specs against running services.
 * Usage: node scripts/ops/run-contract-tests.mjs [--base-url http://localhost:4000]
 */

import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');

const baseUrl = process.argv.includes('--base-url')
  ? process.argv[process.argv.indexOf('--base-url') + 1]
  : process.env.CONTRACT_TEST_BASE_URL ?? 'http://localhost:4000';

const env = {
  ...process.env,
  CONTRACT_TEST_BASE_URL: baseUrl,
  NODE_ENV: 'test',
};

console.log(`Running contract tests against ${baseUrl}`);

const jestArgs = [
  '--testPathPattern=tests/contract',
  '--runInBand',
  '--passWithNoTests',
  '--forceExit',
];

const child = spawn('pnpm', ['exec', 'jest', ...jestArgs], {
  cwd: root,
  env,
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

child.on('close', (code) => {
  if (code === 0) {
    console.log('Contract tests passed.');
  } else {
    console.error(`Contract tests failed with exit code ${code}`);
  }
  process.exit(code ?? 1);
});

child.on('error', (err) => {
  console.error('Failed to start contract test runner:', err.message);
  process.exit(1);
});

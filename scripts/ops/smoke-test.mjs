#!/usr/bin/env node
/**
 * Post-deploy smoke test — validates critical API paths.
 * Usage: node scripts/ops/smoke-test.mjs [--base-url https://api.medsphere.health]
 */

const baseUrl = process.argv.includes('--base-url')
  ? process.argv[process.argv.indexOf('--base-url') + 1]
  : process.env.SMOKE_TEST_BASE_URL ?? 'http://localhost:4000';

const smokeTests = [
  { name: 'Gateway liveness', method: 'GET', path: '/health/live', expectStatus: [200] },
  { name: 'Gateway readiness', method: 'GET', path: '/health/ready', expectStatus: [200] },
  { name: 'Auth service health', method: 'GET', path: '/auth/api/v1/health/live', expectStatus: [200] },
  { name: 'Patient service health', method: 'GET', path: '/patient/api/v1/health/live', expectStatus: [200] },
  { name: 'Feature flags health', method: 'GET', path: '/auth/api/v1/feature-flags/health', expectStatus: [200] },
  {
    name: 'Login rejects bad credentials',
    method: 'POST',
    path: '/auth/login',
    body: { email: 'smoke@invalid.test', password: 'invalid' },
    expectStatus: [400, 401, 422],
  },
];

async function runTest(test) {
  const url = `${baseUrl}${test.path}`;
  const options = {
    method: test.method,
    headers: { 'Content-Type': 'application/json', 'X-Correlation-Id': `smoke-${Date.now()}` },
  };
  if (test.body) {
    options.body = JSON.stringify(test.body);
  }

  try {
    const res = await fetch(url, options);
    const pass = test.expectStatus.includes(res.status);
    return { ...test, status: res.status, pass };
  } catch (error) {
    return {
      ...test,
      status: 0,
      pass: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function main() {
  console.log(`MedSphere smoke test — ${baseUrl}\n`);
  const results = await Promise.all(smokeTests.map(runTest));
  let failed = 0;

  for (const result of results) {
    const icon = result.pass ? '✓' : '✗';
    console.log(`${icon} ${result.name} (${result.method} ${result.path}) — ${result.status}`);
    if (!result.pass) {
      failed += 1;
      if (result.error) console.log(`  error: ${result.error}`);
    }
  }

  console.log(failed === 0 ? '\nSmoke test passed.' : `\nSmoke test failed (${failed} checks).`);
  process.exit(failed === 0 ? 0 : 1);
}

main();

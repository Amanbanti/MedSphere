#!/usr/bin/env node
/**
 * Health check all MedSphere services via API gateway upstream probes.
 * Usage: node scripts/ops/health-check-all.mjs [--base-url http://localhost:4000]
 */

const baseUrl = process.argv.includes('--base-url')
  ? process.argv[process.argv.indexOf('--base-url') + 1]
  : process.env.HEALTH_CHECK_BASE_URL ?? 'http://localhost:4000';

const timeoutMs = Number(process.env.HEALTH_CHECK_TIMEOUT_MS ?? 10_000);

async function fetchHealth(path) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${baseUrl}${path}`, { signal: controller.signal });
    const body = await res.json().catch(() => ({}));
    return { path, status: res.status, ok: res.ok, body };
  } catch (error) {
    return {
      path,
      status: 0,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  console.log(`MedSphere health check — ${baseUrl}\n`);

  const checks = [
    await fetchHealth('/health/live'),
    await fetchHealth('/health/ready'),
    await fetchHealth('/health/routes'),
  ];

  let failed = 0;

  for (const check of checks) {
    const icon = check.ok ? '✓' : '✗';
    console.log(`${icon} ${check.path} — HTTP ${check.status}`);
    if (!check.ok) {
      failed += 1;
      if (check.error) console.log(`  error: ${check.error}`);
    }
  }

  const routesResult = checks[2];
  if (routesResult.ok && routesResult.body?.data?.routes) {
    console.log(`\nUpstream routes registered: ${routesResult.body.data.count}`);
    for (const route of routesResult.body.data.routes.slice(0, 8)) {
      console.log(`  • ${route.service} → ${route.gatewayPrefix}`);
    }
    if (routesResult.body.data.routes.length > 8) {
      console.log(`  … and ${routesResult.body.data.routes.length - 8} more`);
    }
  }

  console.log(failed === 0 ? '\nAll health checks passed.' : `\n${failed} check(s) failed.`);
  process.exit(failed === 0 ? 0 : 1);
}

main();

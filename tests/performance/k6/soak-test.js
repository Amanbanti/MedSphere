import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * k6 soak test — sustained load over 30 minutes.
 * Run: k6 run tests/performance/k6/soak-test.js
 */
export const options = {
  scenarios: {
    soak: {
      executor: 'constant-vus',
      vus: 25,
      duration: '30m',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<600', 'avg<200'],
    http_req_failed: ['rate<0.01'],
  },
};

const BASE_URL = __ENV.BASE_URL ?? 'http://localhost:4000';

export default function soak() {
  const endpoints = ['/health/live', '/health/ready', '/health/routes'];
  const path = endpoints[__ITER % endpoints.length];
  const res = http.get(`${BASE_URL}${path}`);

  check(res, {
    'status ok': (r) => r.status === 200,
  });

  sleep(1);
}

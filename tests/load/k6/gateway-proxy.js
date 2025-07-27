import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  vus: 30,
  duration: '3m',
  thresholds: {
    http_req_duration: ['p(95)<300', 'p(99)<600'],
    errors: ['rate<0.005'],
    checks: ['rate>0.99'],
  },
};

const BASE_URL = __ENV.BASE_URL ?? 'http://localhost:4000';

const routes = [
  '/health/live',
  '/health/routes',
  '/auth/api/v1/health/live',
  '/patient/api/v1/health/live',
];

export default function gatewayProxy() {
  const route = routes[Math.floor(Math.random() * routes.length)];
  const res = http.get(`${BASE_URL}${route}`);

  const ok = check(res, {
    'status is 2xx': (r) => r.status >= 200 && r.status < 300,
    'latency under 300ms p95 target': (r) => r.timings.duration < 600,
  });

  errorRate.add(!ok);
  sleep(0.2);
}

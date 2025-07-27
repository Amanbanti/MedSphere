import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('errors');
const loginDuration = new Trend('login_duration');

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    errors: ['rate<0.01'],
    login_duration: ['p(95)<400'],
  },
};

const BASE_URL = __ENV.BASE_URL ?? 'http://localhost:4000';
const EMAIL = __ENV.LOAD_TEST_EMAIL ?? 'demo.clinician@medsphere.test';
const PASSWORD = __ENV.LOAD_TEST_PASSWORD ?? 'DemoPassword123!';

export default function authLogin() {
  const start = Date.now();
  const res = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ email: EMAIL, password: PASSWORD }),
    { headers: { 'Content-Type': 'application/json' } },
  );

  loginDuration.add(Date.now() - start);

  const ok = check(res, {
    'status is 200 or 401 (expected in unseeded env)': (r) =>
      r.status === 200 || r.status === 401,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  errorRate.add(!ok);
  sleep(1);
}

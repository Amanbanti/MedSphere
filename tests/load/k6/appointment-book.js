import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  scenarios: {
    appointment_booking: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 20 },
        { duration: '2m', target: 40 },
        { duration: '30s', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<800'],
    errors: ['rate<0.02'],
  },
};

const BASE_URL = __ENV.BASE_URL ?? 'http://localhost:4000';
const TOKEN = __ENV.LOAD_TEST_TOKEN ?? '';

export default function appointmentBook() {
  if (!TOKEN) {
    sleep(1);
    return;
  }

  const payload = JSON.stringify({
    patientId: __ENV.PATIENT_ID ?? '00000000-0000-4000-8000-000000000010',
    providerId: __ENV.PROVIDER_ID ?? '00000000-0000-4000-8000-000000000011',
    scheduledAt: new Date(Date.now() + Math.random() * 604_800_000).toISOString(),
    durationMinutes: 30,
    type: 'ROUTINE',
    reason: 'Load test appointment',
  });

  const res = http.post(`${BASE_URL}/appointment/api/v1/appointments`, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
      'X-Idempotency-Key': `k6-${__VU}-${__ITER}-${Date.now()}`,
    },
  });

  const ok = check(res, {
    'status is 201 or 409': (r) => r.status === 201 || r.status === 409,
  });

  errorRate.add(!ok);
  sleep(0.5);
}

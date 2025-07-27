import { test, expect } from '@playwright/test';

test.describe('Book appointment', () => {
  test('requires authentication to create appointment', async ({ request }) => {
    const response = await request.post('/appointment/api/v1/appointments', {
      data: {
        patientId: '00000000-0000-4000-8000-000000000001',
        providerId: '00000000-0000-4000-8000-000000000002',
        scheduledAt: new Date(Date.now() + 86_400_000).toISOString(),
        reason: 'Annual checkup',
      },
    });

    expect(response.status()).toBe(401);
  });

  test('creates appointment with valid token and payload', async ({ request }) => {
    test.skip(
      !process.env.E2E_CLINICIAN_TOKEN,
      'Set E2E_CLINICIAN_TOKEN for appointment booking test',
    );

    const response = await request.post('/appointment/api/v1/appointments', {
      headers: {
        Authorization: `Bearer ${process.env.E2E_CLINICIAN_TOKEN}`,
        'X-Idempotency-Key': `e2e-appt-${Date.now()}`,
      },
      data: {
        patientId: process.env.E2E_PATIENT_ID ?? '00000000-0000-4000-8000-000000000010',
        providerId: process.env.E2E_PROVIDER_ID ?? '00000000-0000-4000-8000-000000000011',
        scheduledAt: new Date(Date.now() + 172_800_000).toISOString(),
        durationMinutes: 30,
        type: 'ROUTINE',
        reason: 'E2E scheduled visit',
      },
    });

    expect([200, 201]).toContain(response.status());
    const body = await response.json();
    expect(body.data).toHaveProperty('id');
    expect(body.data).toHaveProperty('status');
  });
});

import { test, expect } from '@playwright/test';

test.describe('Patient registration', () => {
  test('validates required fields on register endpoint', async ({ request }) => {
    const response = await request.post('/patient/api/v1/patients/register', {
      data: {
        email: 'not-an-email',
        password: 'short',
      },
    });

    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('registers patient with valid payload when auth token present', async ({
    request,
  }) => {
    test.skip(!process.env.E2E_ADMIN_TOKEN, 'Set E2E_ADMIN_TOKEN for registration test');

    const correlationId = `e2e-reg-${Date.now()}`;
    const email = `patient.e2e.${Date.now()}@medsphere.test`;

    const response = await request.post('/patient/api/v1/patients', {
      headers: {
        Authorization: `Bearer ${process.env.E2E_ADMIN_TOKEN}`,
        'X-Correlation-Id': correlationId,
      },
      data: {
        email,
        firstName: 'E2E',
        lastName: 'Patient',
        dateOfBirth: '1990-01-15',
        phone: '+15550100001',
      },
    });

    expect([200, 201]).toContain(response.status());
    const body = await response.json();
    expect(body.correlationId).toBe(correlationId);
    expect(body.data).toHaveProperty('id');
  });
});

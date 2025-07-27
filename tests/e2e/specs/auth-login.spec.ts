import { test, expect } from '@playwright/test';

test.describe('Authentication — login flow', () => {
  test('shows login form and rejects invalid credentials', async ({ request }) => {
    const response = await request.post('/auth/login', {
      data: {
        email: 'invalid@example.com',
        password: 'WrongPassword123!',
      },
    });

    expect(response.status()).toBeGreaterThanOrEqual(400);
    const body = await response.json();
    expect(body).toHaveProperty('errorCode');
  });

  test('accepts valid demo credentials when seeded', async ({ request }) => {
    test.skip(!process.env.E2E_DEMO_USER, 'Set E2E_DEMO_USER for login success test');

    const response = await request.post('/auth/login', {
      data: {
        email: process.env.E2E_DEMO_USER,
        password: process.env.E2E_DEMO_PASSWORD,
      },
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.data).toHaveProperty('accessToken');
    expect(body.data).toHaveProperty('refreshToken');
  });

  test('gateway health is reachable', async ({ request }) => {
    const response = await request.get('/health/live');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.data.status).toBe('ok');
  });
});

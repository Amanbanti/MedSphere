import { test, expect } from '@playwright/test';

test.describe('View lab results', () => {
  test('denies unauthenticated access to lab results', async ({ request }) => {
    const response = await request.get(
      '/laboratory/api/v1/lab-results/00000000-0000-4000-8000-000000000099',
    );
    expect(response.status()).toBe(401);
  });

  test('returns lab result list for authorized clinician', async ({ request }) => {
    test.skip(
      !process.env.E2E_CLINICIAN_TOKEN,
      'Set E2E_CLINICIAN_TOKEN for lab results test',
    );

    const patientId =
      process.env.E2E_PATIENT_ID ?? '00000000-0000-4000-8000-000000000010';

    const response = await request.get(
      `/laboratory/api/v1/patients/${patientId}/lab-results`,
      {
        headers: {
          Authorization: `Bearer ${process.env.E2E_CLINICIAN_TOKEN}`,
        },
      },
    );

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(Array.isArray(body.data.items ?? body.data)).toBeTruthy();
  });

  test('patient portal lab results page renders', async ({ page }) => {
    test.skip(!process.env.E2E_PORTAL_URL, 'Set E2E_PORTAL_URL for portal UI test');

    await page.goto('/lab-results');
    await expect(page.locator('body')).toBeVisible();
    const title = page.locator('h1, [data-testid="page-title"]');
    await expect(title.first()).toBeVisible({ timeout: 15_000 });
  });
});

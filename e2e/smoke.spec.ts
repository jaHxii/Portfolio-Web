import { test, expect } from '@playwright/test';

test.describe('Smoke tests — every page loads', () => {
  test('homepage renders hero and navigation', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Ermias/i);
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('projects page renders project cards', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Projects'
    );
    // At least one project card should be visible
    await expect(page.getByText('KIRAY').first()).toBeVisible();
  });

  test('skills page renders skill categories', async ({ page }) => {
    await page.goto('/skills');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Skills'
    );
  });

  test('experience page renders timeline', async ({ page }) => {
    await page.goto('/experience');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Experience'
    );
  });

  test('contact page renders form', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Reliable'
    );
    await expect(
      page.getByRole('button', { name: /send message/i })
    ).toBeVisible();
  });

  test('resume page renders', async ({ page }) => {
    await page.goto('/resume');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('404 page renders for unknown routes', async ({ page }) => {
    await page.goto('/nonexistent-page');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Lost above the clouds'
    );
  });
});

test.describe('Navigation', () => {
  test('can navigate between pages via nav links', async ({ page }) => {
    await page.goto('/');
    // Click Projects link
    await page.getByRole('link', { name: 'Projects' }).first().click();
    await expect(page).toHaveURL(/\/projects/);

    // Click Skills link
    await page.getByRole('link', { name: 'Skills' }).first().click();
    await expect(page).toHaveURL(/\/skills/);

    // Click Experience link
    await page.getByRole('link', { name: 'Experience' }).first().click();
    await expect(page).toHaveURL(/\/experience/);
  });
});

test.describe('Accessibility basics', () => {
  test('skip link is present', async ({ page }) => {
    await page.goto('/');
    // Tab to reveal skip link
    await page.keyboard.press('Tab');
    const skipLink = page.getByText('Skip to content');
    await expect(skipLink).toBeVisible();
  });

  test('page has lang attribute', async ({ page }) => {
    await page.goto('/');
    const lang = await page.getAttribute('html', 'lang');
    expect(lang).toBeTruthy();
  });
});

test.describe('SEO', () => {
  test('every page has a title', async ({ page }) => {
    const routes = [
      '/',
      '/projects',
      '/skills',
      '/experience',
      '/contact',
      '/resume',
    ];
    for (const route of routes) {
      await page.goto(route);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
    }
  });

  test('every page has meta description', async ({ page }) => {
    const routes = [
      '/',
      '/projects',
      '/skills',
      '/experience',
      '/contact',
      '/resume',
    ];
    for (const route of routes) {
      await page.goto(route);
      const description = await page.getAttribute(
        'meta[name="description"]',
        'content'
      );
      expect(description).toBeTruthy();
      expect(description!.length).toBeGreaterThan(20);
    }
  });
});

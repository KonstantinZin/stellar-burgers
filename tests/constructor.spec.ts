import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/api/ingredients'
    });
    await page.goto('/');
    await page.waitForSelector('button:has-text("Добавить")');
  });

  test('добавление булки в конструктор', async ({ page }) => {
    const firstCard = page
      .locator('li')
      .filter({ has: page.locator('a[href*="ingredients"]') })
      .first();
    const bunName = await firstCard
      .locator('a[href*="ingredients"] p')
      .last()
      .textContent();
    const addButton = firstCard.locator('button:has-text("Добавить")');
    await addButton.click();

    await expect(page.getByText('(верх)').first()).toBeVisible();
    await expect(page.getByText('(низ)').first()).toBeVisible();
    if (bunName) {
      await expect(page.getByText(bunName).first()).toBeVisible();
    }
  });

  test('открытие и закрытие модального окна ингредиента', async ({ page }) => {
    const ingredientLink = page.locator('a[href*="ingredients"]').first();
    const ingredientName = await ingredientLink
      .locator('p')
      .last()
      .textContent();

    await ingredientLink.click();

    const modal = page.locator('#modals').first();
    await expect(modal.getByText('Детали ингредиента')).toBeVisible();
    if (ingredientName) {
      await expect(
        modal.getByRole('heading', { name: ingredientName })
      ).toBeVisible();
    }

    await modal.locator('button').click();
    await expect(page.getByText('Детали ингредиента')).not.toBeVisible();
  });

  test('создание заказа', async ({ page }) => {
  await page.routeFromHAR('./tests/hars/ingredients.har', { url: '**/api/ingredients' });
  await page.routeFromHAR('./tests/hars/auth.har', { url: '**/api/auth/**' });
  await page.routeFromHAR('./tests/hars/order.har', { url: '**/api/orders' });

  await page.goto('/');
  await page.evaluate(() => {
    document.cookie = 'accessToken=testToken; path=/; max-age=3600';
    localStorage.setItem('refreshToken', 'testRefreshToken');
  });
  await page.reload();
  await page.waitForSelector('button:has-text("Добавить")');

  const firstCard = page.locator('li').filter({ has: page.locator('a[href*="ingredients"]') }).first();
  await firstCard.locator('button:has-text("Добавить")').click();

  const secondCard = page.locator('li').filter({ has: page.locator('a[href*="ingredients"]') }).nth(1);
  await secondCard.locator('button:has-text("Добавить")').click();

  await page.getByText('Оформить заказ').click();

  await expect(page.locator('#modals')).toContainText('12345');

  await page.locator('#modals button').click();

  await expect(page.getByText('(верх)').first()).not.toBeVisible();
  await expect(page.getByText('(низ)').first()).not.toBeVisible();
});
});
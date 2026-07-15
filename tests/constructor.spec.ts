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
    const addButton = page.getByText('Добавить').first();
    await addButton.click();
    await expect(page.getByText('(верх)').first()).toBeVisible();
    await expect(page.getByText('(низ)').first()).toBeVisible();
  });

  test('открытие и закрытие модального окна ингредиента', async ({ page }) => {
    const ingredientLink = page.locator('a[href*="ingredients"]').first();
    const ingredientName = await ingredientLink.locator('p').last().textContent();

    await ingredientLink.click();
    await expect(page.getByText('Детали ингредиента')).toBeVisible();

    if (ingredientName) {
      await expect(page.getByRole('heading', { name: ingredientName })).toBeVisible();
    }

    await page.locator('#modals button').click();
    await expect(page.getByText('Детали ингредиента')).not.toBeVisible();
  });

  test('создание заказа', async ({ page }) => {
    await page.route('**/api/auth/user', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          success: true,
          user: { email: 'test@test.ru', name: 'Тест' }
        })
      });
    });

    await page.route('**/api/orders', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          success: true,
          order: { number: 12345 },
          name: 'Тестовый бургер'
        })
      });
    });

    await page.evaluate(() => {
      document.cookie = 'accessToken=testToken';
      localStorage.setItem('refreshToken', 'testRefreshToken');
    });

    await page.reload();
    await page.waitForSelector('button:has-text("Добавить")');

    await page.getByText('Добавить').first().click();
    await page.getByText('Оформить заказ').click();

    await expect(page.getByText('12345')).toBeVisible();

    await page.locator('#modals button').click();
    await expect(page.getByText('(верх)').first()).not.toBeVisible();
  });
});